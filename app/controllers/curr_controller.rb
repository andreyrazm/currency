class CurrController < ApplicationController
  def index

    if :datap!=nil
      getData(params[:datap].to_s)
    else
      getData(Time.new.strftime("%d/%m/%Y"))
    end

    respond_to do |format|
      format.html
      format.json {
        render json: {cur: @cur, val: @val}
      }
    end
  end

  private

  def getData(z)
    res=RestClient.get 'http://www.cbr.ru/scripts/XML_daily.asp?date_req=' + z
    xm = Nokogiri::XML(res)
    size=xm.search("Valute").size
    @cur, @val = Array.new(size), Array.new(size)
    size.times do |i|
      @cur[i] = xm.root.at_xpath("/ValCurs/Valute["+(i+1).to_s+"]/Value").content
      @val[i] = xm.root.at_xpath("/ValCurs/Valute["+(i+1).to_s+"]/CharCode").content
    end

    #xm.root.xpath("//Valute").each {|n|

      #Rails.logger.info(n)
   # }


    #@data=xm.root.at_xpath("/ValCurs")
    #@cur1=xm.root.at_xpath("/ValCurs/Valute[@ID='R01235']/CharCode").content
    #@val1=xm.root.at_xpath("/ValCurs/Valute[@ID='R01235']/Value").content
    #@cur2=xm.root.at_xpath("/ValCurs/Valute[@ID='R01239']/CharCode").content
    #@val2=xm.root.at_xpath("/ValCurs/Valute[@ID='R01239']/Value").content
  end

end

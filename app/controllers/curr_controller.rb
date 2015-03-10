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
        render json: {cur: @currency}
      }
    end
  end

  private

  def getData(z)
    res=RestClient.get 'http://www.cbr.ru/scripts/XML_daily.asp?date_req=' + z
    xm = Nokogiri::XML(res)
    @currency = []
    #Rails.logger.info(xm.search("Valute")[1])
    xm.search("Valute").each do |i|
     @currency << {
          value: i.xpath('Value').text,
          charcode: i.xpath('CharCode').text
      }
    end

    #@cur, @val = Array.new(size), Array.new(size)
    #size.times do |i|
    #  @cur[i] = xm.root.at_xpath("/ValCurs/Valute["+(i+1).to_s +"]/Value").content
    #  @val[i] = xm.root.at_xpath("/ValCurs/Valute["+(i+1).to_s+"]/CharCode").content
   # end


  end

end

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
        render json: {dat:  @dat, cur1: @cur1, cur2: @cur2, val1: @val1, val2: @val2}
      }
    end
  end

  private

  def getData(z)
    res=RestClient.get 'http://www.cbr.ru/scripts/XML_daily.asp?date_req=' + z
    xm = Nokogiri::XML(res)
    #@dat=xm.root.at_xpath("/ValCurs")['Date']
    @cur1=xm.root.at_xpath("/ValCurs/Valute[@ID='R01235']/CharCode").content
    @val1=xm.root.at_xpath("/ValCurs/Valute[@ID='R01235']/Value").content
    @cur2=xm.root.at_xpath("/ValCurs/Valute[@ID='R01239']/CharCode").content
    @val2=xm.root.at_xpath("/ValCurs/Valute[@ID='R01239']/Value").content
  end

end

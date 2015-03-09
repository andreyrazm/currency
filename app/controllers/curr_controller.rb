class CurrController < ApplicationController
  def index
    @att="dddd"

    res=RestClient.get 'http://www.cbr.ru/scripts/XML_daily.asp?date_req=09/03/2015'
    xm = Nokogiri::XML(res)
    @dat=xm.root.at_xpath("/ValCurs")['Date']
    @cur1=xm.root.at_xpath("/ValCurs/Valute[@ID='R01235']/CharCode").content
    @val1=xm.root.at_xpath("/ValCurs/Valute[@ID='R01235']/Value").content
    @cur2=xm.root.at_xpath("/ValCurs/Valute[@ID='R01239']/CharCode").content
    @val2=xm.root.at_xpath("/ValCurs/Valute[@ID='R01239']/Value").content

  end
end

class CurrController < ApplicationController
  def index
    if :datap!=nil
      getData(params[:datap].to_s)
    else
      getData(Time.new.strftime('%d/%m/%Y'))
    end

    respond_to do |format|
      format.html
      format.json {
        render json: {cur: @currency}
      }
    end
  end

  def stat
    id=params[:id]
    time2=Time.parse(params[:date]).strftime('%d/%m/%Y')
    time1=(Time.parse(params[:date]) - 1.month).strftime('%d/%m/%Y')
    res=RestClient.get 'www.cbr.ru/scripts/XML_dynamic.asp?date_req1='+time1+'&date_req2='+time2+'&VAL_NM_RQ='+id
    xm = Nokogiri::XML(res)
    @statistics = []
    xm.search("Record").each do |i|
      @statistics << [
          Time.parse(i.xpath('@Date').text).to_f * 1000,
          i.xpath('Value').text.gsub(/,/, '.').to_f
      ]
    end
    Rails.logger.info(@statistics)
    respond_to do |format|
      format.html{redirect_to :action => 'index'}
      format.json {
        render json: {stat: @statistics}

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
          charcode: i.xpath('CharCode').text,
          id: i.xpath('@ID').text

      }
    end




  end
end

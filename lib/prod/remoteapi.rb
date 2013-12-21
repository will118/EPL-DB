class RemoteAPI

  class << self
    def api_save
      from_date = (Date.today - 2.month).strftime("%Y-%m-%d")
      to_date =  Date.today.strftime("%Y-%m-%d")
      results = json_get("http://api.statsfc.com/results.json?key=#{ENV["STATS_KEY"]}&competition=#{ENV["COMP"]}&year=2013/2014&from=#{from_date}&to=#{to_date}&limit=10")
      live = json_get("http://api.statsfc.com/live.json?key=#{ENV["STATS_KEY"]}&competition=premier-league")

      if live.to_s.length > 40
        live.each do |x|
          api = ApiScore.where(:home => x['home'], :away => x['away'], :live => true).first_or_create
          api.fulltime = x['runningscore']
          api.incidents = x['incidents']
          api.status = x['statusshort']
          api.save
        end
      else
        ApiScore.where(:live => true).delete_all
      end

      results.each do |x|
        api = ApiScore.where(:home => x['home'], :away => x['away'], :date => x['date'], :live => false).first_or_create
        api.status = x['status']
        api.halftime = x['halftime']
        api.fulltime = x['fulltime']
        api.incidents = x['incidents']
        api.save
      end
    end
  end
end

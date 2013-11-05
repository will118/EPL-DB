class RemoteAPI

  class << self
    include ActionView::Helpers::DateHelper

    def next_10_fixtures
      from_date = Date.today.strftime("%Y-%m-%d")
      to_date =  2.months.from_now.strftime("%Y-%m-%d")
      json_get("http://api.statsfc.com/#{ENV["COMP"]}/fixtures.json?key=#{ENV["STATS_KEY"]}&from=#{from_date}&to=#{to_date}&timezone=#{ENV["TIMEZONE"]}&limit=5")
    end

    def next_10_fixtures_countdown
      from_date = Date.today.strftime("%Y-%m-%d")
      to_date =  2.months.from_now.strftime("%Y-%m-%d")
      fixtures_url = "http://api.statsfc.com/#{ENV["COMP"]}/fixtures.json?key=#{ENV["STATS_KEY"]}&from=#{from_date}&to=#{to_date}&timezone=#{ENV["TIMEZONE"]}&limit=10"
      countdown = json_get fixtures_url
      countdown.each do |fixture|
        date = Time.parse(fixture['date'])
        time = date - Time.now.utc
        fixture['date'] = distance_of_time_in_words_to_now(Time.now + time)
      end
    end

    def table
      json_get("http://api.statsfc.com/#{ENV["COMP"]}/table.json?key=#{ENV["STATS_KEY"]}")
    end
  end
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

    def past_results(team)
      name = stats_fc_normaliser(team)
      from_date = "2013-08-15"
      to_date =  Date.today.strftime("%Y-%m-%d")
      results = json_get("http://api.statsfc.com/results.json?key=#{ENV["STATS_KEY"]}&competition=#{ENV["COMP"]}&team=#{name}&year=2013/2014&from=#{from_date}&to=#{to_date}")
      results.each do |x|
        result = Result.where(:home => x['home'], :away => x['away'], :team => team, :date => x['date']).first_or_create
        result.fulltime = x['fulltime']
        result.incidents = x['incidents']
        result.save
      end
    end



    def top_scorers(team)
      name = stats_fc_normaliser(team)
      if stats_fc_checker(name) == "1"
        json_get("http://api.statsfc.com/top-scorers.json?key=#{ENV["STATS_KEY"]}&competition=#{ENV["COMP"]}&team=#{name}&year=2013/2014")
      else "Incorrect team name"
      end
    end
  end
end
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

      if Cache.need_new_countdown? == true
        countdown = json_get(fixtures_url)
        cache = Cache.where(:kind_of => 'countdown').first_or_create

        cache.json = countdown
        cache.save
      else
        countdown = Cache.last_countdown
      end
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

  def self.top_scorers(team)
    name = stats_fc_normaliser(team)
    if stats_fc_checker(name) == "1"
      json_get("http://api.statsfc.com/top-scorers.json?key=#{ENV["STATS_KEY"]}&competition=#{ENV["COMP"]}&team=#{name}&year=2013/2014")
    else "Incorrect team name"
    end
  end

end
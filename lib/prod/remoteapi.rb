require_relative 'namenormaliser'

class RemoteAPI
  include NameNormaliser

  class << self
  include ActionView::Helpers::DateHelper
  
    def next_5_fixtures
      from_date = Date.today.strftime("%Y-%m-%d")
      to_date =  2.months.from_now.strftime("%Y-%m-%d")
      fixtures_url = "http://api.statsfc.com/#{ENV["COMP"]}/fixtures.json?key=#{ENV["STATS_KEY"]}&from=#{from_date}&to=#{to_date}&timezone=#{ENV["TIMEZONE"]}&limit=5"
      json_get(fixtures_url)
    end

    def next_5_fixtures_countdown
      from_date = Date.today.strftime("%Y-%m-%d")
      to_date =  2.months.from_now.strftime("%Y-%m-%d")
      fixtures_url = "http://api.statsfc.com/#{ENV["COMP"]}/fixtures.json?key=#{ENV["STATS_KEY"]}&from=#{from_date}&to=#{to_date}&timezone=#{ENV["TIMEZONE"]}&limit=5"
      json_get(fixtures_url).each do |fixture|
        date = Time.parse(fixture['date'])
        time = date - Time.now.utc
        fixture['date'] = distance_of_time_in_words_to_now(Time.now + time)
      end
    end

    def table
      table = "http://api.statsfc.com/#{ENV["COMP"]}/table.json?key=#{ENV["STATS_KEY"]}"
      json_get(table)
    end
  end

  def top_scorers(team)
    name = stats_fc_normaliser(team)
    if stats_fc_checker(name) == "1"
      raw = "http://api.statsfc.com/top-scorers.json?key=#{ENV["STATS_KEY"]}&competition=#{ENV["COMP"]}&team=#{name}&year=2013/2014"
      json_get(raw)
    else "Incorrect team name"
    end
  end
  
end
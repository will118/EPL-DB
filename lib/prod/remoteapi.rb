require_relative 'namenormaliser'

class RemoteAPI
  include NameNormaliser

  def top_scorers(team)
    name = stats_fc_normaliser(team)
    if stats_fc_checker(name) == "1"
      raw = "http://api.statsfc.com/top-scorers.json?key=#{ENV["STATS_KEY"]}&competition=#{ENV["COMP"]}&team=#{name}&year=2013/2014"
      HTTParty.get(raw).response.body
    else "Incorrect team name"
    end
  end


  class << self
    def next_5_fixtures(type="normal")
      date = Date.today
      from_date = date.to_s(:db)
      future_date = date + 2.months
      to_date = future_date.to_s(:db)
      fixtures = "http://api.statsfc.com/#{ENV["COMP"]}/fixtures.json?key=#{ENV["STATS_KEY"]}&from=#{from_date}&to=#{to_date}&timezone=#{ENV["TIMEZONE"]}&limit=5"
      fixtures = JSON.parse(HTTParty.get(fixtures).response.body)
      if type == "countdown"
        fixtures.each do |x|
          date = Time.parse(x['date'])
          x['date'] = date - Time.now.utc
        end
      end
      fixtures
    end

    def table
      table = "http://api.statsfc.com/#{ENV["COMP"]}/table.json?key=#{ENV["STATS_KEY"]}"
      JSON.parse(HTTParty.get(table).response.body)
    end
  end

end
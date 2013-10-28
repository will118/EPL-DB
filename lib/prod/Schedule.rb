require_relative 'namenormaliser'

class Schedule
  include NameNormaliser

	def initialize(team)
		@team = team
	end

	def next_match
    name = stats_fc_normaliser(@team)
    date = Date.today
    from_date = date.to_s(:db)
    future_date = date + 2.months
    to_date = future_date.to_s(:db)
    fixtures = "http://api.statsfc.com/#{ENV["COMP"]}/fixtures.json?key=#{ENV["STATS_KEY"]}&team=#{name}&from=#{from_date}&to=#{to_date}&timezone=#{ENV["TIMEZONE"]}&limit=5"
    JSON.parse(HTTParty.get(fixtures).response.body)
  end

	def save
		json = next_match
		json.each do |x|
			fix = Fixture.where(:kickoff => x["date"], :hometeam => x["home"], :awayteam => x["away"]).first_or_create 
		end
	end

	def live_matcher
		Fixture.where(["awayteam = ? or hometeam = ?", @team, @team])
	end

end


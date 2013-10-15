class Schedule

	def initialize(team)
		@team = team
	end

	def next_match
		JasonTheBuilder.new.fixture_json(@team)
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


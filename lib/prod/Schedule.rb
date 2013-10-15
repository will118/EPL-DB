class Schedule

	def initialize(team)
		@team = team
	end

	def next_match
		JasonTheBuilder.new.fixture_json(@team)
	end

	def save
		next_match
	end

end


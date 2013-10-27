class MatchTime

	def initialize(kickoff)
		@time_until = (kickoff - Time.now.utc)
	end

	def halftime?
		(@time_until < -2900) && (@time_until > -3700)
	end

	def pre_match?
		(@time_until < 1800)
	end

	def match_over?
		(@time_until < -7200)
	end

	def match_on?
		(@time_until < -6500) || (@time_until > 3600)
	end

	def live_match?
		(@time_until < 180)
	end

	def match_soon?
		(@time_until < 1800)
	end

end
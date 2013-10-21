class Fixture < ActiveRecord::Base

	def got_json?
		jsonurl != nil
	end

	def missing_link?
		rawlink == nil
	end

	def missing_team?
		gotteam != nil
	end

	def missing_team_source?
		lineup_url != nil
	end
	
end

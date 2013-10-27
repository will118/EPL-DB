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

	def missing_json?
		jsonurl != nil 
	end

	def no_team?
		gotteam == nil
	end

	def out_of_date_teams?
		updated_at >= (Time.now.utc - 360)
	end

end

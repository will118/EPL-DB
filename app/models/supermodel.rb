class Supermodel < ActiveRecord::Base
	validates :matchid, presence: true
	validates :teamname, presence: true
	class << self
		def of_possession_where(team)
			where(:teamname => team.titleize).pluck(:avgpossession)
		end

		def of_shots_where(team)
			where(:teamname => team.titleize).pluck(:shotaccuracy)
		end
		
		def of_passes_where(team)
			where(:teamname => team.titleize).pluck(:passaccuracy)
		end

		def of_attackscore_where(team)
			where(:teamname => team.titleize).pluck(:attackscore)
		end
		
		def of_defencescore_where(team)
			where(:teamname => team.titleize).pluck(:defencescore)
		end

		def of_possessionscore_where(team)
			where(:teamname => team.titleize).pluck(:possessionscore)
		end

		def of_optascore_where(team)
			where(:teamname => team.titleize).pluck(:optascore)
		end

	end
end

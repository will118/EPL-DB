class Poss < ActiveRecord::Base
	validates :awayposs, presence: true
	validates :homeposs, presence: true
	
	def self.last_where(team)
		where(["awayteam = ? or hometeam = ?", team.titleize, team.titleize]).last
	end

	def self.involving(team)
		where(["awayteam = ? or hometeam = ?", team.titleize, team.titleize])
	end	

	def self.last_data_involving(team)
		team = team.titleize
		last_match = where(["awayteam = ? or hometeam = ?", team, team]).last
		if last_match.hometeam == team
			where(:matchdate => last_match.matchdate, :hometeam => team)
		else 
			where(:matchdate => last_match.matchdate, :awayteam => team)
		end
	end

	def hometeam_hyphenated
		hometeam.downcase.gsub(/[" "]/, "-")
	end

	def awayteam_hyphenated
		awayteam.downcase.gsub(/[" "]/, "-")
	end

	def over_100?
		if homeposs + awayposs >= 101
			return true
		else
			return false
		end
	end

	def homeposs_percent
		total = (homeposs + awayposs)
		(homeposs.to_f/total.to_f)*100
	end

	def awayposs_percent
		total = (homeposs + awayposs)
		(awayposs.to_f/total.to_f)*100
	end

	
end

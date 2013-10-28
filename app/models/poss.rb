class Poss < ActiveRecord::Base
	validates :awayposs, presence: true
	validates :homeposs, presence: true
	
	def self.last_where(team)
		where(["awayteam = ? or hometeam = ?", team.titleize, team.titleize]).last
	end

	def self.involving(team)
		where(["awayteam = ? or hometeam = ?", team.titleize, team.titleize])
	end

end

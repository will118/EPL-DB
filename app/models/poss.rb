class Poss < ActiveRecord::Base
	validates :awayposs, presence: true
	validates :homeposs, presence: true
	
	def self.last_where(team)
		where(["awayteam = ? or hometeam = ?", normalized_team, normalized_team]).last
	end

end

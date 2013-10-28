class Shot < ActiveRecord::Base	
	validates :awayshots, presence: true
	validates :homeshots, presence: true
	
	def self.last_where(team)
		where(["awayteam = ? or hometeam = ?", normalized_team, normalized_team]).last
	end

end

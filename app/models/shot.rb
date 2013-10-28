class Shot < ActiveRecord::Base	
	validates :awayshots, presence: true
	validates :homeshots, presence: true
	
	def self.last_where(team)
		where(["awayteam = ? or hometeam = ?", team.titleize, team.titleize]).last
	end

end

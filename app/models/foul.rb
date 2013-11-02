class Foul < ActiveRecord::Base
	validates :away, presence: true
	validates :home, presence: true
	
	def self.most_recent_1(team)
		where(["awayteam = ? or hometeam = ?", team.titleize, team.titleize]).order('created_at DESC').first
	end

	def self.most_recent_data(last, team)
		where(["awayteam = ? and matchdate = ? or hometeam = ? and matchdate = ?", team.titleize, last, team.titleize, last])
	end

end

class Shot < ActiveRecord::Base	
	validates :awayshots, presence: true
	validates :homeshots, presence: true
	
	def self.last_where(team)
		where(["awayteam = ? or hometeam = ?", team.titleize, team.titleize]).last
	end

	def self.most_recent_1(team)
		where(["awayteam = ? or hometeam = ?", team.titleize, team.titleize]).order(:matchdate).first
	end

	def self.most_recent_data(last, team)
		where(["awayteam = ? and matchdate = ? or hometeam = ? and matchdate = ?", team.titleize, last, team.titleize, last])
	end

	def homeshots_percent
		total = (homeshots + awayshots)
		(homeshots.to_f/total.to_f)*100
	end

	def awayshots_percent
		total = (homeshots + awayshots)
		(awayshots.to_f/total.to_f)*100
	end

	def hometeam_hyphenated
		hometeam.downcase.gsub(/[" "]/, "-")
	end

	def awayteam_hyphenated
		awayteam.downcase.gsub(/[" "]/, "-")
	end

end

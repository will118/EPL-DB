class Score < ActiveRecord::Base
	def self.live
		last(8)
	end

	def self.save_data(teams, score)
		score = Score.where(:teams => teams).first_or_create
		score.score = score
    score.save		
	end
	
end

class Score < ActiveRecord::Base
	def self.live
		last(8)
	end
end

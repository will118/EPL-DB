class Poss < ActiveRecord::Base
	validates :awayposs, presence: true
	validates :homeposs, presence: true
end

class Supermodel < ActiveRecord::Base
	validates :matchid, presence: true, uniqueness: true
end

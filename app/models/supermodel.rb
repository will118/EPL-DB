class Supermodel < ActiveRecord::Base
	validates :matchid, presence: true
	validates :teamname, presence: true
end

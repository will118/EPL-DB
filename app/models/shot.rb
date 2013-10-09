class Shot < ActiveRecord::Base
	validates :awayshots, presence: true, uniqueness: true
	validates :homeshots, presence: true, uniqueness: true
end

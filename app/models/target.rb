class Target < ActiveRecord::Base
		validates :awayshots, presence: true
		validates :homeshots, presence: true
end

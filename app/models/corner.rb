class Corner < ActiveRecord::Base
	validates :away, presence: true
	validates :home, presence: true
end

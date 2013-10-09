class AwayXi < ActiveRecord::Base
	validates :name, presence: true, uniqueness: true
	validates :number, presence: true, uniqueness: true
end

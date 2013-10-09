# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :supermodel do
		date "2013-09-30"
		matchid 2100
		teamname "Arsenal"
		avgpossession 1
		shotaccuracy 1
		passaccuracy 1
		attackscore 1
		defencescore 1
		possesionscore 1
		optascore 1
  end
end
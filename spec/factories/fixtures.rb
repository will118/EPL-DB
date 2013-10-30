# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :fixture do
    hometeam "Arsenal"
    awayteam "Spuds"
    kickoff  Time.now.utc
  end
end

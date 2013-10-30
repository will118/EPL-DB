# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :foul do
    home 9
    away 5
    hometeam "Arsenal"
    matchdate Time.now - 1.day
  end
end

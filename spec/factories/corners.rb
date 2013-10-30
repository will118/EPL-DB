# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :corner do
    home 13
    away 7
    hometeam "Arsenal"
    matchdate Time.now - 1.day
  end
end

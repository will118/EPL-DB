# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :passing do
    date "2013-09-27"
    totalpasses 1
    accuracy 1
  end
end

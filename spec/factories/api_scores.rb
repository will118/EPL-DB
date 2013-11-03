# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :api_score do
    date "2013-11-03 10:17:16"
    home "MyString"
    away "MyString"
    status "MyString"
    halftime "MyString"
    fulltime "MyString"
    incidents "MyText"
  end
end

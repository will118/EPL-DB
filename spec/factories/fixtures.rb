# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :fixture do
    hometeam "MyString"
    awayteam "MyString"
    kickoff "2013-09-24 13:10:24"
    competition "MyString"
  end
end

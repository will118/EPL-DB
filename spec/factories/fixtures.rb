# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :fixture do
    hometeam "MyString"
    awayteam "MyString2"
    kickoff  Time.now.utc
  end
end

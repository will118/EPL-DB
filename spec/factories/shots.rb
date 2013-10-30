FactoryGirl.define do
  factory :shot do
    homeshots 13
    awayshots 10
    hometeam "Crystal Palace"
    awayteam "Arsenal"
    matchdate Time.now - 1.day
  end
end
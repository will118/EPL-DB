FactoryGirl.define do
  factory :target do
    homeshots 10
    awayshots 12
    hometeam "Arsenal"
    matchdate Time.now - 1.day
  end
end

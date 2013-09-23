# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :bet do
    homescore 1
    awayscore 1
    homeodds "2.09"
    awayodds "4.99"
  end
end

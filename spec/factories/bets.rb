# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :bet do
    homescore 1
    awayscore 1
    homeodds "9.99"
    awayodds "9.99"
  end
end

# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :cach, :class => 'Cache' do
    json "MyText"
  end
end

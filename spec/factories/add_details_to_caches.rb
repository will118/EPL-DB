# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :add_details_to_cach, :class => 'AddDetailsToCache' do
    type "MyText"
  end
end

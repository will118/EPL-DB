# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :authorization do
    provider "MyString"
    uid "MyString"
    user_id 1
    token "MyString"
    secret "MyString"
    name "MyString"
    url "MyString"
  end
end

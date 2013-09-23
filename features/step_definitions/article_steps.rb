Given(/^I am on the articles page$/) do
	 visit '/articles'
end

Given(/^I am on the new article page$/) do
  visit '/articles/new'
end

Given(/^I fill in "(.*?)" with "(.*?)"$/) do |fieldname, text|
  fill_in fieldname, with: text
end


# not very DRY but different methods...

Given(/^I click "(.*?)"$/) do |button|
  click_on button
end

When(/^I press "(.*?)"$/) do |button|
  click_button button
end

Then(/^the page should have notice message "(.*?)"$/) do |message|
  page.should have_xpath('//center[1]/div', :text => message)
end

Then(/^the article should immediately appear on the page$/) do
  page.should have_xpath('//center[2]/table', :text => "Article textbody")
end

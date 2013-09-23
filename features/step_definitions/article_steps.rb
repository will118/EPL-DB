Given(/^I am on the articles page$/) do
	 visit '/articles'
end

Given(/^I am on the new article page$/) do
  visit '/articles/new'
end

Given(/^I fill in "(.*?)" with "(.*?)"$/) do |article_title, article_body|
  fill_in 'article_title', with: article_title
  fill_in 'article_body', with: article_body
end

Given(/^I click "(.*?)"$/) do |button|
  click_on button
end

When(/^I press "(.*?)"$/) do |button|
  click_button button
end

Then(/^the page should have notice message "(.*?)"$/) do |message|
  page.should have_xpath('//center[1]/div', :text => message)
end

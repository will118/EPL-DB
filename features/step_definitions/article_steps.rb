Given(/^I am on the articles page$/) do
    links = Arscom.new
    links.link_filter
    links.noko_save
	 visit '/articles'
end

Given(/^I am on the new article page$/) do
  visit '/articles/new'
end

Given(/^I am on the fixtures page$/) do
  visit '/fixtures'
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

Then(/^the page should be full of articles$/) do
  page.should have_xpath('html/body/div/div/p[11]')
end

Then(/^the page should have upcoming fixtures$/) do
	page.should have_css('#venue1', text: 'Arsenal')
	page.should have_css('#venue2', text: 'Arsenal')
	page.should have_css('#venue3', text: 'Arsenal')
end

Then(/^the page should have a league table$/) do
  page.should have_css('#pltable', text: 'Arsenal')
end

Then(/^the page should have two populated team tables$/) do
  page.should have_css('.teams tr', count: 24)
end

Then(/^the page should have two strings of form$/) do
  page.should have_css('#hometeamform', text: "W")
  page.should have_css('#awayteamform', text: "W")
end
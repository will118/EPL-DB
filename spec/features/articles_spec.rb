require 'spec_helper'

feature 'Usermanagement' do
	scenario "adds a new user" do
	article = create(:article)

		visit '/articles'
		expect{
		 fill_in 'article_title', with: 'This Rat Widow'
		 fill_in 'article_body', with: 'secret secret secret'
		 click_button 'Add comment'
		 }.to change(Article, :count).by(1)

	 end
 end
require 'nokogiri'
require 'open-uri' 
require 'capybara/poltergeist'
require 'capybara/mechanize'
require 'prettyprint'

Capybara.app_host = "http://www.bbc.co.uk"
Capybara.default_driver = :poltergeist

class BBCScraper
	include Capybara::DSL

  def initialize(match_id)
    @match_id = match_id
  end

  def team_stats
   bbc_page.css('line-up-wrapper')
  end
 

  def bbc_page
    unless @bbc_page
      new_session
      visit "http://www.bbc.co.uk/sport/0/football/#{@match_id}"
      sleep 3 
      @bbc_page = Nokogiri::HTML.parse(html)
    end
    @bbc_page
  end
end

def new_session
 
    Capybara.register_driver :poltergeist do |app|
      Capybara::Poltergeist::Driver.new(app)
    end

    Capybara.default_selector = :xpath
    
    @session = Capybara::Session.new(:poltergeist)

    @session.driver.headers = { 'User-Agent' =>
      "Mozilla/5.0 (Macintosh; Intel Mac OS X)" }

    @session
end

  def html
    session.html
  end

   bbc = BBCScraper.new(24098512)
   data = bbc.bbc_page
   pp data
  require 'nokogiri'  
  require 'open-uri' 
  require 'capybara/mechanize'


  def new_session
    Capybara.app_host = "http://www.bbc.co.uk"
 
    Capybara.register_driver :selenium do |app|
      Capybara::Selenium::Driver.new(app)
    end

    Capybara.default_selector = :xpath
    
    @session = Capybara::Session.new(:selenium)

    # @session.driver.headers = { 'User-Agent' =>
    #   "Mozilla/5.0 (Macintosh; Intel Mac OS X)" }

    @session
  end

  # Returns the current session's page
  def html
    session.html
  end
end
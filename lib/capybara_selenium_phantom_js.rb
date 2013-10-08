require 'nokogiri'  
require 'open-uri'
require 'capybara/poltergeist'

class JSBBC
  def new_session
    Capybara.app_host = "http://www.bbc.co.uk/sport/0/football/24350247"
    
    Capybara.javascript_driver = :poltergeist

    Capybara.default_selector = :xpath
    
    @session = Capybara::Session.new(:poltergeist)
    
       # Report using a particular user agent
    @session.driver.headers = { 'User-Agent' =>
      "Mozilla/5.0 (Macintosh; Intel Mac OS X)" }
 

    return @session.driver.network_traffic
  end

  # Returns the current session's page
  def html
    session.html
  end


end


p kk = JSBBC.new.new_session

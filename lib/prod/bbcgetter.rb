require_relative 'namenormaliser'
require 'open-uri'

class BBCGetter
  include NameNormaliser

  def is_valid_match?
    !!(@rawlink =~ /(\/sport\/football\/\d+)/)
  end

  def get(fixture)
    if (fixture.jsonurl == nil) || (fixture.jsonurl == "")
      team = bbc_name(fixture.hometeam)
      uri = "http://www.bbc.co.uk/sport/football/premier-league/fixtures"
      doc = Nokogiri::HTML(open(uri))
      doc1 = doc.xpath('html/body/div[3]/div/div/div[1]')
      mentions = doc1.search "[text()*='#{team}']"
      match = mentions.first.parent.parent.parent.parent
      @rawlink = match.css('a').last['href']
      if is_valid_match? == true
        raw_link
        fixture.link_save(@rawlink, @jsonurl, @lineup_url)
      else
        @rawlink = fixture.rawlink
        @jsonurl = fixture.jsonurl
        @lineup_url = fixture.lineup_url
      end
    end
  end

  def raw_link
    puts "Getting rawlink"
    driver = Selenium::WebDriver.for(:remote, :url => "http://localhost:9134")
    base = "http://www.bbc.co.uk"
    driver.navigate.to (base+@rawlink)
    page = driver.page_source
    json_link = page.match(/(http:\/\/polling.bbc.co.uk\/sport\/shared\/football\/oppm\/json).{11}/)
    lineup_link = page.match(/(http:\/\/polling.bbc.co.uk\/sport\/shared\/football\/oppm\/line-up).{11}/)
    @jsonurl = json_link.to_s
    @lineup_url = lineup_link.to_s
    driver.quit
  end

  def self.get_json(jsonurl)
    rawbbc = JSON.parse HTTParty.get(jsonurl).response.body.delete('(').delete(');')
    midway = rawbbc['data']['payload']['Match']
    result = []
    midway.each { |x| result = x.assoc('stats') }
    result[1]
  end

end
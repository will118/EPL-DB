require 'open-uri'

class BBCGetter

  def is_valid_match?(link)
    !!(link =~ /(\/sport\/football\/\d+)/) || !!(link =~ /(sport\/\d\/football\/\d+)/)
  end

  def self.get_json(url)
    rawbbc = json_get(url).delete('(').delete(');')
    rawbbc['data']['payload']['Match'].last['stats']
  end

  def get(fixture)
    if (fixture.jsonurl == nil) || (fixture.jsonurl == "")
      team = bbc_name(fixture.hometeam)
      uri = "http://www.bbc.co.uk/sport/football/premier-league/fixtures"
      doc = Nokogiri::HTML(open(uri))
      doc1 = doc.xpath('html/body/div[3]/div/div/div[1]')
      mentions = doc1.search "[text()*='#{team}']"
      match = mentions.first.parent.parent.parent.parent
      link = match.css('a').last['href'] 
      if is_valid_match?(link) == true
        json_link, lineup_link = hidden_links(link)
        fixture.link_save(link, jsonurl, lineup_url)
      else "Invalid link"
      end
    else "Got JSON url"
    end
  end

  def hidden_links(link)
    driver = Selenium::WebDriver.for(:remote, :url => "http://localhost:9134")
    base = "http://www.bbc.co.uk"
    driver.navigate.to (base+link)
    page = driver.page_source
    json_link = page.match(/(http:\/\/polling.bbc.co.uk\/sport\/shared\/football\/oppm\/json).{11}/).to_s
    lineup_link = page.match(/(http:\/\/polling.bbc.co.uk\/sport\/shared\/football\/oppm\/line-up).{11}/).to_s
    driver.quit
    [json_link,lineup_link]
  end

end
class ScoreFactory

  def self.save
    driver = Selenium::WebDriver.for(:remote, :url => "http://localhost:9134")
    base = "http://www.bbc.co.uk/sport/football/live-scores/premier-league"
    driver.navigate.to (base)
    page = Nokogiri::HTML(driver.page_source)
    driver.quit

    table = page.css('#live-scores-table')
    tr = table.css('tr td')

    array = tr.map do |x|
      hometeam = x.css('.team-home').text
      awayteam = x.css('.team-away').text
      score = x.css('.score').text.gsub(/[\\n\s+]/, '')
      {"teams" => (hometeam + " vs. " + awayteam), "score"=> score}
    end

    live_scores = array.delete_if {|x| x['score'].length < 2}

    live_scores.each do |x|
      Score.save_data(x['teams'], x['score'])
    end
  end
  
end
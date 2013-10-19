require "selenium-webdriver"
require "open-uri"
require "nokogiri"


driver = Selenium::WebDriver.for(:remote, :url => "http://localhost:9134")
base = "http://www.bbc.co.uk/sport/football/live-scores/premier-league"
driver.navigate.to (base)
page = Nokogiri::HTML(driver.page_source)
driver.quit

# page
table = page.css('#live-scores-table')

tr = table.css('tr td')


array = tr.map do |x| 
	hometeam = x.css('.team-home').text
	awayteam = x.css('.team-away').text
	score = x.css('.score').text.gsub(/[\\n\s+]/, '')
	{"teams" => (hometeam + " vs. " + awayteam), "score"=> score}
end

live_scores = array.delete_if {|x| x['score'].length < 1}
p live_scores



# str = "\n                                                                                            2 - 2                                                                                    "

# p str.gsub(/[\\n\s+]/, '')





# puts table.css('#team-home')
# puts table.css('#score')
# puts table.css('#team-away')
# puts table.css('#elapsed-time')
			



# hometeam = 
# awayteam = 
# puts "Hometeam: #{hometeam} : #{homescore}"
# puts "Awayteam: #{awayteam} : #{awayscore}"


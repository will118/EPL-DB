require "open-uri"
require "nokogiri"
require "selenium-webdriver"

url = "http://polling.bbc.co.uk/sport/shared/football/oppm/line-up/EFBO694983"

driver = Selenium::WebDriver.for(:remote, :url => "http://localhost:9134")
driver.navigate.to (url)
document = Nokogiri::HTML(driver.page_source)
driver.quit

teams = document.css('#oppm-team-list')

hometeam = teams.css('h3.team-name')[0].text
awayteam = teams.css('h3.team-name')[1].text

both_xis = teams.css('.player-list>li')
both_subs = teams.css('.subs-list>li')

home_xi = both_xis[0..10]
away_xi = both_xis[11..21]

home_subs = both_subs[0..6]
away_subs = both_subs[7..13]

  p hometeam.class

# home_xi.each do |player|
#   xxx = player.inner_text.strip.gsub(/\s+/, ' ').gsub(/'\s{1}/, '')
#   p xxx.class
# #    Team.where(:player => xxx, :teamname => hometeam, :starting => true).first_or_create
# end

# home_subs.each do |player|
#   Team.where(:player => player.inner_text.strip, :teamname => hometeam, :starting => false).first_or_create
# end
# away_xi.each do |player|
#   xxx = player.inner_text.strip.gsub(/\s+/, ' ').gsub(/'\s{1}/, '')
#   Team.where(:player => xxx, :teamname => awayteam, :starting => true).first_or_create
# end

# away_subs.each do |player|
#   Team.where(:player => player.inner_text.strip, :teamname => awayteam, :starting => false).first_or_create
# end


# x.gotteam = true
# x.save
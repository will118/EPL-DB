# require "open-uri"
# require "nokogiri"
# require "selenium-webdriver"


# base = "http://www.bbc.co.uk/sport/0/football/24503985"

# document = Nokogiri::HTML(open(base))


# 		home = document.xpath('html/body/div/div/div[1]')
# 		away = document.xpath('html/body/div/div/div[2]')
# 		hometeam = home.css('h3.team-name').inner_text
# 		awayteam = away.css('h3.team-name').inner_text


# puts home
# puts away

# 		# home.css('.player-list>li').each do |x| 
# 		# 	xx = x.inner_text.strip.split(' ')
			
# 		# 	Team.where(:player => xx[1], :number => xx[0].to_i, :subbed => (xx[2..4].join).delete('('), :teamname => hometeam, :starting => true).first_or_create
# 		# end
# 		# home.css('.subs-list>li').each do |x| 
# 		# 	xx = x.inner_text.strip.split(' ')
			
# 		# 	Team.where(:player => xx[1], :number => xx[0].to_i, :teamname => hometeam, :starting => false).first_or_create
# 		# end

# 		# away.css('.player-list>li').each do |x| 
# 		# 	xx = x.inner_text.strip.split(' ')
			
# 		# 	Team.where(:player => xx[1], :number => xx[0].to_i, :subbed => (xx[2..4].join).delete('('), :teamname => awayteam, :starting => true).first_or_create
# 		# end
# 		# away.css('.subs-list>li').each do |x| 
# 		# 	xx = x.inner_text.strip.split(' ')
			
# 		# 	p (:player => xx[1], :number => xx[0].to_i, :teamname => awayteam, :starting => false)
# 		# end
scores = ["2-2", "4-1", "4-1", "2-1", "1-1", "0-0", "4-0", "1-3", "v", "0-0"]
p scores
scores.delete_if {|x| x =~ /[a-z]/}
p scores
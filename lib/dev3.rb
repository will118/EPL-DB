require 'poltergeist'
require 'capybara'
require "HTTParty"
require 'json'

data = {"possession"=>{"home"=>63, "away"=>37}, "shotsOnTarget"=>{"home"=>4, "away"=>1}, "shots"=>{"home"=>9, "away"=>13}, "corners"=>{"home"=>6, "away"=>3}, "fouls"=>{"home"=>16, "away"=>17}}

# homeposs = data['possession']['home']
# awayposs = data['possession']['away']
targets = Target.new
targets.homeshots = data['shotsOnTarget']['home']
targets.awayshots = data['shotsOnTarget']['away']
targets.save

shots = Shot.new
shots.homeshots = data['shots']['home']
shots.awayshots = data['shots']['away']
shots.save

corners = Corner.new
corners.home = data['corners']['home']
corners.away = data['corners']['away']
corners.save

fouls = Foul.new
fouls.home = data['fouls']['home']
fouls.away = data['fouls']['away']
fouls.save


# 	from_date = Time.new.strftime("%Y-%m-%d")
# 		to_date = "2013-11-22"

# 		fixtures = "http://api.statsfc.com/premier-league/fixtures.json?key=#{ENV["STATS_KEY"]}&team=arsenal&from=#{from_date}&to=#{to_date}&timezone=Europe/London&limit=5"
# # p HTTParty.get(fixtures).response.body

# bbcst= "http://polling.bbc.co.uk/sport/shared/football/oppm/json/EFBO726890"
# 		rawbbc = JSON.parse HTTParty.get(bbcst).response.body.delete('(').delete(');')
# 		midway = rawbbc['data']['payload']['Match']
# 		result = []
# 		midway.each { |x| result = x.assoc('stats') }
# 		p result[1]
# p JSON.parse HTTParty.get("http://polling.bbc.co.uk/sport/shared/football/oppm/json/3643937").response.body.delete('(').delete(');')
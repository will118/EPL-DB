require "json"
require "HTTParty"

class BBC

	def initialize
		@statsjson = get_json
	end

	def get_json
		bbcst= "http://polling.bbc.co.uk/sport/shared/football/oppm/json/EFBO726890"
		rawbbc = JSON.parse HTTParty.get(bbcst).response.body.delete('(').delete(');')
		midway = rawbbc['data']['payload']['Match']
		result = []
		midway.each { |x| result = x.assoc('stats') }
		return result[1]
	end

	def possession
		home = @statsjson['possession']['home']
		away = @statsjson['possession']['away']
		comboarray = []
	  homehash = {'key'=> 'Home', 'y'=> home}
	  comboarray << homehash 
	  aw = {'key'=> 'Away', 'y'=> away}
	  comboarray << aw
	  return comboarray
	end

	
		
end
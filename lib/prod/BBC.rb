class BBC

	def initialize
		@statsjson = get_json
		# @rawlink = get_bbc
	end

	def get_bbc

		uri = "http://www.bbc.co.uk/sport/football/premier-league/fixtures"
		doc = Nokogiri::HTML(open("#{uri}"))
	  doc1 = doc.xpath('html/body/div[3]/div/div/div[1]/div[3]/div[2]/div')
	  arsenalmentions = doc1.search "[text()*='Arsenal']"
	  arsenalmatch = arsenalmentions.first.parent.parent.parent.parent
		return arsenalmatch.css('a').last['href']
		
	end

	# Join these two things up. PhantomJS?

	def get_json
		rawlink = "http://www.bbc.co.uk/sport/0/football/24350247"
		bbcst= "http://polling.bbc.co.uk/sport/shared/football/oppm/json/EFBO694970"
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

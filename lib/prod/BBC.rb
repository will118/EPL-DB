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
	# rawlink = "http://www.bbc.co.uk/sport/0/football/24350247"

	def get_json
		bbcst= "http://polling.bbc.co.uk/sport/shared/football/oppm/json/EFBO694970"
		rawbbc = JSON.parse HTTParty.get(bbcst).response.body.delete('(').delete(');')
		midway = rawbbc['data']['payload']['Match']
		result = []
		midway.each { |x| result = x.assoc('stats') }
		return result[1]
	end


	def home_or_away
		# Determine the home and away teams and consequeuntly add them to the supermodel.		
	end

	class << self
		def teams
			prefix = "http://polling.bbc.co.uk/sport/shared/football/oppm/line-up/"
			suffix = "EFBO694970"

	    document = Nokogiri::HTML(open("#{prefix}#{suffix}"))
	      
      allplayers = document.xpath('//li').map do |player|
        players = player.inner_text.strip.split(' ')
        {name: players[1], number: players[0].to_i, subbed: players[2..4].join}
      end

	    hometeam = allplayers[0..10]
	    awayteam = allplayers[18..28]

	    hometeam.each do |xx|
		    y1 = xx[:number] 
		    y2 = xx[:name] 
		    name = "#{y2} (#{y1})" 
		    homexi = HomeXi.where(:name => name).first_or_create  
		    homexi.subbed = xx[:subbed].delete('(')
		    homexi.save 
	    end

	    awayteam.each do |xx|
		    y1 = xx[:number] 
		    y2 = xx[:name] 
		    name = "#{y2} (#{y1})" 
		    awayxi = AwayXi.where(:name => name).first_or_create
		    awayxi.subbed = xx[:subbed].delete('(')
		    awayxi.save 
	    end   
		end
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


	def recorder
   
    data = @statsjson
 
    poss = Poss.new
    poss.homeposs = data['possession']['home']
    poss.awayposs = data['possession']['away']
    poss.save

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

  end
		
end

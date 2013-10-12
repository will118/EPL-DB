class BBC

	attr_reader :statsjson

    
	def initialize(team)
		@rawlink = get_bbc(team)
	end

	def get_bbc(team)
		uri = "http://www.bbc.co.uk/sport/football/premier-league/fixtures"
		doc = Nokogiri::HTML(open("#{uri}"))
	  doc1 = doc.xpath('html/body/div[3]/div/div/div[1]/div[3]/div[2]/div')
	  mentions = doc1.search "[text()*='#{team.titleize}']"
	  match = mentions.first.parent.parent.parent.parent
		match.css('a').last['href']
	end

	def rawlink

		driver = Selenium::WebDriver.for(:remote, :url => "http://localhost:9134")
		driver.navigate.to @rawlink

		page = driver.page_source

		json_link = page.match(/(http:\/\/polling.bbc.co.uk\/sport\/shared\/football\/oppm\/json).{11}/)
		lineup_link = page.match(/(http:\/\/polling.bbc.co.uk\/sport\/shared\/football\/oppm\/line-up).{11}/)
		@finalurl = json_link.to_s
		@lineup_url = lineup_link.to_s
		driver.quit
		
	end


	def get_json
		rawbbc = JSON.parse HTTParty.get(@finalurl).response.body.delete('(').delete(');')
		midway = rawbbc['data']['payload']['Match']
		result = []
		midway.each { |x| result = x.assoc('stats') }
		@statsjson = result[1]
	end

	def possession
		home = @statsjson['possession']['home']
		away = @statsjson['possession']['away']
		comboarray = []
	  homehash = {'key'=> 'Home', 'y'=> home}
	  comboarray << homehash 
	  aw = {'key'=> 'Away', 'y'=> away}
	  comboarray << aw
	  comboarray
	end


	def teams
    document = Nokogiri::HTML(open(@lineup_url))
      
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

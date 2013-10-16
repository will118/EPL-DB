class BBC

	attr_reader :statsjson

	def initialize(team, obj)
		@team = team
		@obj = obj
		@rawlink = get_bbc(team)
	end

	def get_bbc(team)
		if @obj.rawlink != nil 
			uri = "http://www.bbc.co.uk/sport/football/premier-league/fixtures"
			doc = Nokogiri::HTML(open("#{uri}"))
		  doc1 = doc.xpath('html/body/div[3]/div/div/div[1]/div[3]/div[2]/div')
		  mentions = doc1.search "[text()*='#{team.titleize}']"
		  match = mentions.first.parent.parent.parent.parent
			url = match.css('a').last['href']
			#  I need a line here to save to the original Active Record relation not just @obj unless that would somehow magically work, but I doubt it.
			url
		else
			@obj.rawlink
		end
	end

	def is_it_time
		 Fixture.order(:kickoff).first(8).each do |x| 
        time_until = x.kickoff - Time.now 
        if time_until < 180
         BBC.recorder("http://polling.bbc.co.uk/sport/shared/football/oppm/json/EFBO426393", "England")
        elsif time_until < 1800
          # Try and get teams 
        else
          "Stil a bit to go.."
        end
      end
	end

	def is_valid_match?
		!!(@rawlink =~ /(\/sport\/0)/)
	end

	def raw_link
		if is_valid_match? == true
			driver = Selenium::WebDriver.for(:remote, :url => "http://localhost:9134")
			driver.navigate.to @rawlink
			page = driver.page_source
			json_link = page.match(/(http:\/\/polling.bbc.co.uk\/sport\/shared\/football\/oppm\/json).{11}/)
			lineup_link = page.match(/(http:\/\/polling.bbc.co.uk\/sport\/shared\/football\/oppm\/line-up).{11}/)
			# Likewise I need another line here to save these.
			@finalurl = json_link.to_s
			@lineup_url = lineup_link.to_s
			driver.quit
		else "Too early"
		end
	end

	def get_json
		rawbbc = JSON.parse HTTParty.get(@finalurl).response.body.delete('(').delete(');')
		midway = rawbbc['data']['payload']['Match']
		result = []
		midway.each { |x| result = x.assoc('stats') }
		@statsjson = result[1]
	end


	def recorder
   
    data = @statsjson

    if data['shotsOnTarget'] == nil
    	"No data yet"
 		else
	    poss = Poss.where(:team => @team).create
	    poss.homeposs = data['possession']['home']
	    poss.awayposs = data['possession']['away']
	    poss.save

	    targets = Target.where(:team => @team).create
	    targets.homeshots = data['shotsOnTarget']['home']
	    targets.awayshots = data['shotsOnTarget']['away']
	    targets.save

	    shots = Shot.where(:team => @team).create
	    shots.homeshots = data['shots']['home']
	    shots.awayshots = data['shots']['away']
	    shots.save

	    corners = Corner.where(:team => @team).create
	    corners.home = data['corners']['home']
	    corners.away = data['corners']['away']
	    corners.save

	    fouls = Foul.where(:team => @team).create
	    fouls.home = data['fouls']['home']
	    fouls.away = data['fouls']['away']
	    fouls.save
	  end
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

  def self.recorder(jsonurl, team)

		rawbbc = JSON.parse HTTParty.get(jsonurl).response.body.delete('(').delete(');')
		midway = rawbbc['data']['payload']['Match']
		result = []
		midway.each { |x| result = x.assoc('stats') }
		statsjson = result[1]
	
    data = statsjson

    if data['shotsOnTarget'] == nil
    	"No data yet"
 		else
	    poss = Poss.where(:team => team).create
	    poss.homeposs = data['possession']['home']
	    poss.awayposs = data['possession']['away']
	    poss.save

	    targets = Target.where(:team => team).create
	    targets.homeshots = data['shotsOnTarget']['home']
	    targets.awayshots = data['shotsOnTarget']['away']
	    targets.save

	    shots = Shot.where(:team => team).create
	    shots.homeshots = data['shots']['home']
	    shots.awayshots = data['shots']['away']
	    shots.save

	    corners = Corner.where(:team => team).create
	    corners.home = data['corners']['home']
	    corners.away = data['corners']['away']
	    corners.save

	    fouls = Foul.where(:team => team).create
	    fouls.home = data['fouls']['home']
	    fouls.away = data['fouls']['away']
	    fouls.save
	  end
  end

  def self.tester(rawlink)
		  driver = Selenium::WebDriver.for(:remote, :url => "http://localhost:9134")
			driver.navigate.to rawlink
			page = driver.page_source
			json_link = page.match(/(http:\/\/polling.bbc.co.uk\/sport\/shared\/football\/oppm\/json).{11}/)
			lineup_link = page.match(/(http:\/\/polling.bbc.co.uk\/sport\/shared\/football\/oppm\/line-up).{11}/)
			json_link.to_s
	end

		
end

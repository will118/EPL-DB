class BBC
	include BBCTeamNameNormaliser

	attr_reader :statsjson

	def initialize
		@team = team
	end

	def is_it_time
		 Fixture.order(:kickoff).first(8).each do |x| 
        time_until = x.kickoff - Time.now 
        if !!(time_until < 180) && !!(x.jsonurl != nil ) 
         BBC.recorder(x)
        elsif !!(time_until < 1800) && !!(x.rawlink == nil)
          get_bbc 
        else time_until
        end
      end
	end

	def get_bbc

		Fixture.order(:kickoff).first(8).each do |fixture|
			if fixture.rawlink == nil
				team = TeamNameNormaliser(fixture.hometeam)
				uri = "http://www.bbc.co.uk/sport/football/premier-league/fixtures"
				doc = Nokogiri::HTML(open("#{uri}"))
			  doc1 = doc.xpath('html/body/div[3]/div/div/div[1]/div[3]/div[2]/div')
			  mentions = doc1.search "[text()*='#{team.titleize}']"
			  match = mentions.first.parent.parent.parent.parent
				@rawlink = match.css('a').last['href']

				if is_valid_match? == true
					raw_link
					fixture.rawlink = @rawlink
					fixture.jsonurl = @jsonurl
					fixture.lineup_url = @lineup_url
					fixture.save
				else
					"Much too early"
				end
			else
				@rawlink = fixture.rawlink 
				@jsonurl = fixture.jsonurl
				@lineup_url = fixture.lineup_url
			end
	end


	def is_valid_match?
		!!(@rawlink =~ /(\/sport\/0)/)
	end

	def raw_link
			driver = Selenium::WebDriver.for(:remote, :url => "http://localhost:9134")
			driver.navigate.to @rawlink
			page = driver.page_source
			json_link = page.match(/(http:\/\/polling.bbc.co.uk\/sport\/shared\/football\/oppm\/json).{11}/)
			lineup_link = page.match(/(http:\/\/polling.bbc.co.uk\/sport\/shared\/football\/oppm\/line-up).{11}/)
			@jsonurl = json_link.to_s
			@lineup_url = lineup_link.to_s
			driver.quit
	end

	def get_json(jsonurl)
		rawbbc = JSON.parse HTTParty.get(jsonurl).response.body.delete('(').delete(');')
		midway = rawbbc['data']['payload']['Match']
		result = []
		midway.each { |x| result = x.assoc('stats') }
		@result[1]
	end


	def recorder(ar_record)
		# say this as "AR record" not "Activerecord record" in case an enrique-type ever comes across this.
		x = ar_record
		x.hometeam
		x.awayteam

    data = get_json(x.jsonurl)

    if data['shotsOnTarget'] == nil
    	"No data yet"
 		else
	    poss = Poss.where(:team => @team).create
	    poss.homeposs = data['possession']['home']
	    poss.hometeam = x.hometeam
	    poss.awayposs = data['possession']['away']
	    poss.awayteam = x.awayteam
	    poss.save

	    targets = Target.where(:team => @team).create
	    targets.homeshots = data['shotsOnTarget']['home']
	    targets.hometeam = x.hometeam
	    targets.awayshots = data['shotsOnTarget']['away']
	    targets.awayteam = x.awayteam
	    targets.save

	    shots = Shot.where(:team => @team).create
	    shots.homeshots = data['shots']['home']
	    shots.hometeam = x.hometeam
	    shots.awayshots = data['shots']['away']
	    shots.awayteam = x.awayteam
	    shots.save

	    corners = Corner.where(:team => @team).create
	    corners.home = data['corners']['home']
	    corners.hometeam = x.hometeam
	    corners.away = data['corners']['away']
	    corners.awayteam = x.awayteam
	    corners.save

	    fouls = Foul.where(:team => @team).create
	    fouls.home = data['fouls']['home']
	    fouls.hometeam = x.hometeam
	    fouls.away = data['fouls']['away']
	    fouls.awayteam = x.awayteam
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
end

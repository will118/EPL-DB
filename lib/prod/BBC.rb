require_relative 'namenormaliser'

class BBC
	include NameNormaliser

	attr_reader :statsjson

	def match_manager
		Fixture.order(:kickoff).first(8).each do |x| 
				time_until = (x.kickoff - Time.now)
				if ((time_until < -2900) &&  (time_until > -3700) && (x.jsonurl != nil))
					"Half Time"
				elsif (time_until < -6650)
					x.delete
				elsif ((time_until < 180) && (x.jsonurl != nil ))
					recorder(x)
				elsif ((time_until < 1800) && (x.rawlink == nil))
					get_bbc(x)
				elsif (time_until < 3600) 
					teams_array = YAML::load( File.open( 'teamnames.yml' ) )
			    teams_array.each do |team|
			      four = FourFourTwo.new(team)
			      four.text
			      four.save
			    end
				else return "Stil a while to go"
				end
		end
	end

	def get_bbc(fixture)
			if fixture.jsonurl == nil
				team = bbc_name(fixture.hometeam)
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
					return "Much too early"
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


		# say this as "AR record" not "Activerecord record" in case an enrique-type ever comes across this.
	def recorder(ar_record)
		x = ar_record

		data = get_json(x.jsonurl)

		if data['shotsOnTarget'] == nil
			"No data yet"
		else
			Poss.where(:homeposs => data['possession']['home'], :hometeam => x.hometeam, :awayposs => data['possession']['away'], :awayteam => x.awayteam).create
			Target.where(:homeshots => data['shotsOnTarget']['home'], :hometeam => x.hometeam, :awayshots => data['shotsOnTarget']['away'], :awayteam => x.awayteam).create
			Shot.where(:homeshots => data['shots']['home'], :hometeam => x.hometeam, :awayshots => data['shots']['away'], :awayteam => x.awayteam).create
			Corner.where(:home => data['corners']['home'], :hometeam => x.hometeam, :away => data['corners']['away'], :awayteam => x.awayteam).create
			Foul.where(:home => data['fouls']['home'], :hometeam => x.hometeam, :away => data['fouls']['away'], :awayteam => x.awayteam).create
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

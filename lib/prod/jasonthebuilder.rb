class JasonTheBuilder

		def fixture_json(team)
			date = Date.today
			from_date = date.to_s(:db)

			future_date = date + 2.months 
			to_date = future_date.to_s(:db)
			fixtures = "http://api.statsfc.com/#{ENV["COMP"]}/fixtures.json?key=#{ENV["STATS_KEY"]}&team=#{team}&from=#{from_date}&to=#{to_date}&timezone=#{ENV["TIMEZONE"]}&limit=#{ENV["LIMIT"]}"
			JSON.parse(HTTParty.get(fixtures).response.body)
		end

		def table_json
			table = "http://api.statsfc.com/#{ENV["COMP"]}/table.json?key=#{ENV["STATS_KEY"]}"
			JSON.parse(HTTParty.get(table).response.body)
		end


		def possession_json
			@away = Poss.pluck(:awayposs)
			@home = Poss.pluck(:homeposs)
			live_array_builder("Home Possession", "Away Possession")
		end

		def poss_pie_json
			pie = Poss.last
			home = pie['homeposs']
			away = pie['awayposs']
			comboarray = []
		  comboarray << {'key'=> 'Home', 'y'=> home}
		  comboarray << {'key'=> 'Away', 'y'=> away}
		  comboarray
		end


		def targets_json
			@away = Target.pluck(:awayshots)
			@home = Target.pluck(:homeshots)
			live_array_builder("Home Shots on Target", "Away Shots on Target")
		end

		def corners_json
			@away = Corner.pluck(:away)
			@home = Corner.pluck(:home)
			live_array_builder("Home Corners", "Away Corners")
		end

		def shots_json
			@away = Shot.pluck(:awayshots)
			@home = Shot.pluck(:homeshots)
			live_array_builder("Home Shots", "Away Shots")
		end

		def fouls_json
			@away = Foul.pluck(:away)
			@home = Foul.pluck(:home)
			live_array_builder("Home Fouls", "Away Fouls")
		end

		def live_array_builder(home, away)

			away_array = @away
			home_array = @home
			x_range = home_array.length
			x_axis_array = * 1..x_range
				
			array1 = x_axis_array.zip home_array
			array2 = x_axis_array.zip away_array		
			
			@home = array1.map do |x, y|
				{ "x"=> x, "y"=> y }
			end
			@away = array2.map do |x, y|
				{ "x"=> x, "y"=> y }
			end

			hash_composer(home, away)
			
		end


		def hash_composer(home, away)

			jj = Hash.new {|k,v| k[v]}
			jj2 = Hash.new {|k,v| k[v]}

			jj["key"] = home
			jj["values"] = @home

			jj2["key"] = away
			jj2["values"] = @away

			final = []

			final << jj
			final << jj2

			final

		end

		def top_scorers_json(team)
			raw = "http://api.statsfc.com/top-scorers.json?key=#{ENV["STATS_KEY"]}&competition=#{ENV["COMP"]}&team=#{team.titleize}&year=2013/2014"
			HTTParty.get(raw).response.body
		end		



		def self.form(team)

			date = Date.today
			from_date = date.to_s(:db)

			future_date = date + 2.months 
			to_date = future_date.to_s(:db)

			fixtures = "http://api.statsfc.com/premier-league/fixtures.json?key=#{ENV["STATS_KEY"]}&team=#{team}&from=#{from_date}&to=#{to_date}&timezone=Europe/London&limit=5"

			teamform = "http://api.statsfc.com/premier-league/form.json?key=#{ENV["STATS_KEY"]}&team=#{team}"

			form0 = JSON.parse HTTParty.get(fixtures).response.body
			form1 = JSON.parse HTTParty.get(teamform).response.body

			away = form0.first.fetch('awaypath')
			awayname = form0.first.fetch('awayshort')

			form = []

			form1.each do |x| 
				 if x.has_value?(team)
					h = {team: team.capitalize, form: x.fetch('form')}
					form << h 
				elsif x.has_value?(away)
					h2 = {team: awayname, form: x.fetch('form')}
					form << h2
				end
			end
				form
		end

	def jason(team)

		normalized_team = team.titleize
		
		avg_poss = Supermodel.where(:teamname => normalized_team).pluck(:avgpossession)
		shot_acc = Supermodel.where(:teamname => normalized_team).pluck(:shotaccuracy)
		pass_acc = Supermodel.where(:teamname => normalized_team).pluck(:passaccuracy)
		att_score = Supermodel.where(:teamname => normalized_team).pluck(:attackscore)
		def_score = Supermodel.where(:teamname => normalized_team).pluck(:defencescore)
		poss_score = Supermodel.where(:teamname => normalized_team).pluck(:possesionscore)
		opta_score = Supermodel.where(:teamname => normalized_team).pluck(:optascore)
		
		length_of_models = opta_score.length

		matchnumber = * 1..length_of_models

		[matchnumber, pass_acc, shot_acc, def_score, att_score, poss_score, opta_score, avg_poss].transpose.map do |x, y, z, d, a, p, o, v| 
			{ 'x'=> x, "pass_acc"=> y, "shot_acc"=> z, "def_score"=> d, "att_score"=> a, "poss_score"=> p, "opta_score"=> o, "avg_poss"=> v}
		end

	end

end

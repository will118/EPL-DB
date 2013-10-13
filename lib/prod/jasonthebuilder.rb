class JasonTheBuilder

		def fixture_json(team)
			team2 = team.gsub(/[\s]/, "-")
			date = Date.today
			from_date = date.to_s(:db)

			future_date = date + 2.months 
			to_date = future_date.to_s(:db)
			fixtures = "http://api.statsfc.com/#{ENV["COMP"]}/fixtures.json?key=#{ENV["STATS_KEY"]}&team=#{team2}&from=#{from_date}&to=#{to_date}&timezone=#{ENV["TIMEZONE"]}&limit=#{ENV["LIMIT"]}"
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

	def self.single_form
		teamform = "http://api.statsfc.com/premier-league/form.json?key=#{ENV["STATS_KEY"]}"		
		JSON.parse HTTParty.get(teamform).response.body
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

		def deprecated_jason(team)

		normalized_team = team.titleize
		
		mixarray1 = Supermodel.where(:teamname => normalized_team).map(&:avgpossession)
		mixarray2 = Supermodel.where(:teamname => normalized_team).map(&:shotaccuracy)
		mixarray3 = Supermodel.where(:teamname => normalized_team).map(&:passaccuracy)
		mixarray4 = Supermodel.where(:teamname => normalized_team).map(&:attackscore)
		mixarray5 = Supermodel.where(:teamname => normalized_team).map(&:defencescore)
		mixarray6 = Supermodel.where(:teamname => normalized_team).map(&:possesionscore)
		mixarray7 = Supermodel.where(:teamname => normalized_team).map(&:optascore)
		
		length_of_models = mixarray7.length

		matchnumber = * 1..length_of_models


		barray1 = matchnumber.zip mixarray1
		barray2 = matchnumber.zip mixarray2
		barray3 = matchnumber.zip mixarray3
		barray4 = matchnumber.zip mixarray4
		barray5 = matchnumber.zip mixarray5
		barray6 = matchnumber.zip mixarray6
		barray7 = matchnumber.zip mixarray7

		newarray1 = barray1.map do |x, y|
			{ "x"=> x, "y"=> y }
		end
		newarray2 = barray2.map do |x, y|
			{ "x"=> x, "y"=> y }
		end
		newarray3 = barray3.map do |x, y|
			{ "x"=> x, "y"=> y }
		end
		newarray4 = barray4.map do |x, y|
			{ "x"=> x, "y"=> y }
		end
		newarray5 = barray5.map do |x, y|
			{ "x"=> x, "y"=> y }
		end
		newarray6 = barray6.map do |x, y|
			{ "x"=> x, "y"=> y }
		end
		newarray7 = barray7.map do |x, y|
			{ "x"=> x, "y"=> y }
		end

		jj = Hash.new {|k,v| k[v]}
		jj2 = Hash.new {|k,v| k[v]}
		jj3 = Hash.new {|k,v| k[v]}
		jj4 = Hash.new {|k,v| k[v]}
		jj5 = Hash.new {|k,v| k[v]}
		jj6 = Hash.new {|k,v| k[v]}
		jj7 = Hash.new {|k,v| k[v]}

		jj["key"] = "Average Possesion"
		jj["values"] = newarray1

		jj2["key"] = "Shot Accuracy"
		jj2["values"] = newarray2

		jj3["key"] = "Pass Accuracy"
		jj3["values"] = newarray3

		jj4["key"] = "Attack Score"
		jj4["values"] = newarray4

		jj5["key"] = "Defence Score"
		jj5["values"] = newarray5

		jj6["key"] = "Possession Score"
		jj6["values"] = newarray6

		jj7["key"] = "Opta Score"
		jj7["values"] = newarray7


		final = []

		final << jj
		final << jj2
		final << jj3
		final << jj4
		final << jj5
		final << jj6
		final << jj7


		return final

	end



end

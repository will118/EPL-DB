require_relative 'namenormaliser'

class JasonTheBuilder
	include NameNormaliser

		def fixture_json(team)
			team2 = stats_fc_normaliser(team)
			date = Date.today
			from_date = date.to_s(:db)

			future_date = date + 2.months 
			to_date = future_date.to_s(:db)
			fixtures = "http://api.statsfc.com/#{ENV["COMP"]}/fixtures.json?key=#{ENV["STATS_KEY"]}&team=#{team2}&from=#{from_date}&to=#{to_date}&timezone=#{ENV["TIMEZONE"]}&limit=5"
			JSON.parse(HTTParty.get(fixtures).response.body)
		end

		def table_json
			table = "http://api.statsfc.com/#{ENV["COMP"]}/table.json?key=#{ENV["STATS_KEY"]}"
			JSON.parse(HTTParty.get(table).response.body)
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

	def jason(team)

		normalized_team = team.titleize
		
		avg_poss = Supermodel.where(:teamname => normalized_team).pluck(:avgpossession)
		shot_acc = Supermodel.where(:teamname => normalized_team).pluck(:shotaccuracy)
		pass_acc = Supermodel.where(:teamname => normalized_team).pluck(:passaccuracy)
		att_score = Supermodel.where(:teamname => normalized_team).pluck(:attackscore)
		def_score = Supermodel.where(:teamname => normalized_team).pluck(:defencescore)
		poss_score = Supermodel.where(:teamname => normalized_team).pluck(:possesionscore)
		opta_score = Supermodel.where(:teamname => normalized_team).pluck(:optascore)

		matchnumber = * 1..(opta_score.length)

		[matchnumber, pass_acc, shot_acc, def_score, att_score, poss_score, opta_score, avg_poss].transpose.map do |x, y, z, d, a, p, o, v| 
			{ 'x'=> x, "pass_acc"=> y, "shot_acc"=> z, "def_score"=> d, "att_score"=> a, "poss_score"=> p, "opta_score"=> o, "avg_poss"=> v}
		end

	end

	def top_scorers_json(team)
		team2 = stats_fc_normaliser(team)
		raw = "http://api.statsfc.com/top-scorers.json?key=#{ENV["STATS_KEY"]}&competition=#{ENV["COMP"]}&team=#{team2}&year=2013/2014"
		HTTParty.get(raw).response.body
	end		

	def self.single_form
		teamform = "http://api.statsfc.com/premier-league/form.json?key=#{ENV["STATS_KEY"]}"		
		JSON.parse HTTParty.get(teamform).response.body
	end

	def poss(team)


		poss_arr = [] 

		Poss.where(["awayteam = ? or hometeam = ?", team.titleize, team.titleize]).each do |x|
			if x.hometeam = team
				poss_arr << x.homeposs
			else 
				poss_arr << x.awayposs
			end
		end
		
		live = poss_arr.drop_while {|i| i == 100 }
		x_axis_array = * 1..(live.length)

		array = [x_axis_array, live].transpose.map do |x, y| 
							[ x, y ] 
						end
		return [{"key" => "Possession", "values" => array}]
	end

	def targets(team)
		home = []
		away = []
			Target.where(["awayteam = ? or hometeam = ?", team, team]).each do |x|
				home << x.homeshots
				away << x.awayshots
				@hometeam = x.hometeam
				@awayteam = x.awayteam
			end
			nv_builder(home, away)
	end

	def corners(team)
		home = []
		away = []
			Corner.where(["awayteam = ? or hometeam = ?", team, team]).each do |x|
				home << x.home
				away << x.away
				@hometeam = x.hometeam
				@awayteam = x.awayteam
			end
			nv_builder(home, away)
	end

	def fouls(team)
		home = []
		away = []
			Foul.where(["awayteam = ? or hometeam = ?", team, team]).each do |x|
				home << x.home
				away << x.away
				@hometeam = x.hometeam
				@awayteam = x.awayteam
			end
			nv_builder(home, away)
	end

	def shots(team)
		home = []
		away = []
			Shot.where(["awayteam = ? or hometeam = ?", team, team]).each do |x|
				home << x.homeshots
				away << x.awayshots
				@hometeam = x.hometeam
				@awayteam = x.awayteam
			end
			nv_builder(home, away)
	end

	def nv_builder(home, away)
		x_axis_array = * 1..(away.length)

		home_array = [x_axis_array, home].transpose.map do |x_axis_array, home|
				[x_axis_array, home] 
		end

		away_array = [x_axis_array, away].transpose.map do |x_axis_array, away|
				[x_axis_array, away] 
		end

		return [{"key"=>@hometeam, "values"=> home_array}, {"key"=>@awayteam, "values"=> away_array}]
	end

end

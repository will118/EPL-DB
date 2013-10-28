module NameNormaliser

	def bbc_name(team)
		case team
			when "Hull City" then "Hull"
			when "Manchester City" then "Man City"
			when "Newcastle United" then "Newcastle"
			when "Tottenham Hotspur" then "Tottenham"
			when "West Bromwich Albion" then "West Brom"
			when "Cardiff City" then "Cardiff"
			when "Swansea City" then "Swansea"
			when "Aston Villa" then "Aston Villa"
			when "Manchester United" then "Man Utd"
			when "Stoke City" then "Stoke"
			when "Norwich City" then "Norwich"
			when "West Ham United" then "West Ham"
			else
				team
		end
	end

	def squawka_id(team)
		case team
      when "Arsenal" then "31"
      when "Aston Villa" then "32"
      when "Chelsea" then "33"
      when "Everton" then "34"
      when "Fulham" then "35"
      when "Liverpool" then "36"
      when "Manchester City" then "37"
      when "Manchester United" then "38"
      when "Newcastle United" then "39"
      when "Norwich City" then "40"
      when "Southampton" then "43"
      when "Stoke City" then "44"
      when "Sunderland" then "45"
      when "Swansea City" then "46"
      when "Tottenham Hotspur" then "47"
      when "West Bromwich Albion" then "48"
      when "West Ham United" then "49"
      when "Cardiff City" then "168"
      when "Crystal Palace" then "169"
      when "Hull City" then "170"
    end
	end

	def stats_fc_normaliser(team)
		team.gsub!(/[\s]/, "-")
		team
	end	

	def stats_fc_checker(team)
		case team
			when "Arsenal" then "1"
			when "Liverpool" then "1"
			when "Chelsea" then "1"
			when "Southampton" then "1"
			when "Everton" then "1"
			when "Hull-City" then "1"
			when "Manchester-City" then "1"
			when "Newcastle-United" then "1"
			when "Tottenham-Hotspur" then "1"
			when "West-Bromwich-Albion" then "1"
			when "Cardiff-City" then "1"
			when "Swansea City" then "1"
			when "Aston-Villa" then "1"
			when "Manchester-United" then "1"
			when "Stoke-City" then "1"
			when "Norwich-City" then "1"
			when "West Ham-United" then "1"
			when "Fulham" then "1"
			when "Crystal-Palace" then "1"
			when "Sunderland" then "1"
		else "0"
		end
	end
		
end

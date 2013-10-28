class LiveBars

	def self.shots(team)

    shot = Shot.last_where(team)
    total = (shot.homeshots + shot.awayshots)
    homeshots = (shot.homeshots.to_f/total.to_f)*100
    awayshots = (shot.awayshots.to_f/total.to_f)*100
    comboarray = []
    hometeam = shot.hometeam.downcase.gsub(/[" "]/, "-")
    awayteam = shot.awayteam.downcase.gsub(/[" "]/, "-")
      comboarray << {'value'=> homeshots, 'type'=> hometeam}
      comboarray << {'value'=> awayshots, 'type'=> awayteam}
    comboarray		
	
	end

	def self.possession(team)
		
    poss = Poss.last_where(team)
    comboarray = []
    hometeam = poss.hometeam.downcase.gsub(/[" "]/, "-")
    awayteam = poss.awayteam.downcase.gsub(/[" "]/, "-")
    if (poss.homeposs + poss.awayposs) == 101
      comboarray << {'value'=> (poss['homeposs']-0.5), 'type'=> hometeam}
      comboarray << {'value'=> (poss['awayposs']-0.5), 'type'=> awayteam}
    else
      comboarray << {'value'=> poss['homeposs'], 'type'=> hometeam}
      comboarray << {'value'=> poss['awayposs'], 'type'=> awayteam}
    end
    comboarray
  
  end

end
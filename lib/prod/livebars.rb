class LiveBars
  
  class << self

  	def shots(team)
      shot = Shot.last_where(team)
      [{'value'=> shot.homeshots_percent, 'type'=> shot.hometeam_hyphenated}, 
        {'value'=> shot.awayshots_percent, 'type'=> shot.awayteam_hyphenated}]
  	end


  	def possession(team)
      poss = Poss.last_where(team)
      if poss.over_100?
        [{'value'=> poss.homeposs_percent, 'type'=> poss.hometeam_hyphenated},
          {'value'=> poss.awayposs_percent, 'type'=> poss.awayteam_hyphenated}]
      else
        [{'value'=> poss['homeposs'], 'type'=> poss.hometeam_hyphenated},
        {'value'=> poss['awayposs'], 'type'=> poss.awayteam_hyphenated}]
      end
    end
  end

end


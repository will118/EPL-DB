class LiveBars
  
  class << self

  	def shots(team)
      shot = Shot.last_where(team)
      [{'value'=> homeshots_percent, 'type'=> shot.hometeam_hyphenated}, 
        {'value'=> awayshots_percent, 'type'=> shot.awayteam_hyphenated}]
  	end


  	def possession(team)
      poss = Poss.last_where(team)
      if over_100?
        [{'value'=> (poss['homeposs']-0.5), 'type'=> poss.hometeam_hyphenated},
          {'value'=> (poss['awayposs']-0.5), 'type'=> poss.awayteam_hyphenated}]
      else
        [{'value'=> poss['homeposs'], 'type'=> poss.hometeam_hyphenated},
        {'value'=> poss['awayposs'], 'type'=> poss.awayteam_hyphenated}]
      end
    end
  end

end
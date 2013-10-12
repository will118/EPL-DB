class Squawka  

  attr_reader :avgpos, :parsed_json, :shotacc, :opta, :passacc

  def initialize(team)
    @parsed_json = selector(team)
    @teamname = team
  end

  def selector(team)
    id = case team
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
      when "Spurs" then "47"
      when "West Brom" then "48"
      when "West Ham" then "49"
      when "Cardiff City" then "168"
      when "Crystal Palace" then "169"
      when "Hull City" then "170"
    end
    sqk = "http://www.squawka.com/wp-content/themes/squawka_web/stats_process.php?club_id=#{id}&team_type=all&min=1&max=100&competition_id=64"
    JSON.parse HTTParty.get(sqk).response.body
  end

  def hasher
    @avgpos = @parsed_json.assoc('avgpossession')[1]
    @shotacc = @parsed_json.assoc('shotaccuracy_ot')[1]
    @opta = @parsed_json.assoc('performance')[1]
    @passacc = @parsed_json.assoc('pass_acc_ot')[1]
  end


  def save
    ids = []
    
    @avgpos.each do |k, v|
      ids << k
    end

    ids.each do 
      |key|
        gisele = Supermodel.where(:matchid => key, :teamname => @teamname).first_or_create
        poss = @passacc[key].fetch('success')
        poss2 = @passacc[key].fetch('unsuccess')
        gisele.passaccuracy = (poss - poss2)  
        gisele.avgpossession = (@avgpos[key].fetch('total')) * 5
        total = @shotacc[key].fetch('total')
        total2 = @shotacc[key].fetch('offtarget')
        gisele.shotaccuracy = ((total + 1) / (total2 + 1))*50
        h = @opta[key]
        gisele.attackscore = h.fetch('attack')
        gisele.defencescore = h.fetch('defence')
        gisele.possesionscore = h.fetch('possesion')
        gisele.optascore = h.fetch('total')
        gisele.date = h.fetch('date')
        gisele.save
      end
  end

end
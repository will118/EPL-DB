class Squawka  

SQWK = "http://www.squawka.com/wp-content/themes/squawka_web/stats_process.php?club_id=31&team_type=all&min=1&max=100&competition_id=64"


  attr_reader :avgpos, :parsed_json, :shotacc, :opta, :passacc

  def initialize
    @parsed_json = JSON.parse HTTParty.get(SQWK).response.body
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
        gisele = Supermodel.where(:matchid => key).first_or_create 
        poss = @passacc[key].fetch('success')
        poss2 = @passacc[key].fetch('unsuccess')
        gisele.passaccuracy = (poss - poss2)  
        gisele.avgpossession = (@avgpos[key].fetch('total')) * 5
        total = @shotacc[key].fetch('total')
        total2 = @shotacc[key].fetch('offtarget')
        gisele.shotaccuracy = (total / total2)*50
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
class Squawka

  def initialize(team)
    @parsed_json = get(team)
    @teamname = team
  end

  def get(team)
    id = squawka_id(team)
    sqk = "http://www.squawka.com/wp-content/themes/squawka_web/stats_process.php?club_id=#{id}&team_type=all&min=1&max=100&competition_id=64"
    get_json(sqk)
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
      Supermodel.where(:teamname => @teamname, :matchid => key).first_or_create do |supermodel|
        poss = @passacc[key].fetch('success')
        poss2 = @passacc[key].fetch('unsuccess')
        supermodel.passaccuracy = (poss - poss2)
        supermodel.avgpossession = (@avgpos[key].fetch('total')) * 5
        total = @shotacc[key].fetch('total')
        total2 = @shotacc[key].fetch('offtarget')
        supermodel.shotaccuracy = ((total + 1) / (total2 + 1))*50
        h = @opta[key]
        supermodel.attackscore = h.fetch('attack')
        supermodel.defencescore = h.fetch('defence')
        supermodel.possesionscore = h.fetch('possesion')
        supermodel.optascore = h.fetch('total')
        supermodel.date = h.fetch('date')
      end
    end
  end

end
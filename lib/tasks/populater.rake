namespace :populater do
  desc "Populates arsenal articles"
  task arscom: :environment do
    links = Arscom.new
    links.link_filter
    links.noko_save
  end

  desc "Populates teams"
  task teams: :environment do
    BBC.teams
  end

  desc "squawka"
  task squawka: :environment do

  SQWK = "http://www.squawka.com/wp-content/themes/squawka_web/stats_process.php?club_id=31&team_type=all&min=1&max=100&competition_id=64"

  @parsed = JSON.parse HTTParty.get(SQWK).response.body

  avgpos = @parsed.assoc('avgpossession')[1]
  shotacc = @parsed.assoc('shotaccuracy_ot')[1]
  opta = @parsed.assoc('performance')[1]
  passacc = @parsed.assoc('pass_acc_ot')[1]

  ids = []

  avgpos.each do |k, v|
    ids << k
  end

  ids.each do 
    |key|
      gisele = Supermodel.where(:matchid => key).first_or_create 
      poss = passacc[key].fetch('success')
      poss2 = passacc[key].fetch('unsuccess')
      gisele.passaccuracy = (poss - poss2)  
      gisele.avgpossession = (avgpos[key].fetch('total')) * 5
      total = shotacc[key].fetch('total')
      total2 = shotacc[key].fetch('offtarget')
      gisele.shotaccuracy = (total / total2)*50
      h = opta[key]
      gisele.attackscore = h.fetch('attack')
      gisele.defencescore = h.fetch('defence')
      gisele.possesionscore = h.fetch('possesion')
      gisele.optascore = h.fetch('total')
      gisele.date = h.fetch('date')
      gisele.save
    end
  end


  desc "opta"
  task opta: :environment do
    FourFourTwo.new.opta_text
  end



task :all => ["populater:arscom", "populater:hometeam", "populater:squawka", "populater:opta"]
end


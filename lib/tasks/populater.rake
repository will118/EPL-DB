namespace :populater do

  desc "FourFourTwo Opta Text"
  task optatext: :environment do
    Fixture.order(:kickoff).first(8).each do |x|
      time_until = (x.kickoff - Time.now)
      (time_until < 86400) 
      four = FourFourTwo.new
      four.match_link
    end
  end

  desc "squawka"
  task squawka: :environment do
    teams_array = YAML::load( File.open( 'teamnames.yml' ) )
    teams_array.each do |team|
      squawk = Squawka.new(team)
      squawk.hasher
      squawk.save
    end
  end

  desc "teamform"
  task teamform: :environment do
      form = JasonTheBuilder.single_form
      form.each do |d|
        form = d["form"].join(', ')
        fo = Form.where(:team => d["team"]).first_or_create
        fo.form = form
        fo.save
      end
  end

  desc "fixture schedule scrape"
  task schedule: :environment do
    teams_array = YAML::load( File.open( 'teamnames.yml' ) )
    teams_array.each do |team|
      sched = Schedule.new(team)
      sched.save
    end
  end

  desc "child labour"
  task fakedata: :environment do
    Poss.delete_all
    Shot.delete_all
    Target.delete_all
    Corner.delete_all
    Foul.delete_all
    matches = YAML::load( File.open( 'matches.yml' ) )
    matches.each do |team1, team2|
      90.times do |x|
        rando = x + ((team1.length)*(team2.length))
        randy = x + 2
        randy2 = randy - (rand(5))
        Poss.where(:homeposs => (rando+2), :awayposs => randy2, :hometeam => team1, :awayteam => team2).create
        Shot.where(:homeshots => rando, :awayshots => randy2, :hometeam => team1, :awayteam => team2).create
        Target.where(:homeshots => (randy+7), :awayshots => randy2, :hometeam => team1, :awayteam => team2).create
        Corner.where(:home => (randy+3), :away => randy2, :hometeam => team1, :awayteam => team2).create
        Foul.where(:home => randy, :away => randy2, :hometeam => team1, :awayteam => team2).create
      end
    end
  end

  desc "Populates arsenal articles"
  task arscom: :environment do
    links = Arscom.new
    links.link_filter
    links.noko_save
  end

  desc "Emergency Wipe for match"
  task wipe: :environment do
    Team.delete_all
    Poss.delete_all
    Shot.delete_all
    Target.delete_all
    Corner.delete_all
    Foul.delete_all
  end



task :all => ["populater:squawka", "populater:teamform", "populater:schedule"]
end


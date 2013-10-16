namespace :populater do
  desc "Populates arsenal articles"
  task arscom: :environment do
    links = Arscom.new
    links.link_filter
    links.noko_save
  end

  desc "Populates teams"
  task teams: :environment do
    beeb = BBC.new("Arsenal")
    beeb.raw_link
    beeb.teams
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

  desc "opta text"
  task optatext: :environment do
    four = FourFourTwo.new
    four.text
    four.save
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
    matches = YAML::load( File.open( 'matches.yml' ) )
    matches.each do |team1, team2|
      90.times do |x|
        randy = (x*rand(20))
        xrandy = (x*randy)
        Poss.where(:homeposs => xrandy, :awayposs => (rand(15)), :hometeam => team1, :awayteam => team2).create
        # Shot.where(:homeshots => xrandy, :awayshots => (xrandy-5), :hometeam => team1, :awayteam => team2).create
        # Target.where(:homeshots => randy, :awayshots => (randy-(rand(10))), :hometeam => team1, :awayteam => team2).create
        # Corner.where(:home => xrandy, :away => randy, :hometeam => team1, :awayteam => team2).create
        # Foul.where(:home => xrandy, :away => randy, :hometeam => team1, :awayteam => team2).create
      end
    end
  end




task :all => ["populater:arscom", "populater:teams", "populater:squawka", "populater:optatext", "populater:teamform"]
end


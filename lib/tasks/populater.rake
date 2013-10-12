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
    teams_array = YAML::load( File.open( 'teamnames.yml' ) )
    teams_array.each do |team|
      squawk = Squawka.new(team)
      squawk.hasher
      squawk.save
    end
  end


  desc "opta text"
  task optatext: :environment do
    four = FourFourTwo.new
    four.text
    four.save
  end


task :all => ["populater:arscom", "populater:teams", "populater:squawka", "populater:optatext"]
end


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
    squawk = Squawka.new
    squawk.hasher
    squawk.save
  end


  desc "opta text"
  task optatext: :environment do
    FourFourTwo.new.text
  end


task :all => ["populater:arscom", "populater:teams", "populater:squawka", "populater:optatext"]
end


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
        Form.where(:team => d["team"], :form => form).first_or_create
      end
  end

  desc "opta text"
  task optatext: :environment do
    four = FourFourTwo.new
    four.text
    four.save
  end


task :all => ["populater:arscom", "populater:teams", "populater:squawka", "populater:optatext", "populater:teamform"]
end


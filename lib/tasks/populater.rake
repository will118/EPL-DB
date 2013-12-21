namespace :populater do

    desc "FourFourTwo Opta Text"
    task optatext: :environment do
      Fixture.order(:kickoff).first(8).each do |x|
        time_until = (x.kickoff - Time.now.utc)
        if (time_until < 86400)
          four = FourFourTwo.new
          four.save
        else
          puts "24 hours remaining at least"
        end
      end
    end

    desc "squawka"
    task squawka: :environment do
      teams_array = YAML::load(File.open('teamnames.yml'))
      teams_array.each do |team|
        squawk = Squawka.new(team)
        squawk.hasher
        squawk.save
      end
    end

    desc "teamform"
    task teamform: :environment do
      Form.single_form.each do |d|
        form = Form.where(:team => d["team"]).first_or_create
        form.form = d["form"].join(' ')
        form.save
      end
    end

    desc "Fixture schedule scrape"
    task schedule: :environment do
      teams_array = YAML::load( File.open( 'teamnames.yml' ) )
      teams_array.each do |team|
        sched = Schedule.new(team)
        sched.save
      end
    end

#     desc "Emergency wipe for match"
#     task wipe: :environment do
#       Team.delete_all
#       Poss.delete_all
#       Shot.delete_all
#       Target.delete_all
#       Corner.delete_all
#       Foul.delete_all
#     end

    task :all => ["populater:squawka", "populater:teamform", "populater:schedule"]
  end

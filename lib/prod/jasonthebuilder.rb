class JasonTheBuilder

	def initialize
		@home = []
		@away = []
	end


	def form

		from_date = Time.new.strftime("%Y-%m-%d")
		to_date = "2013-11-22"

		fixtures = "http://api.statsfc.com/premier-league/fixtures.json?key=#{ENV["STATS_KEY"]}&team=arsenal&from=#{from_date}&to=#{to_date}&timezone=Europe/London&limit=5"

		teamform = "http://api.statsfc.com/premier-league/form.json?key=#{ENV["STATS_KEY"]}&team=arsenal"

	  
	  @form0 = JSON.parse HTTParty.get(fixtures).response.body
	  @form = JSON.parse HTTParty.get(teamform).response.body

	  away = @form0.first.fetch('homepath')
	  awayname = @form0.first.fetch('homeshort')

	    form = []

    @form.each do |x| 
       if x.has_value?('arsenal')
        h = {team: 'Arsenal', form: ''}
         h[:form] = x.fetch('form')
         form << h 
      elsif x.has_value?(away)
        h2 = {team: awayname, form: ''}
        h2[:form] = x.fetch('form')
        form << h2
      end
     end
			return form
		end

		def possession_json
			@away = Poss.all.map(&:awayposs)
			@home = Poss.all.map(&:homeposs)
			live_array_builder("Home Possession", "Away Possession")
		end

		def targets_json
			@away = Target.all.map(&:awayshots)
			@home = Target.all.map(&:homeshots)
			live_array_builder("Home Shots on Target", "Away Shots on Target")
		end

		def corners_json
			@away = Corner.all.map(&:away)
			@home = Corner.all.map(&:home)
			live_array_builder("Home Corners", "Away Corners")
		end

		def shots_json
			@away = Shot.all.map(&:awayshots)
			@home = Shot.all.map(&:homeshots)
			live_array_builder("Home Shots", "Away Shots")
		end

		def fouls_json
			@away = Foul.all.map(&:away)
			@home = Foul.all.map(&:home)
			live_array_builder("Home Fouls", "Away Fouls")
		end

		def live_array_builder(home, away)

			away_array = @away
			home_array = @home
			x_range = home_array.length
			x_axis_array = * 1..x_range
				
			array1 = x_axis_array.zip home_array
			array2 = x_axis_array.zip away_array		
			
			@home = array1.map do |x, y|
			  { "x"=> x, "y"=> y }
			end
			@away = array2.map do |x, y|
			  { "x"=> x, "y"=> y }
			end


			return hash_composer(home, away)
			
		end


		def hash_composer(home, away)

			jj = Hash.new {|k,v| k[v]}
			jj2 = Hash.new {|k,v| k[v]}

			jj["key"] = home
			jj["values"] = @home

			jj2["key"] = away
			jj2["values"] = @away

			final = []

			final << jj
			final << jj2

			return final

		end



	def jason

		# This code ain't great but it kind of just has to do one specific task 
		# that is nice to have in a controller rather than rake.
		#
		# I don't really envisage it ever being helpful to change it now.

		mixarray1 = Supermodel.all.map(&:avgpossession)
		mixarray2 = Supermodel.all.map(&:shotaccuracy)
		mixarray3 = Supermodel.all.map(&:passaccuracy)
		mixarray4 = Supermodel.all.map(&:attackscore)
		mixarray5 = Supermodel.all.map(&:defencescore)
		mixarray6 = Supermodel.all.map(&:possesionscore)
		mixarray7 = Supermodel.all.map(&:optascore)
		
		length_of_models = mixarray7.length

		matchnumber = * 1..length_of_models


		barray1 = matchnumber.zip mixarray1
		barray2 = matchnumber.zip mixarray2
		barray3 = matchnumber.zip mixarray3
		barray4 = matchnumber.zip mixarray4
		barray5 = matchnumber.zip mixarray5
		barray6 = matchnumber.zip mixarray6
		barray7 = matchnumber.zip mixarray7

		newarray1 = barray1.map do |x, y|
		  { "x"=> x, "y"=> y }
		end
		newarray2 = barray2.map do |x, y|
		  { "x"=> x, "y"=> y }
		end
		newarray3 = barray3.map do |x, y|
		  { "x"=> x, "y"=> y }
		end
		newarray4 = barray4.map do |x, y|
		  { "x"=> x, "y"=> y }
		end
		newarray5 = barray5.map do |x, y|
		  { "x"=> x, "y"=> y }
		end
		newarray6 = barray6.map do |x, y|
		  { "x"=> x, "y"=> y }
		end
		newarray7 = barray7.map do |x, y|
		  { "x"=> x, "y"=> y }
		end

		jj = Hash.new {|k,v| k[v]}
		jj2 = Hash.new {|k,v| k[v]}
		jj3 = Hash.new {|k,v| k[v]}
		jj4 = Hash.new {|k,v| k[v]}
		jj5 = Hash.new {|k,v| k[v]}
		jj6 = Hash.new {|k,v| k[v]}
		jj7 = Hash.new {|k,v| k[v]}

		jj["key"] = "Average Possesion"
		jj["values"] = newarray1

		jj2["key"] = "Shot Accuracy"
		jj2["values"] = newarray2

		jj3["key"] = "Pass Accuracy"
		jj3["values"] = newarray3

		jj4["key"] = "Attack Score"
		jj4["values"] = newarray4

		jj5["key"] = "Defence Score"
		jj5["values"] = newarray5

		jj6["key"] = "Possession Score"
		jj6["values"] = newarray6

		jj7["key"] = "Opta Score"
		jj7["values"] = newarray7


		final = []

		final << jj
		final << jj2
		final << jj3
		final << jj4
		final << jj5
		final << jj6
		final << jj7


		return final

	end

end

require 'json'
require 'httparty'
require 'JsonPath'

class JasonTheBuilder

SQWK = "http://www.squawka.com/wp-content/themes/squawka_web/stats_process.php?club_id=31&team_type=all&min=1&max=100&competition_id=64"

	def jason

	@parsed = JSON.parse HTTParty.get(SQWK).response.body


		path = JsonPath.new('$..performance')
		avgposs = JsonPath.new('$..avgpossession')
		opta = path.on(@parsed)

		mixarray1 = []
		mixarray2 = []
		mixarray3 = []
		mixarray4 = []

		avgposs.on(@parsed).each do |x|
		  x.each {|k, h| mixarray4 << h.fetch('total') }
		end

		opta.each do |x|
		  x.each {|k, h| 
		   mixarray1 << h.fetch('possesion')
		   mixarray2 << h.fetch('attack')
		   mixarray3 << h.fetch('defence')
		       }
		 end

		matchnumber = (1..6).to_a


		barray = matchnumber.zip mixarray1
		barray2 = matchnumber.zip mixarray2
		barray3 = matchnumber.zip mixarray3
		barray4 = matchnumber.zip mixarray4

		newarray = barray.map do |x, y|
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

		jj = Hash.new {|k,v| k[v]}
		jj2 = Hash.new {|k,v| k[v]}
		jj3 = Hash.new {|k,v| k[v]}
		jj4 = Hash.new {|k,v| k[v]}

		jj["key"] = "Possesion Score"
		jj["values"] = newarray

		jj2["key"] = "Attack Score"
		jj2["values"] = newarray2

		jj3["key"] = "Defence Score"
		jj3["values"] = newarray3

		jj4["key"] = "Possesion %"
		jj4["values"] = newarray4


		final = []

		final << jj
		final << jj2
		final << jj3
		final << jj4


		return final

	end

	def form
	fixtures= "http://api.statsfc.com/#{COMP}/fixtures.json?key=#{API_KEY}&team=#{TEAM}&from=#{FROM_DATE}&to=#{TO_DATE}&timezone=#{TIMEZONE}&limit=#{LIMIT}"

	teamform = "http://api.statsfc.com/#{COMP}/form.json?key=#{API_KEY}&team=#{TEAM}"

  
  @form0 = JSON.parse HTTParty.get(fixtures).response.body
  @form = JSON.parse HTTParty.get(teamform).response.body


  away = @form0.first.fetch('homepath')
  awayname = @form0.first.fetch('homeshort')

 
  @form.each { |x| 
    if x.has_value?('arsenal')
      puts 'Arsenal'
      p x.fetch('form') 
    elsif x.has_value?(away)
      puts awayname
      p x.fetch('form') end
    }	
	end
end
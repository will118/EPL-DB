require 'json'
require 'HTTParty'
require 'JsonPath'
require "pp"



SQWK = "http://www.squawka.com/wp-content/themes/squawka_web/stats_process.php?club_id=31&team_type=all&min=1&max=100&competition_id=64"

  @parsed = JSON.parse HTTParty.get(SQWK).response.body


performance = JsonPath.new('$..performance')
avgposs = JsonPath.new('@avgpossession')
  
parsed = performance.on(@parsed)
# pp parsed2
a = []
b = []
c = []


# pp @parsed

p @parsed.fetch('performance')
puts "============"
p @parsed.fetch('avgpossession')
puts "============"
p @parsed.fetch('pass_acc_ot')
puts "============"
p @parsed.fetch('shotaccuracy_ot')
puts "============"


# @parsed.each do |x|
# puts x.fetch('performance')
# end
	 
	# gisele = Supermodel.new
	# x.each do |k, v| 
	# 	puts k 
	# 	puts v 
	# 	puts

	# end
	



# avgposs.on(@parsed).each do |x|
#   x.each {|k, h| puts h.fetch('total') }
# end
# matchunion = ["2199", "2207", "2221", "2232", "1337", "2237", "2253"]


parsed.each do |x| 
	x.each do |k, h| 
		# puts k
		# puts "--------------"
		# puts h
		# puts


	end 

end

      # gisele.date = 
      # gisele.matchid = 
      # gisele.teamname = 
      # gisele.avgpossession = 
      # gisele.shotaccuracy = 
      # gisele.passaccuracy =
      # gisele.attackscore =
      # gisele.defencescore = 
      # gisele.possesionscore = 
      # gisele.optascore =



	puts "<=========>"	
# p matchids | matchunion

# ppp.each do |x|
#   x.each {|k, h| 
#    a << h.fetch('possesion')
#    b << h.fetch('attack')
#    c << h.fetch('defence')
#        }
#  end
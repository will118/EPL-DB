require 'json'
require 'HTTParty'
require "pp"



SQWK = "http://www.squawka.com/wp-content/themes/squawka_web/stats_process.php?club_id=31&team_type=all&min=1&max=100&competition_id=64"

  @parsed = JSON.parse HTTParty.get(SQWK).response.body

avgpos = @parsed.assoc('avgpossession')[1]
shotacc = @parsed.assoc('shotaccuracy_ot')[1]
opta = @parsed.assoc('performance')[1]

ids = []

avgpos.each do |k, v|
	ids << k
end

ids.each do 
	|key| 
		gisele.matchid = key
		gisele.avgpossession = avgpos[key].fetch('total')
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
# end

# @parsed.each do |x| 
	# p x
# 	# gisele = Supermodel.new
# 	# 	x.each do |k, h|
# 	# 		puts "k = #{k}"
# 	# 		puts "h = #{h}"
# 	# 		# gisele.matchid = k 
# 	# 	 #  gisele.save

# 	# end 
# end

# shotaccuracy.each do |sa| 

      # gisele2.shotaccuracy = 

      # gisele.avgpossession = 
      # gisele.passaccuracy =

	puts "<=========>"	
# p matchids | matchunion

# ppp.each do |x|
#   x.each {|k, h| 
#    a << h.fetch('possesion')
#    b << h.fetch('attack')
#    c << h.fetch('defence')
#        }
#  end
# performance = @parsed.fetch('performance')
# # puts "============"
# avgpossession = @parsed.fetch('avgpossession')
# # puts "============"
# passaccuracy = @parsed.fetch('pass_acc_ot')
# # puts "============"
# shotaccuracy = @parsed.fetch('shotaccuracy_ot')
# # puts "============"
# # p shotaccuracy
# p @parsed.assoc('performance')
# ids.length.times do |x|
# 	 [x] 
# end

# ids.each do |key| 
# 	puts key
# 	puts avgpos[key].fetch('total')
# 	total = shotacc[key].fetch('total')
# 	total2 = shotacc[key].fetch('offtarget')
# 	accuracy = (total / total2)*50
# 	p "accuracy #{accuracy}"
# 	h = opta[key]
#   puts h.fetch('attack')
#   puts h.fetch('defence')
#   puts h.fetch('possesion')
#   puts h.fetch('total')
#   puts h.fetch('date')
#   puts "----------------------------"
	
# end
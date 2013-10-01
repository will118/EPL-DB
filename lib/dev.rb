
#   # require 'nokogiri'  
#   # require 'open-uri'

#   #   BB2= "http://polling.bbc.co.uk/sport/shared/football/oppm/line-up/3643937"
    
#   #   document = Nokogiri::HTML(open(BB2))
      
#   #    ht = document.xpath('//li').map do |player|
#   #       p = player.inner_text.strip.split(' ')
#   #       {name: p[1], number: p[0].to_i, subbed: p[2..4].join}
#   #       end

#   #   hometeam = ht[0..10]

#   #   hometeam.each do |xx|
#   #   y1 = xx[:number] 
#   #   y2 = xx[:name] 
#   #   y0 = xx[:subbed].delete('(') 
#   #   puts "#{y2}(#{y1})"  
#   #   end   


#         # pass.each do |stat|
#         #   p = stat
#         #   puts "Date #{p[0]}"
#         #   puts "Total passes #{p[1]}"
#         #   puts "Accuracy #{p[2]}"
#         #   puts "-----------"
#         # end
        
#         # cards.each do |stat|
#         #   p = stat
#         #   puts "Date #{p[0]}"
#         #   puts "Yellow #{p[1]}"
#         #   puts "Red #{p[2]}"
#         #   puts "-----------"
#         # end
#     # awayteam.each do |xx|
#     # awayxi = AwayXi.new
#     # y1 = xx[:number] 
#     # y2 = xx[:name] 
#     # awayxi.name = "#{y2} (#{y1})" 
#     # awayxi.subbed = xx[:subbed].delete('(')
#     # awayxi.save 
#     # end   
#   # end


require "HTTParty"
require "pp"
require "JSON"
require "jsonpath"

# uu = "http://www.squawka.com/wp-content/themes/squawka_web/stats_process.php?club_id=31&team_type=all&min=1&max=100&competition_id=64"

# parsed = JSON.parse HTTParty.get(uu).response.body

# ontarget = JsonPath.new('$..ontarget')
# offtarget = JsonPath.new('$..offtarget')
# date = JsonPath.new('$..date')

# onar = ontarget.on(parsed)
# offar = offtarget.on(parsed)
# accuracy = onar.zip offar 
# # p offar
# # p date
# # p date.zip accuracy 

# puts
# # parsed["shotaccuracyzone"].each do |accu|
# #   p accu
# # end
# # parsed["shotaccuracy_ot"].each do |accu|
# #   p accu
# # end

# # parsed["keypasses_ot"].each do |accu|
# #   kp = accu[1]
# #   pass = Passing.new
# #   pass.assists = kp["assist"]
# #   pass.keypasses kp["keypass"]
# #   pass.totalpasses kp["total"]
# #   pass.date kp["date"]
# #   pass.save
# # end


# # keypasses

# # shotaccuracy
# # shotaccuracy_ot

# # keypasses_ot

# require "json"

# array = [1,2,3,4,5,6,7,8,9,10]

# mixarray = [1,2,3,4,5,6,7,8,9,10]
# mixarray2 = [2,4,6,7,8,9,7,10,11,14]
# mixarray3 = [6,4,6,7,18,9,17,10,14,5]

# barray = array.zip mixarray
# barray2 = array.zip mixarray2
# barray3 = array.zip mixarray3

# newarray = barray.map do |x, y|
#   { "x"=> x, "y"=> y }
# end
# newarray2 = barray2.map do |x, y|
#   { "x"=> x, "y"=> y }
# end
# newarray3 = barray3.map do |x, y|
#   { "x"=> x, "y"=> y }
# end

# jj = Hash.new {|k,v| k[v]}
# jj2 = Hash.new {|k,v| k[v]}
# jj3 = Hash.new {|k,v| k[v]}

# jj["key"] = "Accuracy"
# jj["values"] = newarray

# jj2["key"] = "Possession"
# jj2["values"] = newarray2

# jj3["key"] = "Duels Won"
# jj3["values"] = newarray3



# # puts "--------Final Hash---------"


# final = []

# final << jj
# final << jj2
# final << jj3

# print final


# puts
# puts "================"

SQWK = "http://www.squawka.com/wp-content/themes/squawka_web/stats_process.php?club_id=31&team_type=all&min=1&max=100&competition_id=64"

  @parsed = JSON.parse HTTParty.get(SQWK).response.body


path = JsonPath.new('$..performance')
avgposs = JsonPath.new('$..avgpossession')
  
ppp = path.on(@parsed)
# pp ppp2
a = []
b = []
c = []

avgposs.on(@parsed).each do |x|
  x.each {|k, h| puts h.fetch('total') }
end

ppp.each do |x|
  x.each {|k, h| 
   a << h.fetch('possesion')
   b << h.fetch('attack')
   c << h.fetch('defence')
       }
 end

# p a

puts "=========="
# pp path2.on(ppp)
 


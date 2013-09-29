
  # require 'nokogiri'  
  # require 'open-uri'

  #   BB2= "http://polling.bbc.co.uk/sport/shared/football/oppm/line-up/3643937"
    
  #   document = Nokogiri::HTML(open(BB2))
      
  #    ht = document.xpath('//li').map do |player|
  #       p = player.inner_text.strip.split(' ')
  #       {name: p[1], number: p[0].to_i, subbed: p[2..4].join}
  #       end

  #   hometeam = ht[0..10]

  #   hometeam.each do |xx|
  #   y1 = xx[:number] 
  #   y2 = xx[:name] 
  #   y0 = xx[:subbed].delete('(') 
  #   puts "#{y2}(#{y1})"  
  #   end   


        # pass.each do |stat|
        #   p = stat
        #   puts "Date #{p[0]}"
        #   puts "Total passes #{p[1]}"
        #   puts "Accuracy #{p[2]}"
        #   puts "-----------"
        # end
        
        # cards.each do |stat|
        #   p = stat
        #   puts "Date #{p[0]}"
        #   puts "Yellow #{p[1]}"
        #   puts "Red #{p[2]}"
        #   puts "-----------"
        # end
    # awayteam.each do |xx|
    # awayxi = AwayXi.new
    # y1 = xx[:number] 
    # y2 = xx[:name] 
    # awayxi.name = "#{y2} (#{y1})" 
    # awayxi.subbed = xx[:subbed].delete('(')
    # awayxi.save 
    # end   
  # end


# require "HTTParty"
# require "pp"
# require "JSON"

# uu = "http://www.squawka.com/wp-content/themes/squawka_web/stats_process.php?club_id=31&team_type=all&min=1&max=10&competition_id=64"

# parsed = JSON.parse HTTParty.get(uu).response.body

# pp parsed

# parsed["shotaccuracyzone"].each do |accu|
#   p accu
# end
# parsed["shotaccuracy_ot"].each do |accu|
#   p accu
# end

# parsed["keypasses_ot"].each do |accu|
#   kp = accu[1]
#   pass = Passing.new
#   pass.assists = kp["assist"]
#   pass.keypasses kp["keypass"]
#   pass.totalpasses kp["total"]
#   pass.date kp["date"]
#   pass.save
# end


# keypasses

# shotaccuracy
# shotaccuracy_ot

# keypasses_ot

require "json"

array = [1,2,3,4,5,6,7,8,9,10]

mixarray = [1,2,3,4,5,6,7,8,9,10]
mixarray2 = [2,4,6,7,8,9,7,10,11,14]
mixarray3 = [6,4,6,7,18,9,17,10,14,5]

barray = array.zip mixarray
barray2 = array.zip mixarray2
barray3 = array.zip mixarray3

newarray = barray.map do |x, y|
  { "x"=> x, "y"=> y }
end
newarray2 = barray2.map do |x, y|
  { "x"=> x, "y"=> y }
end
newarray3 = barray3.map do |x, y|
  { "x"=> x, "y"=> y }
end

jj = Hash.new {|k,v| k[v]}
jj2 = Hash.new {|k,v| k[v]}
jj3 = Hash.new {|k,v| k[v]}

jj["key"] = "Accuracy"
jj["values"] = newarray

jj2["key"] = "Possession"
jj2["values"] = newarray2

jj3["key"] = "Duels Won"
jj3["values"] = newarray3



puts "--------Final Hash---------"


final = []
final2 = []
final3 = []

final << jj
final << jj2
final << jj3

print final


puts
puts "================"








[
  {
    "key"=>"Accuracy","values"=>[{"x"=>1, "y"=>1}, {"x"=>2, "y"=>2}, {"x"=>3, "y"=>3}, {"x"=>4, "y"=>4}, {"x"=>5, "y"=>5}, 
{"x"=>6, "y"=>6}, {"x"=>7, "y"=>7}, {"x"=>8, "y"=>8}, {"x"=>9, "y"=>9}, {"x"=>10, "y"=>10}]

    },

{"key"=>"Possession","values"=>[{"x"=>1, "y"=>1}, {"x"=>2, "y"=>2}, {"x"=>3, "y"=>3}, {"x"=>4, "y"=>4}, {"x"=>5, "y"=>5}, 
{"x"=>6, "y"=>6}, {"x"=>7, "y"=>7}, {"x"=>8, "y"=>8}, {"x"=>9, "y"=>9}, {"x"=>10, "y"=>10}]},

{"key"=>"Duels Won","values"=>[{"x"=>1, "y"=>1}, {"x"=>2, "y"=>2}, {"x"=>3, "y"=>3}, {"x"=>4, "y"=>4}, {"x"=>5, "y"=>5},
{"x"=>6, "y"=>6}, {"x"=>7, "y"=>7}, {"x"=>8, "y"=>8}, {"x"=>9, "y"=>9}, {"x"=>10, "y"=>10}]}

  ]

























  require 'nokogiri'  
  require 'open-uri' 
  require 'mechanize' 
  require 'httparty'
  require "pp"
  require "json"

API_KEY= "iBmMBLP17gwhhpqtgZlM9Cf3MGIhijoQJ7Z9t0AT"

COMP= "premier-league"
COMPTYPE= "league"
YEAR= "2013"
TIMEZONE= "UTC"
TEAM= "arsenal"
# FROM_DATE= "2013-09-22"
TO_DATE= "2013-10-22"
LIMIT= "5"
time = Time.new
FROM_DATE= time.strftime("%Y-%m-%d")

FROM_DATE_PAST= "2013-06-10"
TO_DATE_PRESENT= FROM_DATE

# APIGET= "http://api.statsfc.com/#{COMP}/teams.json?key=#{API_KEY}"
# APIGET= "http://api.statsfc.com/competitions.json?key=#{API_KEY}&type=#{COMPTYPE}"


# APIGET= "http://api.statsfc.com/#{COMP}/table.json?key=#{API_KEY}"


# APIGET= "http://api.statsfc.com/top-scorers.json?key=#{API_KEY}&competition=#{COMP}&team=#{TEAM}&year=#{YEAR}"


#FIXTURES - this works.
APIGET= "http://api.statsfc.com/#{COMP}/fixtures.json?key=#{API_KEY}&team=#{TEAM}&from=#{FROM_DATE}&to=#{TO_DATE}&timezone=#{TIMEZONE}&limit=#{LIMIT}"


# APIGET3= "http://api.statsfc.com/premier-league/form.json?key=#{API_KEY}&year=#{YEAR}"
# APIGET4= "http://api.statsfc.com/top-scorers.json?key=#{API_KEY}&competition=#{COMP}&team=#{TEAM}&year=#{YEAR}"
# APIGET2= "http://api.statsfc.com/#{COMP}/results.json?key=#{API_KEY}&year=#{YEAR}&team=#{TEAM}&from=#{FROM_DATE_PAST}&to=#{TO_DATE}&timezone=#{TIMEZONE}&limit=#{LIMIT}"
# p JSON.parse HTTParty.get("#{APIGET}").response.body
BBCGET= "http://polling.bbc.co.uk/sport/shared/football/oppm/json/3643937"
# p JSON.parse HTTParty.get(BBCGET).response.body.delete('(').delete(');')
# p HTTParty.get(BB2).response.body

# BB2= "http://polling.bbc.co.uk/sport/shared/football/oppm/line-up/3643937"

# class PlayerScraper
#   def initialize uri
#     @document = Nokogiri::HTML(open(uri))
#   end

#   def players
#     @document.xpath('//li').map do |player|
#       p = player.inner_text.strip.split(' ')
#       {name: p[1], number: p[0].to_i, subbed: p[2..4].join}

#   end
#   end
# end

# hometeam = PlayerScraper.new(BB2).players[0..10]

# hometeam.each do |xx|
# puts xx[:number] 
# puts xx[:name] 
# puts xx[:subbed].delete('(') 
# puts

#   end


    BB2= "http://polling.bbc.co.uk/sport/shared/football/oppm/line-up/3643937"
    
    @document = Nokogiri::HTML(open(BB2))
      

     ht = @document.xpath('//li').map do |player|
        p = player.inner_text.strip.split(' ')
        {name: p[1], number: p[0].to_i, subbed: p[2..4].join}
        end

    hometeam = ht[0..10]

pp hometeam
    # hometeam.each do |xx|
    # homexi = HomeXi.new
    # homexi.number = xx[:number] 
    # homexi.name = xx[:name] 
    # homexi.subbed = xx[:subbed].delete('(') 
    # end   

 
# pp "Home" 
# pp ppp[0..10]

# pp "Home Bench"
# pp ppp[11..17]

# pp "Away" 
# pp ppp[18..28]
# pp "Away Bench"
# pp ppp[29..35]



  #   # ap nokogiri
    

  #   puts nokogiri.xpath('/html/body/div[4]/div[1]/div[2]/div/div[2]/div/div/div/div[1]/div')

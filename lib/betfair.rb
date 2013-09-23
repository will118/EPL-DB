  require 'nokogiri'  
  require 'open-uri' 
  require 'httparty'
  require "pp"
  require "json"

API_KEY= "iBmMBLP17gwhhpqtgZlM9Cf3MGIhijoQJ7Z9t0AT"

COMP= "premier-league"
COMPTYPE= "league"
YEAR= "2013"
TIMEZONE= "UTC"
TEAM= "arsenal"
FROM_DATE= "2013-09-22"
TO_DATE= "2013-10-22"
LIMIT= "5"
# APIGET= "http://api.statsfc.com/competitions.json?key=#{API_KEY}&type=#{COMPTYPE}"

# APIGET= "http://api.statsfc.com/premier-league/table.json?key=#{API_KEY}&year=#{YEAR}"

# APIGET= "http://api.statsfc.com/top-scorers.json?key=#{API_KEY}&competition=#{COMP}&team=#{TEAM}&year=#{YEAR}"

#FIXTURES - this works.
APIGET= "http://api.statsfc.com/#{COMP}/fixtures.json?key=#{API_KEY}&team=#{TEAM}&from=#{FROM_DATE}&to=#{TO_DATE}&timezone=#{TIMEZONE}&limit=#{LIMIT}"

pp JSON.parse HTTParty.get("#{APIGET}").response.body


# response.code 
# response.message 
# response.headers.inspect




























  
  # uri = "http://www.betfair.com/exchange/football/"
 

 
  #   nokogiri = Nokogiri::HTML(open("#{uri}event?id=27068179")) 
  #   poko = nokogiri.css('match-score')
  #   # ap nokogiri
  #   p poko

  #   puts nokogiri.xpath('/html/body/div[4]/div[1]/div[2]/div/div[2]/div/div/div/div[1]/div')

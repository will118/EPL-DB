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
TO_DATE= "2013-11-22"
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

STFCFORM = "http://api.statsfc.com/#{COMP}/form.json?key=#{API_KEY}&team=#{TEAM}"


    from_date = Time.new.strftime("%Y-%m-%d")
    to_date = "2013-11-22"

    fixtures = "http://api.statsfc.com/premier-league/fixtures.json?key=#{API_KEY}&team=arsenal&from=#{from_date}&to=#{to_date}&timezone=Europe/London&limit=5"

    teamform = "http://api.statsfc.com/premier-league/form.json?key=#{API_KEY}&team=arsenal"

    
    @form0 = JSON.parse HTTParty.get(fixtures).response.body
    @form = JSON.parse HTTParty.get(teamform).response.body


    away = @form0.first.fetch('homepath')
    awayname = @form0.first.fetch('homeshort')

    form = []

    @form.each { |x| 
       if x.has_value?('arsenal')
        h = {team: 'Arsenal', form: ''}
         h[:form] = x.fetch('form')
         form << h 
      elsif x.has_value?(away)
        h2 = {team: awayname, form: ''}
        h2[:form] = x.fetch('form')
        form << h2
      end
      } 


      p form






  
#   @form0 = JSON.parse HTTParty.get(APIGET).response.body
#   @form = JSON.parse HTTParty.get(STFCFORM).response.body


#   away = @form0.first.fetch('homepath')
#   awayname = @form0.first.fetch('homeshort')

#  homeform = Hash.new
#  awayform = Hash.new
#   @form.each { |x| 
#     if x.has_value?('arsenal')
#       homeform["team"] = 'Arsenal'
#       homeform["form"] = x.fetch('form') 
#     elsif x.has_value?(away)
#       awayform["team"] = awayname
#       awayform["form"] = x.fetch('form') end
#     }

# p homeform
# p awayform

# APIGET3= "http://api.statsfc.com/premier-league/form.json?key=#{API_KEY}&year=#{YEAR}"
# APIGET4= "http://api.statsfc.com/top-scorers.json?key=#{API_KEY}&competition=#{COMP}&team=#{TEAM}&year=#{YEAR}"
# APIGET2= "http://api.statsfc.com/#{COMP}/results.json?key=#{API_KEY}&year=#{YEAR}&team=#{TEAM}&from=#{FROM_DATE_PAST}&to=#{TO_DATE}&timezone=#{TIMEZONE}&limit=#{LIMIT}"
# p JSON.parse HTTParty.get("#{APIGET}").response.body
# BBCGET= "http://polling.bbc.co.uk/sport/shared/football/oppm/json/3643937"
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


#     BB2= "http://polling.bbc.co.uk/sport/shared/football/oppm/line-up/3643937"
    
#     @document = Nokogiri::HTML(open(BB2))
      

#      ht = @document.xpath('//li').map do |player|
#         p = player.inner_text.strip.split(' ')
#         {name: p[1], number: p[0].to_i, subbed: p[2..4].join}
#         end

#     hometeam = ht[0..10]

# pp hometeam



  # rejection_criteria = ["matchdayshowlive", "report", "lotto", "train-ahead", "Theclockendpodcast", "features", "highlights", "pictures", "photocall"]
  # uri = "http://www.arsenal.com"
 
  # agent = Mechanize.new
  # agent.user_agent_alias = 'Mac Safari'


  # @links = [] 
  # page = agent.get("#{uri}/news/news-archive?category=first")
  # page.parser.xpath('/html/body/div[5]/div/div/article/*/ul/*/*').each do | links | 
  # @links << links.attribute('href')
  # end

  # rejection_criteria.each do |word|
  #   @links -= @links.grep(/#{word}/)
  # end


  # @links.each do | urls | 
  #   nokogiri = Nokogiri::HTML(open("#{uri}#{urls}")) 
  #   nokogiri.css('script').remove 
  #   nokogiri.xpath('/html/body/div[3]/div/article/section[1]/small').remove 
  #   article = Article.new 
  #   article.title = nokogiri.css("h1")[0].text
  #   article.body = nokogiri.xpath('/html/body/div[3]/div/article/section[1]').inner_text
  #   src = (nokogiri.at_xpath '//img/@src').to_s
  #   article.url = src.chars.first == "/" ? "http://www.arsenal.com" + src : src
  #   article.save
  #   end





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

namespace :populater do
  desc "Populates the db"
  task arscom: :environment do
  
  require 'nokogiri'  
  require 'mechanize'  
  require 'open-uri' 

  rejection_criteria = ["matchdayshowlive", "report", "lotto", "train-ahead", "Theclockendpodcast", "features", "highlights", "pictures", "photocall"]
  uri = "http://www.arsenal.com"
 
  agent = Mechanize.new
  agent.user_agent_alias = 'Mac Safari'


  @links = [] 
  page = agent.get("#{uri}/news/news-archive?category=first")
  page.parser.xpath('/html/body/div[5]/div/div/article/*/ul/*/*').each do | links | 
  @links << links.attribute('href')
  end

  rejection_criteria.each do |word|
    @links -= @links.grep(/#{word}/)
  end


  @links.each do | urls | 
    nokogiri = Nokogiri::HTML(open("#{uri}#{urls}")) 
    nokogiri.css('script').remove 
    nokogiri.xpath('/html/body/div[3]/div/article/section[1]/small').remove 
    article = Article.new 
    article.title = nokogiri.css("h1")[0].text
    article.body = nokogiri.xpath('/html/body/div[3]/div/article/section[1]').inner_text
    src = (nokogiri.at_xpath '//img/@src').to_s
    article.url = src.chars.first == "/" ? "http://www.arsenal.com" + src : src
    article.save
    end
  end



  desc "Populates teams"
  task hometeam: :environment do

  require 'nokogiri'  
  require 'open-uri'

    BB2= "http://polling.bbc.co.uk/sport/shared/football/oppm/line-up/3643937"
    
    document = Nokogiri::HTML(open(BB2))
      
        allplayers = document.xpath('//li').map do |player|
          p = player.inner_text.strip.split(' ')
          {name: p[1], number: p[0].to_i, subbed: p[2..4].join}
        end

    hometeam = allplayers[0..10]
    awayteam = allplayers[18..28]


    hometeam.each do |xx|
    homexi = HomeXi.new
    y1 = xx[:number] 
    y2 = xx[:name] 
    homexi.name = "#{y2} (#{y1})" 
    homexi.subbed = xx[:subbed].delete('(')
    homexi.save 
    end

    awayteam.each do |xx|
    awayxi = AwayXi.new
    y1 = xx[:number] 
    y2 = xx[:name] 
    awayxi.name = "#{y2} (#{y1})" 
    awayxi.subbed = xx[:subbed].delete('(')
    awayxi.save 
    end   
  end

  desc "squawka"
  task squawka: :environment do

  sqwkurl = "http://www.squawka.com/wp-content/themes/squawka_web/stats_process.php?club_id=31&team_type=all&min=1&max=10&competition_id=64"

  parsed = JSON.parse HTTParty.get(sqwkurl).response.body
      
    parsed["avgpossession"].each do |posses|
      data = posses[1]
      possession = Possession.new
      possession.date = data["date"]
      possession.possession = data["total"]
      possession.save
    end

    parsed["keypasses_ot"].each do |accu|
      kp = accu[1]
      pass = Passing.new
      pass.assists = kp["assist"]
      pass.keypasses = kp["keypass"]
      pass.totalpasses = kp["total"]
      pass.date = kp["date"]
      pass.save
    end
  end


 #  desc "Wipes the db"
 #  task wipe: :environment do
 #  	config = ActiveRecord::Base.configurations[::Rails.env]
	#   connection = ActiveRecord::Base.connection
	#   connection.disable_referential_integrity do
 #    connection.tables.each do |table_name|
 #      next if connection.select_value("SELECT count(*) FROM #{table_name}") == 0
 #        connection.execute("TRUNCATE #{table_name}")
	#     end
	#   end
	# end
end

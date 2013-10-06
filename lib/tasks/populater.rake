namespace :populater do
  desc "Populates the db"
  task arscom: :environment do

  rejection_criteria = ["matchdayshowlive", "report", "pressconference", "international-watch", "lotto", "train-ahead", "Theclockendpodcast", "features", "highlights", "pictures", "photocall", "goalofthemonth"]
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
    dirtybody = nokogiri.xpath('/html/body/div[3]/div/article/section[1]').inner_text
    nearlyclean = dirtybody.gsub(/(Flash Player)(.*)(Play again)/m, '') 
    article.body = nearlyclean.gsub(/^\s{5,}/, "\n")
    src = (nokogiri.at_xpath '//img/@src').to_s
    article.url = src.chars.first == "/" ? "http://www.arsenal.com" + src : src
    article.save
    end
  end



  desc "Populates teams"
  task hometeam: :environment do

    BB2= "http://polling.bbc.co.uk/sport/shared/football/oppm/line-up/EFBO726890"
    
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

  SQWK = "http://www.squawka.com/wp-content/themes/squawka_web/stats_process.php?club_id=31&team_type=all&min=1&max=100&competition_id=64"

  @parsed = JSON.parse HTTParty.get(SQWK).response.body

  avgpos = @parsed.assoc('avgpossession')[1]
  shotacc = @parsed.assoc('shotaccuracy_ot')[1]
  opta = @parsed.assoc('performance')[1]
  passacc = @parsed.assoc('pass_acc_ot')[1]

  ids = []

  avgpos.each do |k, v|
    ids << k
  end

  ids.each do 
    |key|
      gisele = Supermodel.new 
      gisele.matchid = key
      poss = passacc[key].fetch('success')
      poss2 = passacc[key].fetch('unsuccess')
      gisele.passaccuracy = (poss - poss2)  
      gisele.avgpossession = (avgpos[key].fetch('total')) * 5
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
  end


  desc "opta"
  task opta: :environment do
    FourFourTwo.new.opta_text
  end


task :all => ["populater:arscom", "populater:hometeam", "populater:squawka", "populater:opta"]
end


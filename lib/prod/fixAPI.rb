class FixThisShit
  def name_switchy(input)
    case input
      when "Norwich" then "Norwich City"
      when "Stoke" then "Stoke City"
      when "Hull" then "Hull City"
      when "Swansea" then "Swansea City"
      when "West Ham" then "West Ham United"
      when "Cardiff" then "Cardiff City"
      when "Tottenham" then "Tottenham Hotspur"
      else
        input
    end
  end

  def link_finder
    driver = Selenium::WebDriver.for(:remote, :url => "http://localhost:9134")
    url = "http://www.whoscored.com/Regions/252/Tournaments/2/Seasons/3853/Stages/7794/Fixtures/England-Premier-League-2013-2014"
    driver.navigate.to(url)
    driver.find_element(:xpath, "//*[@id='date-controller']/a[1]").click
    sleep(5)
    Selenium::WebDriver::Wait.new(:timeout => 20) # seconds
    page = driver.page_source
    doc = Nokogiri::HTML(page)
    doc.css(".result a").map {|link| link['href']}
  end

  def runner
    driver = Selenium::WebDriver.for(:remote, :url => "http://localhost:9134")
    base = "http://www.whoscored.com"
    link_finder.each do |ext|
      puts ext
      uri = base + ext
      driver.navigate.to(uri)
      page = driver.page_source
      doc = Nokogiri::HTML(page)
      ht_els = doc.search "[text()*='Half time']"
      ft_els = doc.search "[text()*='Full time']"
      ht_s = ht_els.first.next_element.inner_text.split(":").map{|x| x.to_i}
      ft_s = ft_els.first.next_element.inner_text.split(":").map{|x| x.to_i}
      home_team = doc.xpath('//*[@id="match-header"]/table/tbody/tr[1]/td[1]/a').first.children.inner_text
      away_team = doc.xpath('//*[@id="match-header"]/table/tbody/tr[1]/td[3]/a').first.children.inner_text
      ko_hour, ko_min = doc.xpath('//*[@id="match-header"]/table/tbody/tr[2]/td[2]/div[3]/dl/dd[1]').children.inner_text.split(":")
      kick_off = DateTime.new(2007,11,1,ko_hour.to_i,ko_min.to_i,0)
      home_team = name_switchy(home_team)
      away_team = name_switchy(away_team)
      api = ApiScore.where(:home => home_team, :away => away_team, :live => false).first_or_create
      api.halftime = ht_s
      api.fulltime = ft_s
      api.date = kick_off
      api.save
    end
  end
end

class BBCRecorder

	def initialize(ar_record)
		@fixture = ar_record
	end

	def teams_and_stats
		recorder
		teams
	end

  def recorder
    x = @fixture
    data = BBCGetter.get_json(x.jsonurl)
    matchdate = x.kickoff

    if data['shotsOnTarget'] == nil
      puts "No data yet"
    else
      puts "Data recorded"
      Poss.where(:homeposs => data['possession']['home'], :hometeam => x.hometeam, :awayposs => data['possession']['away'], :awayteam => x.awayteam, :matchdate => matchdate).create
      Target.where(:homeshots => data['shotsOnTarget']['home'], :hometeam => x.hometeam, :awayshots => data['shotsOnTarget']['away'], :awayteam => x.awayteam, :matchdate => matchdate).create
      Shot.where(:homeshots => data['shots']['home'], :hometeam => x.hometeam, :awayshots => data['shots']['away'], :awayteam => x.awayteam, :matchdate => matchdate).create
      Corner.where(:home => data['corners']['home'], :hometeam => x.hometeam, :away => data['corners']['away'], :awayteam => x.awayteam, :matchdate => matchdate).create
      Foul.where(:home => data['fouls']['home'], :hometeam => x.hometeam, :away => data['fouls']['away'], :awayteam => x.awayteam, :matchdate => matchdate).create
    end
  end

  def teams
    driver = Selenium::WebDriver.for(:remote, :url => "http://localhost:9134")
    driver.navigate.to (@fixture.lineup_url)
    document = Nokogiri::HTML(driver.page_source)
    driver.quit

    teams = document.css('#oppm-team-list')

    hometeam = teams.css('h3.team-name')[0].text
    awayteam = teams.css('h3.team-name')[1].text

    home_xi = teams.css('.player-list>li')[0..10]
    away_xi = teams.css('.player-list>li')[11..21]
    
    home_subs = teams.css('.subs-list>li')[0..6]
    away_subs = teams.css('.subs-list>li')[7..13]
    
    Team.wipe_todays_of(hometeam, awayteam)

    home_xi.each do |player|
      Team.bbc_scraped_name(player, hometeam, true)
    end

    away_xi.each do |player|
      Team.bbc_scraped_name(player, awayteam, true)
    end

    home_subs.each do |player|
      Team.bbc_scraped_name(player, hometeam, false)
    end

    away_subs.each do |player|
      Team.bbc_scraped_name(player, awayteam, false)
    end

    @fixture.got_team!
  end

  def self.scores
    driver = Selenium::WebDriver.for(:remote, :url => "http://localhost:9134")
    base = "http://www.bbc.co.uk/sport/football/live-scores/premier-league"
    driver.navigate.to (base)
    page = Nokogiri::HTML(driver.page_source)
    driver.quit

    table = page.css('#live-scores-table')
    tr = table.css('tr td')

    array = tr.map do |x|
      hometeam = x.css('.team-home').text
      awayteam = x.css('.team-away').text
      score = x.css('.score').text.gsub(/[\\n\s+]/, '')
      {"teams" => (hometeam + " vs. " + awayteam), "score"=> score}
    end

    live_scores = array.delete_if {|x| x['score'].length < 2}

    live_scores.each do |x|
      Score.save_data(x['teams'], x['score'])
    end
  end
  
end
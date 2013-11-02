class TeamFactory

	def initialize(fix)
		@fixture = fix
	end

  def recorder
    x = @fixture
    data = BBCGetter.get_json(x.jsonurl)
    matchdate = x.kickoff

    if data['shotsOnTarget'] == nil
      puts "No data yet"
    else
      Poss.where(:homeposs => data['possession']['home'], :hometeam => x.hometeam, :awayposs => data['possession']['away'], :awayteam => x.awayteam, :matchdate => matchdate).create
      Target.where(:homeshots => data['shotsOnTarget']['home'], :hometeam => x.hometeam, :awayshots => data['shotsOnTarget']['away'], :awayteam => x.awayteam, :matchdate => matchdate).create
      Shot.where(:homeshots => data['shots']['home'], :hometeam => x.hometeam, :awayshots => data['shots']['away'], :awayteam => x.awayteam, :matchdate => matchdate).create
      Corner.where(:home => data['corners']['home'], :hometeam => x.hometeam, :away => data['corners']['away'], :awayteam => x.awayteam, :matchdate => matchdate).create
      Foul.where(:home => data['fouls']['home'], :hometeam => x.hometeam, :away => data['fouls']['away'], :awayteam => x.awayteam, :matchdate => matchdate).create
      puts "Data recorded"

    end
  end

  def teams
    driver = Selenium::WebDriver.for(:remote, :url => "http://localhost:9134")
    driver.navigate.to (@fixture.lineup_url)
    document = Nokogiri::HTML(driver.page_source)
    driver.quit

    teams = document.css('#oppm-team-list')

    if teams.css('h3.team-name')[0].text == nil
      return nil
    else
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
    puts "Got team"
    end
  end
end
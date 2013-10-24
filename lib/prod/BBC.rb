require_relative 'namenormaliser'
require_relative 'builder'

class BBC
  include NameNormaliser
  include ARBuilder

  attr_reader :statsjson

  def match_manager
    Fixture.order(:kickoff).first(8).each do |x|
      match_timer = MatchTime.new(x.kickoff)
      if match_timer.halftime? && x.got_json?
        puts "Half Time"
      elsif match_timer.pre_match? && x.missing_link?
        get_bbc(x)
      elsif match_timer.match_over?
        x.delete
      elsif match_timer.match_on? && x.missing_team?
        form_get
      elsif match_timer.live_match? && x.missing_json?
        recorder(x)
        scores
        puts "Recording"
      elsif match_timer.match_soon? && x.no_team?
        teams(x)
        puts "Getting Teams"
      else
        puts "Still a while to go"
      end
    end
  end

  def get_bbc(fixture)
    if ((fixture.jsonurl == nil) || (fixture.jsonurl == ""))
      team = bbc_name(fixture.hometeam)
      uri = "http://www.bbc.co.uk/sport/football/premier-league/fixtures"
      doc = Nokogiri::HTML(open(uri))
      doc1 = doc.xpath('html/body/div[3]/div/div/div[1]')
      mentions = doc1.search "[text()*='#{team}']"
      match = mentions.first.parent.parent.parent.parent
      @rawlink = match.css('a').last['href']
      if is_valid_match? == true
        puts "In the IF"
        raw_link
        fixture.rawlink = @rawlink
        fixture.jsonurl = @jsonurl
        fixture.lineup_url = @lineup_url
        fixture.save
      else
        @rawlink = fixture.rawlink
        @jsonurl = fixture.jsonurl
        @lineup_url = fixture.lineup_url
      end
    end
  end


  def is_valid_match?
    !!(@rawlink =~ /(\/sport\/football\/\d+)/)
  end

  def raw_link
    puts "getting rawlink"
    driver = Selenium::WebDriver.for(:remote, :url => "http://localhost:9134")
    base = "http://www.bbc.co.uk"
    driver.navigate.to (base+@rawlink)
    page = driver.page_source
    json_link = page.match(/(http:\/\/polling.bbc.co.uk\/sport\/shared\/football\/oppm\/json).{11}/)
    lineup_link = page.match(/(http:\/\/polling.bbc.co.uk\/sport\/shared\/football\/oppm\/line-up).{11}/)
    @jsonurl = json_link.to_s
    @lineup_url = lineup_link.to_s
    driver.quit
  end

  def get_json(jsonurl)
    rawbbc = JSON.parse HTTParty.get(jsonurl).response.body.delete('(').delete(');')
    midway = rawbbc['data']['payload']['Match']
    result = []
    midway.each { |x| result = x.assoc('stats') }
    result[1]
  end


  # say this as "AR record" not "Activerecord record" in case an enrique-type ever comes across this.
  def recorder(ar_record)
    x = ar_record
    data = get_json(x.jsonurl)

    if data['shotsOnTarget'] == nil
      puts "No data yet"
    else
      puts "Something recorded"
      Poss.where(:homeposs => data['possession']['home'], :hometeam => x.hometeam, :awayposs => data['possession']['away'], :awayteam => x.awayteam).create
      Target.where(:homeshots => data['shotsOnTarget']['home'], :hometeam => x.hometeam, :awayshots => data['shotsOnTarget']['away'], :awayteam => x.awayteam).create
      Shot.where(:homeshots => data['shots']['home'], :hometeam => x.hometeam, :awayshots => data['shots']['away'], :awayteam => x.awayteam).create
      Corner.where(:home => data['corners']['home'], :hometeam => x.hometeam, :away => data['corners']['away'], :awayteam => x.awayteam).create
      Foul.where(:home => data['fouls']['home'], :hometeam => x.hometeam, :away => data['fouls']['away'], :awayteam => x.awayteam).create
    end
  end

  def lineup_url_set(lineup)
    @lineup_url = lineup
    teams
  end

  def teams(x)
    document = Nokogiri::HTML(open(x.lineup_url))

    home = document.xpath('html/body/div/div/div[1]')
    away = document.xpath('html/body/div/div/div[2]')
    hometeam = home.css('h3.team-name').inner_text
    awayteam = away.css('h3.team-name').inner_text

    home.css('.player-list>li').each do |x|
      xx = x.inner_text.strip.split(' ')
      Team.where(:player => xx[1], :number => xx[0].to_i, :subbed => (xx[2..4].join).delete('('), :teamname => hometeam, :starting => true).first_or_create
    end
    home.css('.subs-list>li').each do |x|
      xx = x.inner_text.strip.split(' ')
      Team.where(:player => xx[1], :number => xx[0].to_i, :teamname => hometeam, :starting => false).first_or_create
    end

    away.css('.player-list>li').each do |x|
      xx = x.inner_text.strip.split(' ')
      Team.where(:player => xx[1], :number => xx[0].to_i, :subbed => (xx[2..4].join).delete('('), :teamname => awayteam, :starting => true).first_or_create
    end
    away.css('.subs-list>li').each do |x|
      xx = x.inner_text.strip.split(' ')
      Team.where(:player => xx[1], :number => xx[0].to_i, :teamname => awayteam, :starting => false).first_or_create
    end
    x.gotteam = true
    x.save
  end

  def scores
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
      sco = Score.where(:teams => x['teams']).first_or_create
      sco.score = x['score']
      sco.save
    end
  end

end
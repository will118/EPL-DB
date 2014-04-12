class Schedule

  def initialize(team)
    @team = team
  end

  def abbr_date(abb)
    case abb
      when "Apr" then "4"
      when "May" then "5"
    end
  end

  def bbc_next_matches
    name = stats_fc_normaliser(@team.downcase)
    doc = nokophantom_get "http://www.bbc.co.uk/sport/football/teams/#{name}/fixtures"
    matches = doc.css(".preview")
    cleaned = matches.map{|x| x if x.css(".match-competition").inner_text.strip == "Premier League"}
    cleaned.reject!{|x| x.nil?}
    output = []
    cleaned.each do |x|
      teams = x.css("p").inner_text.strip.split
      date = x.css(".match-date").inner_text.strip.split
      date << "2014"
      month = abbr_date(date[2])
      time = x.css(".kickoff").inner_text.strip.split(":")
      fqdate = DateTime.new(date[3].to_i, month.to_i, date[1].to_i, time[0].to_i, time[1].to_i)
      hometeam = []
      awayteam = []
      teamone = true

      teams.each do |y|
        if y == "V"
          teamone = false
          next
        end
        if teamone
          hometeam << " " unless hometeam.empty?
          hometeam << y
        else
          awayteam << " " unless awayteam.empty?
          awayteam << y
        end
      end
      hometeam = hometeam.join
      awayteam = awayteam.join

     output << {"home" => hometeam, "away" => awayteam, "date" => fqdate}
    end
    output
  end

  def save
    json = bbc_next_matches
    json.each do |x|
      Fixture.where(:kickoff => x["date"], :hometeam => x["home"], :awayteam => x["away"]).first_or_create
    end
  end

end


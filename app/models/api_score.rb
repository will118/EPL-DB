class ApiScore < ActiveRecord::Base

  serialize :halftime, Array
  serialize :fulltime, Array
  serialize :incidents, JSON

    def self.live(n)
      where(:live => true).order(:date).last(n).each do |x|
        tooltip = []
        x['incidents'].each do |y|
          tooltip << [ y['minute'], y['playershort'], y['type'], y['team'] ]
        end
        x['incidents'] = tooltip
      end
    end

    def self.results(n)
        where(:live => false).order('date DESC').first(n).each do |x|
          tooltip = []
          x['incidents'].each do |y|
            tooltip << [ y['minute'], y['playershort'], y['type'], x['team'] ]
          end
        x['incidents'] = tooltip
      end
    end

    def self.league_table
      RedisService.set_if_expired(:table,160) do
        league_bbc
      end
    end

    def self.league_bbc
      doc = nokophantom_get "http://www.bbc.co.uk/sport/football/tables"
      table = doc.css ".table-stats"
      nodes = table[0]
      teams = nodes.css(".team-name").map{|x| x.inner_text}
      played = nodes.css(".played").map{|x| x.inner_text}
      won = nodes.css(".won").map{|x| x.inner_text}
      drawn = nodes.css(".drawn").map{|x| x.inner_text}
      lost = nodes.css(".lost").map{|x| x.inner_text}
      difference = nodes.css(".goal-difference").map{|x| x.inner_text}
      points = nodes.css(".points").map{|x| x.inner_text}

      output = []
      20.times do |i|
        i += 1
        output << {"team" => teams[i], "played" => played[i], "won" => won[i], "drawn" => drawn[i],
                   "lost" => lost[i], "difference" => difference[i],"points" => points[i]}
      end
      output
    end

    class << self
     include ActionView::Helpers::DateHelper
        def fixtures_countdown
          RedisService.set_if_expired(:fixcountdown,30) do
            fixes = Fixture.where("kickoff > ?", Time.now).order(:kickoff).take(7)
            out = []
            fixes.each do |fixture|
              date = fixture.kickoff
              time = date - (Time.now.utc + 1.hour)
              fixture_date_diff = distance_of_time_in_words_to_now(Time.now.utc + time)
               out << {"home" => fixture.hometeam, "away" => fixture.awayteam, "date" => fixture_date_diff, "channel" => fixture.channel}
            end
            out
          end
        end
    end

      def self.past_results(team)
        name = stats_fc_normaliser(team)
        RedisService.set_if_expired(:"#{team.delete(" ")}results",300) do
          season_start = "2013-08-15"
          today_date = Date.today.strftime("%Y-%m-%d")
          json = json_get "http://api.statsfc.com/results.json?key=#{ENV["STATS_KEY"]}&competition=#{ENV["COMP"]}&team=#{name}&year=2013/2014&from=#{season_start}&to=#{today_date}"
          json.each do |x|
            tooltip = []
            x['incidents'].each do |y|
              tooltip << [ y['minute'], y['playershort'], y['type'], y['team'] ]
            end
            x['incidents'] = tooltip
          end
        end
      end

      def self.top_scorers(team)
        name = stats_fc_normaliser(team)
        if stats_fc_checker(name) == "1"
          RedisService.set_if_expired(:"#{team.delete(" ")}topscorers",300) do
          json_get("http://api.statsfc.com/top-scorers.json?key=#{ENV["STATS_KEY"]}&competition=#{ENV["COMP"]}&team=#{name}&year=2013/2014")
        end
        else "Incorrect team name"
        end
      end

end

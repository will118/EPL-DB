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
      RedisService.set_if_expired(:table,60) do
        json_get "http://api.statsfc.com/#{ENV["COMP"]}/table.json?key=#{ENV["STATS_KEY"]}"
      end
    end

    class << self
     include ActionView::Helpers::DateHelper
        def fixtures_countdown
          RedisService.set_if_expired(:fixcountdown,300) do
            from_date = Date.today.strftime("%Y-%m-%d")
            to_date = 2.months.from_now.strftime("%Y-%m-%d")
            result = json_get "http://api.statsfc.com/#{ENV["COMP"]}/fixtures.json?key=#{ENV["STATS_KEY"]}&from=#{from_date}&to=#{to_date}&timezone=#{ENV["TIMEZONE"]}&limit=10"
            result.each do |fixture|
              date = Time.parse(fixture['date'])
              time = date - Time.now.utc
              fixture['date'] = distance_of_time_in_words_to_now(Time.now.utc + time)
              fix = Fixture.get_channel(fixture['home'], fixture['away'])
              fixture['channel'] = fix.channel unless fix == nil
            end
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

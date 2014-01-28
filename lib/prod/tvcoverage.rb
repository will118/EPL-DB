class TvCoverage

  class << self
    # Such OO
    def run
      add_to_fixture_db(filter_data(filter_table(scrape)))
    end

    def scrape
      Nokogiri::HTML(open("http://www.wheresthematch.com/barclays-premier-league/"))
    end

    def filter_table(html_data)
      table = html_data.xpath("html/body/div[1]/div[3]/form/div[4]")
      hashes = []
      table.css("tr").each do |x|
        entry = [data: x.css(".fixture-details"), date: x.css(".start-details")]
        hashes << entry unless entry[0][:data].empty?
      end
      hashes
    end

    def filter_data(table)
      table.map do |x|
        data, date = x[0][:data], x[0][:date]
        {data: data.text.gsub(/(\r|\n).*/, ''), channel: data.text.match(/(?<=pm\son\s)(.*)(?=Claim)/)[1], date: date.text.gsub(/\r\n|\r|\n/, '').gsub(/\s{2,}/, '').gsub(/2014/, '2014 ')}
      end
    end

    def add_to_fixture_db(data)
      data.each do |x|
        team1, team2 = x[:data].split(' vs ')
        fix = Fixture.where(:hometeam => team1.titleize, :awayteam => team2.titleize).order(:kickoff).first
        if fix == nil
          "Fixture not found in DB"
        else
          fix.channel = x[:channel]
          fix.save
        end
       end
    end

  end

end

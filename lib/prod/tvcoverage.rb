class TvCoverage

  def scrape
    Nokogiri::HTML(open("http://www.wheresthematch.com/barclays-premier-league/"))
  end

  def filter_table
    table = scrape.xpath("html/body/div[1]/div[3]/form/div[4]")
    hashes = []
    table.css("tr").each do |x|
      entry = [data: x.css(".fixture-details"), date: x.css(".start-details")]
      hashes << entry unless entry[0][:data].empty?
    end
    hashes
  end

  def filter_data
    filter_table.map do |x|
      data, date = x[0][:data], x[0][:date]
      {data: data.text.gsub(/(\r|\n).*/, ''), channel: data.text.match(/(?<=pm\son\s)(.*)(?=Claim)/)[1], date: date.text.gsub(/\r\n|\r|\n/, '').gsub(/\s{2,}/, '').gsub(/2014/, '2014 ')}
    end
  end

end

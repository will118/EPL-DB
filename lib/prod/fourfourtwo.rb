class FourFourTwo

  attr_reader :link, :final

  def match_link
    @uri = "http://www.fourfourtwo.com"
    statszone = "/statszone/fixtures/8-2013"
    url = @uri + statszone
    doc = Nokogiri::HTML(open(url))
    doc.xpath('html/body/div/div[2]/div[6]/div/div/table[1]')
    links = doc.css('a').map { |link| link['href'] }
    por = []
    links.each {|l| por << (/\/statszone\/8-2013\/matches(.*?)\/pre-match/.match(l)) }
    final = []
    (por.reject { |e| e == nil }).each {|x| final << x[0]}
    @next_matches = final
    text
  end

  def text
    @next_matches.each do |x|
      doc = Nokogiri::HTML(open(@uri+x))
      texts = doc.css('.pre-match').inner_text
      hometeam = (doc.css('div.teams div.score-wrapper span.home-head').inner_text).gsub(/[\\\n]/, '').strip
      awayteam = (doc.css('div.teams div.score-wrapper span.away-head').inner_text).gsub(/[\\\n]/, '').strip
      all_text = texts.split("\n").drop(1)
      all_text.each do |x|
        Prematch.where(:text => x, :hometeam => hometeam, :awayteam => awayteam).first_or_create
      end
    end
  end

end
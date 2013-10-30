require 'open-uri'

class FourFourTwo

  attr_accessor :next_matches

  def initialize
    @uri = "http://www.fourfourtwo.com"
  end

  def save
    match_links
    open_and_save
  end

  def match_links
    doc = Nokogiri::HTML(open(@uri+"/statszone/fixtures/8-2013/"))
    doc.xpath('html/body/div/div[2]/div[6]/div/div/table[1]')
    links = doc.css('a').map { |link| link['href'] }
    every_matched_link = links.map {|l| /\/statszone\/8-2013\/matches(.*?)\/pre-match/.match(l) }
    @next_matches = (every_matched_link.reject { |e| e.nil? }).map {|x| x[0]}
    return @next_matches 
  end
  
  def open_and_save
    @next_matches.each do |x|
      doc = Nokogiri::HTML(open(@uri+x))
      texts = doc.css('.pre-match').inner_text
      all_text = texts.split("\n").drop(1)
      all_text.each do |x|
        Prematch.where(:text => x, :hometeam => parse_team_name("home", doc), :awayteam => parse_team_name("away", doc)).first_or_create
      end
    end
  end

  private
  def parse_team_name(home_or_away, doc)
    (doc.css("div.teams div.score-wrapper span.#{home_or_away}-head").inner_text).gsub(/[\\\n]/, '').strip
  end

end
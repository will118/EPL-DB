require 'open-uri'

class Arscom

  URI = "http://www.arsenal.com"

	def initialize
		@links = link_get
	end

	def link_filter
		rejection_criteria = ["matchdayshowlive", "month-award", "report", "pressconference", "international-watch", "lotto", "train-ahead", "Theclockendpodcast", "features", "highlights", "pictures", "photocall", "goalofthemonth"]

		links = @links
		
		rejection_criteria.each do |word|
		  links -= links.grep(/#{word}/)
	  end
		
		@links = links
		# Clever. Must be preserved for future reference. 
		# @links.reject {|link| rejection_criteria.any? {|criteria| link.match(Regexp.new(criteria)) } }
	end

	def link_get
	  agent = Mechanize.new
	  agent.user_agent_alias = 'Mac Safari'
	  link_got = [] 
	  page = agent.get("#{URI}/news/news-archive?category=first")
	  page.parser.xpath('/html/body/div[5]/div/div/article/*/ul/*/*').each do | links | 
	  	link_got << links.attribute('href')
		end
	  link_got
  end

  def noko_save
  	links = @links
  	links.each do | urls | 
	    nokogiri = Nokogiri::HTML(open("#{URI}#{urls}")) 
	    nokogiri.css('script').remove 
	    nokogiri.xpath('/html/body/div[3]/div/article/section[1]/small').remove 
	    title = nokogiri.css("h1")[0].text
	    article = Article.where(:title => title).first_or_create  
	    dirtybody = nokogiri.xpath('/html/body/div[3]/div/article/section[1]').inner_text
	    article.body = body_washer(dirtybody)
	    src = (nokogiri.at_xpath '//img/@src').to_s
	    article.url = src.chars.first == "/" ? "http://www.arsenal.com" + src : src
	    article.save
    end
  end 

  def body_washer(string)
  	string.gsub!(/(Flash Player)(.*)(Play again)/m, '') 
  	string.gsub!(/^\s{5,}/, "\n")
  	string.gsub!(/View the large version of this image/, '')
  	string
  end

  def links
  	@links
  end

end
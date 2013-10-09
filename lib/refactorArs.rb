require "mechanize"
require "nokogiri"
require "open-uri"

class Arscom

  URI = "http://www.arsenal.com"

	def initialize
		@links = link_get
	end

	def link_filter
		rejection_criteria = ["matchdayshowlive", "report", "pressconference", "international-watch", "lotto", "train-ahead", "Theclockendpodcast", "features", "highlights", "pictures", "photocall", "goalofthemonth"]

		# Evgeny wrote this line btw. Match doesn't work because of it being nokogiri objects but it's clever. Must be preserved for future reference. 
		# @links.reject {|link| rejection_criteria.any? {|criteria| link.match(Regexp.new(criteria)) } }
		links = @links
		
		rejection_criteria.each do |word|
		  links -= links.grep(/#{word}/)
	  end
		
		@links = links

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
  	@links.each do | urls | 
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
  end

  def noko_test
  	# @links.each do | urls | 
	    nokogiri = Nokogiri::HTML(open("#{URI}/news/news-archive/bendtner-i-m-a-different-person-now")) 
	    nokogiri.css('script').remove 
	    nokogiri.xpath('/html/body/div[3]/div/article/section[1]/small').remove 
	    title = nokogiri.css("h1")[0].text
	    # article = Article.where(:title => title).first_or_create  
	    dirtybody = nokogiri.xpath('/html/body/div[3]/div/article/section[1]').inner_text
	    p dirtybody
	    # src = (nokogiri.at_xpath '//img/@src').to_s
	    # article.url = src.chars.first == "/" ? "http://www.arsenal.com" + src : src
	    # article.save
    # end
  end 
  
end


# par = Arscom.new.link_filter
arscom = Arscom.new
arscom.link_filter
arscom.noko_test
# p par.printer
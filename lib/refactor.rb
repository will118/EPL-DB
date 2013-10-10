require "mechanize"
require "nokogiri"
require "open-uri"

# # class Arscom

# #   URI = "http://www.arsenal.com"

# # 	def initialize
# # 		@links = link_get
# # 		@text = ""
# # 	end

# # 	def link_filter
# # 		rejection_criteria = ["matchdayshowlive", "report", "pressconference", "international-watch", "lotto", "train-ahead", "Theclockendpodcast", "features", "highlights", "pictures", "photocall", "goalofthemonth"]

# # 		# Evgeny wrote this line btw. Match doesn't work because of it being nokogiri objects but it's clever. Must be preserved for future reference. 
# # 		# @links.reject {|link| rejection_criteria.any? {|criteria| link.match(Regexp.new(criteria)) } }
# # 		links = @links
		
# # 		rejection_criteria.each do |word|
# # 		  links -= links.grep(/#{word}/)
# # 	  end
		
# # 		@links = links

# # 	end

# # 	def link_get
# # 	  agent = Mechanize.new
# # 	  agent.user_agent_alias = 'Mac Safari'
# # 	  link_got = [] 
# # 	  page = agent.get("#{URI}/news/news-archive?category=first")
# # 	  page.parser.xpath('/html/body/div[5]/div/div/article/*/ul/*/*').each do | links | 
# # 	  	link_got << links.attribute('href')
# # 		end
# # 	  link_got
# #   end

# #   def noko_save
# #   	@links.each do | urls | 
# # 	    nokogiri = Nokogiri::HTML(open("#{URI}#{urls}")) 
# # 	    nokogiri.css('script').remove 
# # 	    nokogiri.xpath('/html/body/div[3]/div/article/section[1]/small').remove 
# # 	    title = nokogiri.css("h1")[0].text
# # 	    article = Article.where(:title => title).first_or_create  
# # 	    dirtybody = nokogiri.xpath('/html/body/div[3]/div/article/section[1]').inner_text
# # 	    article.body = body_washer(dirtybody)
# # 	    src = (nokogiri.at_xpath '//img/@src').to_s
# # 	    article.url = src.chars.first == "/" ? "http://www.arsenal.com" + src : src
# # 	    article.save
# #     end
# #   end 

# #   def body_washer(string)
# #   	string.gsub!(/(Flash Player)(.*)(Play again)/m, '') 
# #   	string.gsub!(/^\s{5,}/, "\n")
# #   end

# #   def noko_test
# #   	# @links.each do | urls | 
# # 	    nokogiri = Nokogiri::HTML(open("#{URI}/news/news-archive/bendtner-i-m-a-different-person-now")) 
# # 	    nokogiri.css('script').remove 
# # 	    nokogiri.xpath('/html/body/div[3]/div/article/section[1]/small').remove 
# # 	    title = nokogiri.css("h1")[0].text
# # 	    # article = Article.where(:title => title).first_or_create  
# # 	    dirtybody = nokogiri.xpath('/html/body/div[3]/div/article/section[1]').inner_text
# # 	    p dirtybody
# # 	    # src = (nokogiri.at_xpath '//img/@src').to_s
# # 	    # article.url = src.chars.first == "/" ? "http://www.arsenal.com" + src : src
# # 	    # article.save
# #     # end
# #   end 
  
# # end

# class FourFourTwo

# 	attr_reader :link, :final

# 	def initialize
# 		@link = match_link
# 	end

# 	def match_link
	  
# 	  uri = "http://www.fourfourtwo.com"
	 
# 		doc = Nokogiri::HTML(open("#{uri}/statszone"))

# 	  doc.xpath('html/body/div/div[2]/div[7]/div/div')

# 	  arsenalmentions  = doc.search "[text()*='Arsenal']"
# 		arsenalmatch = arsenalmentions.last.parent
# 		arsenal_link = arsenalmatch.at_css('a')['href']

# 		arsenal_link
# 	end
 
#   def save
#   	@final.children.each do |x| 
# 	   	pre = Prematch.where(:text => x.inner_text).first_or_create
# 	    pre.text = x.inner_text
# 	  	pre.save
# 	  end
# 	end

# 	def text
# 		doc = Nokogiri::HTML(open("#{@link}/pre-match"))
# 		texts = doc.css('.pre-match').inner_text
# 		@final = texts.split("\n").drop(1)
# 	end
# end

		uri = "http://www.bbc.co.uk/sport/football/premier-league/fixtures"
		doc = Nokogiri::HTML(open("#{uri}"))
	  doc1 = doc.xpath('html/body/div[3]/div/div/div[1]/div[3]/div[2]/div')
	  arsenalmentions = doc1.search "[text()*='Arsenal']"
	  arsenalmatch = arsenalmentions.first.parent.parent.parent.parent
		p arsenalmatch.css('a').last['href']



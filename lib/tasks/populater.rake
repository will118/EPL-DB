namespace :populater do
  desc "Populates the db"
  task populate: :environment do
  
  require 'nokogiri'  
  require 'mechanize'  
  require 'open-uri' 

  rejection_criteria = ["matchdayshowlive", "report", "Theclockendpodcast", "features", "highlights", "pictures", "photocall"]
  uri = "http://www.arsenal.com"
 
  agent = Mechanize.new
  agent.user_agent_alias = 'Mac Safari'


  @links = [] 
  page = agent.get("#{uri}/news/news-archive?category=first")
  page.parser.xpath('/html/body/div[5]/div/div/article/*/ul/*/*').each do | links | 
  @links << links.attribute('href')
  end

  rejection_criteria.each do |word|
    @links -= @links.grep(/#{word}/)
  end


  @links.each do | urls | 
    nokogiri = Nokogiri::HTML(open("#{uri}#{urls}")) 
    nokogiri.css('script').remove 
    nokogiri.xpath('/html/body/div[3]/div/article/section[1]/small').remove 
    @nokogiri_article = Article.new
    article = Article.new 
    article.title = nokogiri.css("h1")[0].text
    article.body = nokogiri.xpath('/html/body/div[3]/div/article/section[1]').inner_text
    src = (nokogiri.at_xpath '//img/@src').to_s
    article.url = src.chars.first == "/" ? "http://www.arsenal.com" + src : src
    article.save
    end
  end

 #  desc "Wipes the db"
 #  task wipe: :environment do
 #  	config = ActiveRecord::Base.configurations[::Rails.env]
	#   connection = ActiveRecord::Base.connection
	#   connection.disable_referential_integrity do
 #    connection.tables.each do |table_name|
 #      next if connection.select_value("SELECT count(*) FROM #{table_name}") == 0
 #        connection.execute("TRUNCATE #{table_name}")
	#     end
	#   end
	# end
end

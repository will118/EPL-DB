require "open-uri"
require "nokogiri"
require_relative 'prod/namenormaliser'
	include NameNormaliser

teams = ["Newcastle United",
 "Arsenal",
 "Manchester United",
 "Chelsea",
 "Stoke City",
 "Everton",
 "Swansea City",
 "West Ham United"]

 teams.each do |x| 

uri = "http://www.bbc.co.uk/sport/football/premier-league/fixtures"
				team = bbc_name(x)
				doc = Nokogiri::HTML(open("#{uri}"))
				doc1 = doc.xpath('html/body/div[3]/div/div/div[1]/div[3]/div[2]/div')
					mentions = doc1.search "[text()*='#{team}']"
				if mentions == nil
					puts "its-nil"
					next
				end
					match = mentions.first.parent.parent.parent.parent
					rawlink = match.css('a').last['href']
p rawlink
				end
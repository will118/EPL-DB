# require "open-uri"
# require "nokogiri"

# class BBC

    
# 	def initialize(team)
# 		@team = team
# 		@rawlink = get_bbc(team)
# 	end

# 	def get_bbc(team)
# 		uri = "http://www.bbc.co.uk/sport/football/premier-league/fixtures"
# 		doc = Nokogiri::HTML(open("#{uri}"))
# 	  doc1 = doc.xpath('html/body/div[3]/div/div/div[1]/div[3]/div[2]/div')
# 	  mentions = doc1.search "[text()*='#{team}']"
# 	  match = mentions.first.parent.parent.parent.parent
# 		url = match.css('a').last['href']
# 		# url = "/sport/0/football/24350247"
# 		url
# 	end

# 	def is_valid_match?
# 		!!(@rawlink =~ /(\/sport\/0)/)
# 	end

# 	def rawlink

# 	if is_valid_match? == true
# 		"Valid"
# 	else "Too early"
# 	end
# end


# end


# beeb = BBC.new("Arsenal")
# p beeb 
# # p beeb.is_valid?
# p beeb.rawlink
time_until = 1700

  if time_until < 1800 
          p "Happening soon"
        else
          p "Not yet hombre"
        end

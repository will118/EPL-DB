class FourFourTwo

	def initialize
		@link = match_link
	end

	def match_link
	  
	  uri = "http://www.fourfourtwo.com"
	 
		doc = Nokogiri::HTML(open("#{uri}/statszone"))

	  doc.xpath('html/body/div/div[2]/div[7]/div/div')

	  arsenalmentions  = doc.search "[text()*='Arsenal']"
		arsenalmatch = arsenalmentions.last.parent


		arsenal_link = arsenalmatch.at_css('a')['href']
		final = uri + arsenal_link

		return final
	end
	 

	def opta_text
		
		doc = Nokogiri::HTML(open(@link))
		final = doc.xpath('html/body/div/div[2]/div[6]/div/div/div/div[2]/div/ul')
	  final.children.each do |x| 
	  	pre = Prematch.new
	  	pre.text = x.inner_text
	  	pre.save
	  end
	end

end

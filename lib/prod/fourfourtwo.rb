class FourFourTwo

	attr_reader :link, :final

	def initialize
		@link = match_link
	end

	def match_link	  
	  uri = "http://www.fourfourtwo.com"

		doc = Nokogiri::HTML(open("#{uri}/statszone"))
	  doc.xpath('html/body/div/div[2]/div[7]/div/div')

	  arsenalmentions = doc.search "[text()*='Arsenal']"
		arsenalmatch = arsenalmentions.last.parent
		
		arsenalmatch.at_css('a')['href']
	end
 
  def save
  	@final.children.each do |x| 
	   	pre = Prematch.where(:text => x.inner_text).first_or_create
	    pre.text = x.inner_text
	  	pre.save
	  end
	end

	def text
		doc = Nokogiri::HTML(open("#{@link}/pre-match"))
		texts = doc.css('.pre-match').inner_text
		@final = texts.split("\n").drop(1)
	end

end
require 'spec_helper'

describe Arscom do
 
		context "string cleaning" do
			it "it removes flash player and LOG IN or SIGN UP to watch messages" do
				txt = File.open('spec/txtures/dirtybody.txt')
				dbody = txt.read
				expect(dbody).to include("Adobe Flash Player", "SIGN UP FOR FREE", "Flash Player is required")
				expect(Arscom.new.body_washer(dbody)).to_not include("Adobe Flash Player", "SIGN UP FOR FREE", "Flash Player is required")
			end

			it "removes certain links from the mechanize scrape" do
				arscom = Arscom.new
				array = arscom.links 
				arscom.link_filter
				filtered_array = arscom.links

				expect(filtered_array.length).to be < array.length
			end
		end

		context "object instantiation" do
			it "mechanizes an array of links" do
				arscom = Arscom.new
				links = arscom.links 
				expect(links).to be_kind_of(Array)
				expect(links.length).to be > 5
			end
		end

end

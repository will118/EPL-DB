require 'spec_helper'

describe FourFourTwo do

		context "object instantiation" do
			it "mechanizes one link" do
				fourfourtwo = FourFourTwo.new
				link = fourfourtwo.link
				expect(link).to be_kind_of(String)
				expect(link.length).to be > 20
			end
		end

		context "opta text" do 
			it "scrapes" do
				fourfourtwo = FourFourTwo.new
				fourfourtwo.text
				expect(fourfourtwo.final).to be_kind_of(Array)
				expect(fourfourtwo.final.length).to be > 5
				expect(fourfourtwo.final.sample.length).to be > 10
			end
		end
end

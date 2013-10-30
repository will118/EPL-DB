require 'spec_helper'

describe BBCGetter do
		
		it "doesn't get if jsonurl exists" do
			fix = create(:fixture, jsonurl: "foo")
			expect(BBCGetter.new.get(fix)).to eq "Got JSON url"
		end

		it "checks the rawlink is valid" do
			fix = create(:fixture)
			expect(BBCGetter.new.get(fix)).to eq "Invalid link"
		end

		it "should be a valid link" do
			link = "/sport/0/football/24350247"
			expect(BBCGetter.new.is_valid_match?(link)).to be true
		end
			 
end

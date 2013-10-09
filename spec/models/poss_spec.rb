require 'spec_helper'

describe Poss do
  it "has a valid factory" do
  	expect(create(:poss)).to be_valid
	end

 context "verifications on model" do
	it "is valid with integers for away and home" do
		expect(build(:poss)).to have(0).errors
	end

	it "is invalid without an awayteam integer" do
		expect(build(:poss, awayposs: nil)).to have(1).errors_on(:awayposs)
	end

	it "is invalid without a hometeam int" do
		expect(build(:poss, homeposs: nil)).to have(1).errors_on(:homeposs)
	end
	end
end

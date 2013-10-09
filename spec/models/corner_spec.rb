require 'spec_helper'

describe Corner do
  it "has a valid factory" do
  	expect(create(:corner)).to be_valid
	end

 context "verifications on model" do
	it "is valid with integers for away and home" do
		expect(build(:corner)).to have(0).errors
	end

	it "is invalid without an awayteam integer" do
		expect(build(:corner, away: nil)).to have(1).errors_on(:away)
	end

	it "is invalid without a hometeam int" do
		expect(build(:corner, home: nil)).to have(1).errors_on(:home)
	end
	end
end

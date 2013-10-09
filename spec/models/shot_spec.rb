require 'spec_helper'

describe Shot do
  it "has a valid factory" do
  	expect(create(:shot)).to be_valid
	end

 context "verifications on model" do
	it "is valid with integers for away and home" do
		expect(build(:shot)).to have(0).errors
	end

	it "is invalid without an awayteam integer" do
		expect(build(:shot, awayshots: nil)).to have(1).errors_on(:awayshots)
	end

	it "is invalid without a hometeam int" do
		expect(build(:shot, homeshots: nil)).to have(1).errors_on(:homeshots)
	end
	end
end

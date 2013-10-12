require 'spec_helper'

describe Supermodel do
  it "has a valid factory" do
  	expect(create(:supermodel)).to be_valid
	end

 context "verifications on model" do
	it "is valid with a name, number and subbed state" do
		expect(build(:supermodel)).to have(0).errors
	end

	it "is invalid without a matchid" do
		expect(build(:supermodel, matchid: nil)).to have(1).errors_on(:matchid)
	end

	it "is valid without a score" do
		expect(build(:supermodel, attackscore: nil)).to have(0).errors_on(:attackscore)
	end

	
	end


end

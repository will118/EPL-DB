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

	it "returns errors on matchid with a duplicate info" do
		Supermodel.create(
			date: "2013-09-30",
      matchid: 2100,
      avgpossession: 1,
      shotaccuracy: 1,
      passaccuracy: 1)
		expect(build(:supermodel)).to have(1).errors_on(:matchid)
	
	end
	end


end

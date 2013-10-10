require 'spec_helper'

describe HomeXi do
  it "has a valid factory" do
  	expect(create(:home_xi)).to be_valid
	end

 context "verifications on model" do
	it "is valid with a name, number and subbed state" do
		expect(build(:home_xi)).to have(0).errors
	end

	it "is invalid without a name" do
		expect(build(:home_xi, name: nil)).to have(1).errors_on(:name)
	end

	it "is valid without a sub" do
		expect(build(:home_xi, subbed: nil)).to have(0).errors_on(:subbed)
	end

	it "returns errors on matchid with a duplicate info" do
		HomeXi.create(
			name: "Ozil (11)",
			subbed: "Giroud (12)")
		expect(build(:home_xi)).to have(1).errors_on(:name)
	end
end

end

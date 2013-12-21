require 'spec_helper'

describe Foul do
  it "has a valid factory" do
    expect(create(:foul)).to be_valid
  end

 context "verifications on model" do
    it "is valid with integers for away and home" do
      expect(build(:foul)).to have(0).errors
    end

    it "is invalid without an awayteam integer" do
      expect(build(:foul, away: nil)).to have(1).errors_on(:away)
    end

    it "is invalid without a hometeam int" do
      expect(build(:foul, home: nil)).to have(1).errors_on(:home)
    end
  end
end

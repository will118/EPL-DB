require 'spec_helper'

describe Prematch do
  it "has a valid factory" do
    expect(create(:prematch)).to be_valid
  end

 context "verifications on model" do
   it "is valid with a name, number and subbed state" do
     expect(build(:prematch)).to have(0).errors
   end

   it "is invalid without a text" do
     expect(build(:prematch, text: nil)).to have(1).errors_on(:text)
   end

   it "returns errors on matchid with a duplicate info" do
     Prematch.create(text: "The Gunners have scored a league-high four goals in the opening 15 minutes of Barclays Premier League games this season.")
     expect(build(:prematch)).to have(1).errors_on(:text)
   end

  end
end

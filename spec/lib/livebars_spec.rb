require 'spec_helper'

describe LiveBars do

  context "Shots bar" do
    it "has a valid factory" do
      expect(create(:shot)).to be_valid
    end

    it "should return an array of two hashes" do
      FactoryGirl.create(:shot)
      expect(LiveBars.shots("Arsenal")).to be_an(Array)
      expect(LiveBars.shots("Arsenal")[0]).to be_a(Hash)
      expect(LiveBars.shots("Arsenal")[1]).to be_a(Hash)
    end
  end

  context "Possession bar" do

    it "has a valid factory" do
      expect(create(:poss)).to be_valid
    end

    it "should return an array of two hashes" do
      FactoryGirl.create(:poss)
      expect(LiveBars.possession("Arsenal")).to be_an(Array)
      expect(LiveBars.possession("Arsenal")[0]).to be_a(Hash)
      expect(LiveBars.possession("Arsenal")[1]).to be_a(Hash)
    end

    it "should have two values adding up to exactly 100" do
      FactoryGirl.create(:poss)
      livebars = LiveBars.possession("Arsenal")
      total = livebars[0]['value'] + livebars[1]['value']
      expect(total).to eq(100)
    end

    it "should correct when the possession numbers are over 101" do
      FactoryGirl.create(:poss, homeposs: 59, awayposs: 43)
      livebars = LiveBars.possession("Arsenal")
      total = livebars[0]['value'] + livebars[1]['value']
      expect(total).to eq(100)
    end

  end
end

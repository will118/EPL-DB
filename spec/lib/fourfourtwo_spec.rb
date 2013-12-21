require 'spec_helper'

describe FourFourTwo do

  context "getter" do
    four = FourFourTwo.new

    it "returns an array of urls" do
      match = four.match_links
      expect(match.length).to be > 5
      expect(match).to be_an Array
    end

    it "should save prematch quotes from the links in array it's passed" do
      expect(Prematch.count).to be 0
      four.match_links
      four.next_matches = four.next_matches[0..1]
      four.open_and_save
      expect(Prematch.count).to be > 3
    end
  end

end

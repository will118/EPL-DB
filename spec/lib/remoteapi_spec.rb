require 'spec_helper'

describe RemoteAPI do

  context "returns parsed JSONs (ruby hashes)" do
    it "of next 5 fixtures" do
      next_5_fixtures = RemoteAPI.next_5_fixtures
      expect(next_5_fixtures).to be_an(Array)
      expect(next_5_fixtures.length).to be(5)
      5.times do |x|
        expect(next_5_fixtures[x]).to be_a(Hash)
      end
    end

    it "of the table" do
      table = RemoteAPI.table
      expect(table).to be_an(Array)
      expect(table.length).to be(20)
    end
  end

    it "returns a valid kickoff time" do
      next_5_fixtures = RemoteAPI.next_5_fixtures
      expect(next_5_fixtures[0]['date']).to be_a(String)
      expect(DateTime.parse(next_5_fixtures[0]['date'])).to be_a(DateTime)
      expect(next_5_fixtures[0]['date'].split.count).to be 2
    end

    it "returns a valid countdown" do
      next_5_fixtures = RemoteAPI.next_5_fixtures_countdown
      expect(next_5_fixtures[0]['date']).to be_a(String)
      expect(next_5_fixtures[0]['date'].split.count).to be > 2
    end

    context "top scorers" do
      it "should not accept TestFC" do
        expect(RemoteAPI.top_scorers("TestFC")).to eq("Incorrect team name")
      end
      it "should accept Arsenal" do
        expect(RemoteAPI.top_scorers("Arsenal")).to be_an(Array)
      end
    end

end

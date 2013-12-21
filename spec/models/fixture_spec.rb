require 'spec_helper'

describe Fixture do
  it "has a valid factory" do
    expect(create(:fixture)).to be_valid
  end

 context "verifications on model" do
    it "checks links are saved" do
      fix = Fixture.new
      expect([fix.rawlink,fix.lineup_url,fix.jsonurl]).to eq [nil, nil, nil]
      links = ["http://arsenal.com","http://spudssuck.com","http://northlondonisred.com"]
      fix.link_save(links[0],links[1],links[2])
      expect([fix.rawlink,fix.lineup_url,fix.jsonurl]).to eq [links[0],links[1],links[2]]
    end

    it "booleans team presence" do
      fix = build(:fixture, gotteam: nil)
      expect(fix.no_team?).to be true
      fix.got_team!
      expect(fix.no_team?).to be false
    end

    it "booleans link presence" do
      fix = build(:fixture, lineup_url: "foo", rawlink: "bar", jsonurl: "foobar")
      expect(fix.have_json_link?).to be true
      expect(fix.have_team_link?).to be true
      expect(fix.missing_link?).to be false
    end

    it "updates timestamps for team scraping" do
      fix = create(:fixture)
      expect(fix.updated_at).to be_within(1).of(DateTime.now)

      fix.updated_at = DateTime.now.utc - 8.minutes
      expect(fix.out_of_date_teams?).to be true
      fix.updated_at = DateTime.now.utc + 8.minutes
      expect(fix.out_of_date_teams?).to be false
    end

  end
end

require 'spec_helper'

describe Teams do

  context "verifies the outputs" do
    it "hometeam" do
      create(:fixture)
      teams_array = YAML::load( File.open( 'testteams.yml' ) )
      teams_array.each do |player|
        create(:team, teamname: "Arsenal", player: player)
      end
      team = Teams.home_team("Arsenal")
      expect(team).to be_an(Array)
      (team.length).times do |x|
        expect(teams_array[x]).to eq team[x].player
      end
    end

    it "awaysubs" do
      create(:fixture)
      teams_array = YAML::load( File.open( 'testsubs.yml' ) )
      teams_array.each do |player|
        create(:team, teamname: "Spuds", player: player, starting: false)
      end
      team = Teams.away_subs("Spuds")
      expect(team).to be_an(Array)
      (team.length).times do |x|
        expect(teams_array[x]).to eq team[x].player
      end
    end
  end

end
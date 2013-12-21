require 'spec_helper'

describe GraphJSON do

  context "Main dashboard multiline graph" do
    it "should return an array of hashes" do
      FactoryGirl.create(:fixture)
      FactoryGirl.create(:supermodel)
      graph = GraphJSON.new.main("Arsenal")
      expect(graph).to be_an(Array)
      graph.each do |x|
        expect(x).to be_a(Hash)
        expect(x['key'].length).to be >= 8
        expect(x['values']).to be_an(Array)
      end
    end
    it "should add an x-axis index to arrays" do
      input_array = [3, 8, 25]
      resultant_array = GraphJSON.new.x_axis_maker(input_array)
      expect(resultant_array).to be_an(Array)
      (input_array.length).times do |x|
        expect(resultant_array[x][0]).to eq x+1
        expect(resultant_array[x][1]).to eq input_array[x]
      end
    end
  end

  context "Live Graphs" do

    it "verifies team name" do
      FactoryGirl.create(:fixture)
      expect(GraphJSON.new.possession('Spuds')).to eq nil
      expect(GraphJSON.new.possession('Arsenal')).not_to eq nil
      FactoryGirl.create(:target)
      expect(GraphJSON.new.targets('Spuds')).to eq nil
      expect(GraphJSON.new.targets('Arsenal')).not_to eq nil
      FactoryGirl.create(:foul)
      expect(GraphJSON.new.fouls('Spuds')).to eq nil
      expect(GraphJSON.new.fouls('Arsenal')).not_to eq nil
      FactoryGirl.create(:corner)
      expect(GraphJSON.new.corners('Spuds')).to eq nil
      expect(GraphJSON.new.corners('Arsenal')).not_to eq nil
      FactoryGirl.create(:shot)
      expect(GraphJSON.new.shots('Spuds')).to eq nil
      expect(GraphJSON.new.shots('Arsenal')).not_to eq nil
    end

    it "verifies output of possession graph generator" do
      FactoryGirl.create(:fixture)
      FactoryGirl.create(:poss)
      graph = GraphJSON.new.possession("Arsenal")
      expect(graph).to be_an Array
      expect(graph[0]).to be_a Hash
      expect(graph[0]['values']).to be_an Array
      expect(graph[0]['values'][0]).to be_an Array
      expect(graph[0]['values'][0].length).to eq 2
    end

    it "verifies output of d3 data builder" do
      home = [61,63,55,55,53,64,53,62]
      away = [61,63,66,66,63,64,63,62]
      hometeam = "Arsenal"
      awayteam = "Spuds"
      d3data = GraphJSON.new.d3_data_builder(home, away, hometeam, awayteam)
      expect(d3data).to be_an Array
      expect(d3data[0]).to be_a Hash
      expect(d3data[0]['values']).to be_an Array

      d3data[0]['values'].length.times do |x|
        expect(d3data[0]['values'][x][1]).to eq home[x]
        expect(d3data[1]['values'][x][1]).to eq away[x]
      end

      expect(d3data[0]['key']).to eq hometeam
      expect(d3data[1]['key']).to eq awayteam

    end
  end

end

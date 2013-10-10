require 'spec_helper'

describe BBC do

		context "object instantiation" do
			it "HTTP partys hard and gets a json" do
				bbc = BBC.new
				json = bbc.statsjson
				expect(json).to be_kind_of(Hash)
				expect(json.length).to eq 5
			end
		end

		context "live possession pie" do
			it "json generation. hash inside array" do
				bbc = BBC.new
				json = bbc.possession
				expect(json).to be_kind_of(Array)
				expect(json[0]).to be_kind_of(Hash)
				expect(json.length).to eq 2
			end
		end

end

require 'spec_helper'

describe Squawka do
	sqk = Squawka.new("Arsenal")

		context "getting" do
			it "the raw json-esque file for a team" do
				expect(sqk.parsed_json).to be_a Hash
				expect(sqk.parsed_json.to_s.length).to be > 100
			end

			it "verifys the hasher method and saves" do
				sqk.hasher
				sqk_array = [sqk.avgpos, sqk.shotacc, sqk.opta, sqk.passacc]
				expect(sqk_array).to be_an Array
				4.times do |x| 
					expect(sqk_array[x]).to be_an Hash
				end
				expect(Supermodel.count).to be 0
				sqk.save
				expect(Supermodel.count).to be > 8
			end
		end	
		
end

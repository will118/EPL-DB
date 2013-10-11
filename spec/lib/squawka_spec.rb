require 'spec_helper'

describe Squawka do

		context "object instantiation" do
			it "verifies that a full json is HTTPartied" do
		    squawk = Squawka.new
				expect(squawk.parsed_json).to be_kind_of(Hash)
				expect(squawk.parsed_json.length).to be > 20
			end

			it "verifies the hasher method" do
		    squawk = Squawka.new
		    squawk.hasher
				expect(squawk.avgpos).to be_kind_of(Hash)
				expect(squawk.shotacc).to be_kind_of(Hash)
				expect(squawk.opta).to be_kind_of(Hash)
				expect(squawk.passacc).to be_kind_of(Hash)
			end
		end
end

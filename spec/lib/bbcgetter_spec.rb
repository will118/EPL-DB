require 'spec_helper'

describe BBCGetter do

  it "doesn't get if jsonurl exists" do
    fix = create(:fixture, jsonurl: "foo")
    expect(BBCGetter.new.get(fix)).to eq "Got JSON url"
  end

  it "should be a valid link" do
    link = "/sport/0/football/24350247"
    expect(BBCGetter.new.is_valid_match?(link)).to be true
  end
end

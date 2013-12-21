require 'spec_helper'

describe Schedule do

  it "name is normalised and 5 fixtures" do
    sched = Schedule.new("West Bromwich albion")
    next_match = sched.next_match
    expect(next_match).to be_an Array
    expect(next_match.length).to eq 5
  end

  it "saves fixtures to db" do
    homefix = Fixture.where(:hometeam => "West Bromwich Albion")
    expect(homefix.length).to be 0
    Schedule.new("West Bromwich albion").save
    homefix = Fixture.where(:hometeam => "West Bromwich Albion")
    expect(homefix.length).to_not be 0
  end

end

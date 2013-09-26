require 'spec_helper'

describe "fixtures/show" do
  before(:each) do
    @fixture = assign(:fixture, stub_model(Fixture,
      :hometeam => "Hometeam",
      :awayteam => "Awayteam",
      :competition => "Competition"
    ))
  end

  it "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/Hometeam/)
    rendered.should match(/Awayteam/)
    rendered.should match(/Competition/)
  end
end

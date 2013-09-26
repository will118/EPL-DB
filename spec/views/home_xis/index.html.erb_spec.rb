require 'spec_helper'

describe "home_xis/index" do
  before(:each) do
    assign(:home_xis, [
      stub_model(HomeXi,
        :name => "Name",
        :number => 1,
        :subbed => "Subbed"
      ),
      stub_model(HomeXi,
        :name => "Name",
        :number => 1,
        :subbed => "Subbed"
      )
    ])
  end

  it "renders a list of home_xis" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "Name".to_s, :count => 2
    assert_select "tr>td", :text => 1.to_s, :count => 2
    assert_select "tr>td", :text => "Subbed".to_s, :count => 2
  end
end

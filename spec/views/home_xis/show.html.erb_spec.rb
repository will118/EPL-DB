require 'spec_helper'

describe "home_xis/show" do
  before(:each) do
    @home_xi = assign(:home_xi, stub_model(HomeXi,
      :name => "Name",
      :number => 1,
      :subbed => "Subbed"
    ))
  end

  it "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/Name/)
    rendered.should match(/1/)
    rendered.should match(/Subbed/)
  end
end

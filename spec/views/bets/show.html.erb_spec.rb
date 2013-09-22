require 'spec_helper'

describe "bets/show" do
  before(:each) do
    @bet = assign(:bet, stub_model(Bet,
      :homescore => 1,
      :awayscore => 2,
      :homeodds => "9.99",
      :awayodds => "9.99"
    ))
  end

  it "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/1/)
    rendered.should match(/2/)
    rendered.should match(/9.99/)
    rendered.should match(/9.99/)
  end
end

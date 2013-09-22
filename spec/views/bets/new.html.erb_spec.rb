require 'spec_helper'

describe "bets/new" do
  before(:each) do
    assign(:bet, stub_model(Bet,
      :homescore => 1,
      :awayscore => 1,
      :homeodds => "9.99",
      :awayodds => "9.99"
    ).as_new_record)
  end

  it "renders new bet form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form[action=?][method=?]", bets_path, "post" do
      assert_select "input#bet_homescore[name=?]", "bet[homescore]"
      assert_select "input#bet_awayscore[name=?]", "bet[awayscore]"
      assert_select "input#bet_homeodds[name=?]", "bet[homeodds]"
      assert_select "input#bet_awayodds[name=?]", "bet[awayodds]"
    end
  end
end

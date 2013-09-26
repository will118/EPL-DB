require 'spec_helper'

describe "fixtures/edit" do
  before(:each) do
    @fixture = assign(:fixture, stub_model(Fixture,
      :hometeam => "MyString",
      :awayteam => "MyString",
      :competition => "MyString"
    ))
  end

  it "renders the edit fixture form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form[action=?][method=?]", fixture_path(@fixture), "post" do
      assert_select "input#fixture_hometeam[name=?]", "fixture[hometeam]"
      assert_select "input#fixture_awayteam[name=?]", "fixture[awayteam]"
      assert_select "input#fixture_competition[name=?]", "fixture[competition]"
    end
  end
end

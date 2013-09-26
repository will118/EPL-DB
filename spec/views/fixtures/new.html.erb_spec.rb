require 'spec_helper'

describe "fixtures/new" do
  before(:each) do
    assign(:fixture, stub_model(Fixture,
      :hometeam => "MyString",
      :awayteam => "MyString",
      :competition => "MyString"
    ).as_new_record)
  end

  it "renders new fixture form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form[action=?][method=?]", fixtures_path, "post" do
      assert_select "input#fixture_hometeam[name=?]", "fixture[hometeam]"
      assert_select "input#fixture_awayteam[name=?]", "fixture[awayteam]"
      assert_select "input#fixture_competition[name=?]", "fixture[competition]"
    end
  end
end

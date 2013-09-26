require 'spec_helper'

describe "home_xis/edit" do
  before(:each) do
    @home_xi = assign(:home_xi, stub_model(HomeXi,
      :name => "MyString",
      :number => 1,
      :subbed => "MyString"
    ))
  end

  it "renders the edit home_xi form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form[action=?][method=?]", home_xi_path(@home_xi), "post" do
      assert_select "input#home_xi_name[name=?]", "home_xi[name]"
      assert_select "input#home_xi_number[name=?]", "home_xi[number]"
      assert_select "input#home_xi_subbed[name=?]", "home_xi[subbed]"
    end
  end
end

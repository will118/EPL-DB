require 'spec_helper'

describe "articles/index" do
  before(:each) do
    assign(:articles, [
      stub_model(Article,
        :title => "MyText",
        :body => "MyText"
      ),
      stub_model(Article,
        :title => "MyText",
        :body => "MyText"
      )
    ])
  end

  it "renders a list of articles" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "MyText".to_s, :count => 4
    assert_select "tr>td", :text => "MyText".to_s, :count => 4
  end
end

# require 'spec_helper'

# describe "fixtures/index" do
#   before(:each) do
#     assign(:fixtures, [
#       stub_model(Fixture,
#         :hometeam => "Hometeam",
#         :awayteam => "Awayteam",
#         :competition => "Competition"
#       ),
#       stub_model(Fixture,
#         :hometeam => "Hometeam",
#         :awayteam => "Awayteam",
#         :competition => "Competition"
#       )
#     ])
#   end

#   it "renders a list of fixtures" do
#     render
#     # Run the generator again with the --webrat flag if you want to use webrat matchers
#     assert_select "tr>td", :text => "Hometeam".to_s, :count => 2
#     assert_select "tr>td", :text => "Awayteam".to_s, :count => 2
#     assert_select "tr>td", :text => "Competition".to_s, :count => 2
#   end
# end

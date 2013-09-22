require 'spec_helper'

describe Article do
  it "has a valid factory" do
  	expect(create(:article)).to be_valid
end
 context "verifications on model" do
	it "is valid with a title and body" do
		expect(build(:article)).to have(0).errors
	end

	it "is invalid without a title" do
		expect(build(:article, title: nil)).to have(1).errors_on(:title)
	end

	it "is invalid without a text body" do
		expect(build(:article, body: nil)).to have(1).errors_on(:body)
	end

	it "returns errors on title and body with a duplicate info" do
		Article.create(
			title: "Koscielny - Fans are crazy in Marseille",
      body: "Laurent Koscielny says he is looking forward to experiencing the 'crazy' atmosphere at Stade Velodrome on Wednesday evening.
The French defender has fond childhood memories of watching the likes of Chris Waddle and Jean-Pierre Papin representing Marseille.
Koscielny was part of the Arsenal team that beat Marseille when the sides met in the Champions League two seasons ago and is relishing a return to south France.")
		expect(build(:article)).to have(1).errors_on(:body)
		expect(build(:article)).to have(1).errors_on(:title)
	end
	end

end

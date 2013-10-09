require 'spec_helper'

describe Arscom do
 
		context "string cleaning" do
			it "it removes flash player and LOG IN or SIGN UP to watch messages" do
				bb = "Nicklas Bendtner says the birth of his son has had a profound impact on his life and has caused him to \u201Cchange a lot\u201D.\r\nThe Denmark international has spent the previous two seasons out on loan, at Sunderland and Juventus respectively, but is back in the Arsenal squad this term.\r\n\n\n    \n        Bendtner exclusive\n    \n\n    \n    \n\n        \n            \n            \n                Flash Player is required\n                To play video on Arsenal.com, the latest Adobe Flash Player is required.\n                \n            \n        \n\n                    \n                LOG IN or SIGN UP FOR FREE to watch Arsenal Player videos\n            \n        \n    \n\n    \n        Play again\n        \n                    \n    \n\n\n\n\n\r\n\u00A0The 25-year-old believes he is a different person now and puts this down to becoming a father and his experiences away from the Club.\r\n\u201CFirst of all I had a baby, which changed me a lot,\u201D Bendtner told Arsenal Player. \u201CI think a lot of people say that you have babies and they change you but for me I could really feel a big difference to my life.\r\n\u201CBeing abroad showed me a lot of different things and different aspects of how to live and how to cope with problems and things like that. I think that has given me a lot more as a man.\u201D\r\nBendtner insists that the wider perception of him is wrong, and feels that some of his previous statements have been misinterpreted.\r\n\u201CI don't like that I keep getting put up on comments I've made which have been wrongly said - that I still to this day have to see it and listen to it,\u201D he said.\r\n\u201CIf people don't like me, that's fair enough. If people can't accept that sometimes you're young and make mistakes and move on, that's not up to me.\r\n\u201CI try to do my best and that's basically all I can do for my family and my friends and everyone around the Club.\r\n\r\n\r\nBeing abroad showed me a lot of different things and different aspects of how to live and how to cope with problems and things like that\r\nNicklas Bendtner\r\n\r\n\u201CI think every football player wants to achieve the [most] within what he can do. That\u2019s what makes you. If you have a dream and try to do everything you can to be the best that you can, that's you trying to make the best out of your job or what you do.\r\n\u201CI basically said that I think that anybody who plays football in the world would love to be the best. I think that's a normal statement and that got [changed] to me saying that I was the best player in the world.\r\n\u201CI don't know where that came from. I still listen to it now and again and still see it. If people want to believe that, then that's that.\u201D\n                                \n                \n        \tRob Kelly\n        9 Oct 2013\n    \n                \n            "
				expect(bb).to include("Adobe Flash Player", "SIGN UP FOR FREE", "Flash Player is required")
				expect(Arscom.new.body_washer(bb)).to_not include("Adobe Flash Player", "SIGN UP FOR FREE", "Flash Player is required")
			end

			it "removes certain links from the mechanize scrape" do
				arscom = Arscom.new
				array = arscom.links 
				arscom.link_filter
				filtered_array = arscom.links

				expect(filtered_array.length).to be < array.length

			end
		end

		context "object instantiation" do
			it "mechanizes an array of links" do
				arscom = Arscom.new
				links = arscom.links 
				expect(links).to be_kind_of(Array)
				expect(links.length).to be > 5
			end
		end

end

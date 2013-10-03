# aa = ["interception_ot", {"2199"=>{"block"=>1, "interception"=>15, "clearance"=>30, "total"=>46, "date"=>"17/8/2013"}, "2207"=>{"block"=>3, "interception"=>9, "clearance"=>32, "total"=>44, "date"=>"24/8/2013"}, "2221"=>{"block"=>5, "interception"=>19, "clearance"=>42, "total"=>66, "date"=>"1/9/2013"}, "2232"=>{"block"=>6, "interception"=>8, "clearance"=>20, "total"=>34, "date"=>"14/9/2013"}, "2237"=>{"block"=>3, "interception"=>12, "clearance"=>18, "total"=>33, "date"=>"22/9/2013"}, "2253"=>{"block"=>2, "interception"=>20, "clearance"=>18, "total"=>40, "date"=>"28/9/2013"}}]
# zz = ["interception_ot", {"2199"=>{"total"=>19.67, "possesion"=>60.71, "attack"=>115.63, "defence"=>-156.67, "date"=>"17/8/2013"}, "2207"=>{"total"=>370.48, "possesion"=>145.8, "attack"=>205.3, "defence"=>19.37, "date"=>"24/8/2013"}, "2221"=>{"total"=>385.43, "possesion"=>-21.24, "attack"=>90.02, "defence"=>316.65, "date"=>"1/9/2013"}, "2232"=>{"total"=>329.73, "possesion"=>104.99, "attack"=>176.65, "defence"=>48.09, "date"=>"14/9/2013"}, "2237"=>{"total"=>400.31, "possesion"=>86.6, "attack"=>200.63, "defence"=>113.08, "date"=>"22/9/2013"}, "2253"=>{"total"=>235.67, "possesion"=>9.77, "attack"=>140.02, "defence"=>85.88, "date"=>"28/9/2013"}}]
# zid = ["2199", "2207", "2221", "2232", "2237", "2253"] 


# # p aa[1]
# # p aa

# yy = zz[1]
# # p yy

# zid.each do


# 	|key| puts yy[key] 

# end

# bb = aa[1]

# ids = []

# bb.each do |k, v|
# 	ids << k
# end

# # p ids



# # 6.times do |x|
# # 	 puts yy[x]
# # end
require "HTTParty"
require 'json'
	from_date = Time.new.strftime("%Y-%m-%d")
		to_date = "2013-11-22"

		fixtures = "http://api.statsfc.com/premier-league/fixtures.json?key=#{ENV["STATS_KEY"]}&team=arsenal&from=#{from_date}&to=#{to_date}&timezone=Europe/London&limit=5"
# p HTTParty.get(fixtures).response.body


p JSON.parse HTTParty.get("http://polling.bbc.co.uk/sport/shared/football/oppm/json/3643937").response.body.delete('(').delete(');')
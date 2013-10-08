	require_relative "../config/environment"
	require_relative "../config/boot"
	require "pp"
	require "HTTParty"
		  raw = "http://api.statsfc.com/top-scorers.json?key=#{ENV["STATS_KEY"]}&competition=#{ENV["COMP"]}&team=#{ENV["TEAM"]}&year=2013/2014"		
			p ppp = HTTParty.get(raw).response.body


	# 	ppp.each do |hash|
	# 			puts hash['player']
	# 		end
	# 
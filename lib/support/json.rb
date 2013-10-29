def json_get(url)
	JSON.parse HTTParty.get(url).response.body
end
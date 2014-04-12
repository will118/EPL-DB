def json_get(url)
    JSON.parse HTTParty.get(url).response.body
end

def phantom_get(url)
    driver = Selenium::WebDriver.for(:remote, :url => "http://localhost:9134")
    driver.navigate.to (url)
    driver.page_source
end

def nokophantom_get(url)
  Nokogiri::HTML(phantom_get(url))
end


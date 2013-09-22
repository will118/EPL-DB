  require 'nokogiri'  
  require 'open-uri' 
  require "awesome_print"


  
  uri = "http://www.betfair.com/exchange/football/"
 

 
    nokogiri = Nokogiri::HTML(open("#{uri}event?id=27068179")) 
    poko = nokogiri.css('match-score')
    # ap nokogiri
    p poko

    puts nokogiri.xpath('/html/body/div[4]/div[1]/div[2]/div/div[2]/div/div/div/div[1]/div')

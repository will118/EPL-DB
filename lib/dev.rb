
  require 'nokogiri'  
  require 'open-uri'

    BB2= "http://polling.bbc.co.uk/sport/shared/football/oppm/line-up/3643937"
    
    document = Nokogiri::HTML(open(BB2))
      
     ht = document.xpath('//li').map do |player|
        p = player.inner_text.strip.split(' ')
        {name: p[1], number: p[0].to_i, subbed: p[2..4].join}
        end

    hometeam = ht[0..10]

    hometeam.each do |xx|
    homexi = HomeXi.new
    homexi.number = xx[:number] 
    homexi.name = xx[:name] 
    homexi.subbed = xx[:subbed].delete('(') 
    end   
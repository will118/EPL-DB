Premier League Dashboard
====================

![Early days](/ss/1.gif "Love it")
> Pre-Alpha

I wanted marginally relevant information to have on my other/second screen during a match.

That is the "second screen" one-page thing. 

- Live graphs of 4 or 5 metrics.
- League table as it stands
- Our team, their team including subs and when people are subbed off.
- Upcoming fixtures
- Top scorers
- Our recent form, and opponents recent form.
- Stats from previous games

Also scrapes the articles that I want off of Arsenal.com which was a few hours of work.

## Sources:

- Arsenal.com
- Stats FC API
- BBC Sport [Lol](http://www.bbc.co.uk/sport/0/24067715)  
- Squawka/Opta
- FourFourTwo/Opta

> Please don't use this by the way, I feel it's kind of deep already when it's just me.

## Stuff used worth mentioning:

- Rails and Ruby (and Pry. Sweet pry.)
- [Angular.js](http://angularjs.org/)
- [NVD3(D3.js)](https://github.com/novus/nvd3)
- [Nokogiri I like.](http://nokogiri.org/) 
- [Bootstrap](http://getbootstrap.com/)
- [Mike Bostock for actual D3](http://bost.ocks.org/mike/)
- [Shout out to the HTTParty animals](https://github.com/jnunemaker/httparty/)
- [William Playfair](http://en.wikipedia.org/wiki/William_Playfair)

## Dependencies/Requirements/Setup:

> Check the Procfile for how I run it with nginx. And then you will see the clockwork clock being called too. Check that out as well.

- PostgreSQL.
- PhantomJS running GhostDriver (phantomjs --webdriver=9134)
- Pretty sure that's it. 
- Bundle obviously.


#### Arsenal.com scraping

If you check out populater.rake, you will see the Arscom class being used. (check lib/prod for my classes). Grep to delete links I dont want, regex on the inner_text nokogiri then goes and gets.

![Parser](/ss/1.jpg "Nokogiri bit")

#### Stats FC

So while their API is great, I found the docs among the worst even out of the limited APIs I've come across. I think it's because they look so good, you expect them to work. However the actual samples they have are unhelpful because most of them don't work, and return "premier-league" competition could not be found. 

That actually means they need more or less info I can't remember which. I.e. they need "&team=arsenal" appended to the end of their example for "Form" (results of last 5 matches). However returning competition not found is a bit counterintuitive. 

#### BBC Sport

So the situation here is bonafide-ish JSONs and CORS. The JSONs seem to be nested in 1 too many array/hashes so if you're trying to deal with these JSONs for some reason then be sure to check them on a JSON validator. As for my personal use, currently I get/serve a JSON for a possession pie chart, and then also scrape the starting XI's for the match. 

This is tragically hardcoded right now, which is only upsetting because it would be cooler if I started checking for this information in the hour leading up to kickoff. Doesn't seem too hard at all really but its always a slow hour anyway. Some info I've picked up in my travels, BBC uses Opta as their source. Opta send out data everytime play stops. BBC JSON update every 30 seconds. I just hit it every 25-35seconds.

#### Squawka 

Don't really know what to say here, from their placement on Opta's own site and the data they show on their site it seems like they have Opta's data or data as good as. As far as I can tell... I have a few theories and no facts, surely whoever is responsible has been aware from when they first wrote it? 

Maybe I'm missing something but it seems pretty much like an open API. 

![Most of the work](/ss/2.png "Second Screen bit")


### Work in Progress

What I'm doing next, in order (at least in theory):

- Angular + any PL team.

- The live graphs go in the wrong direction, a trivial fix when I'm better. Think this is sorted now but if not then I'm aware..

- I want to move the Fixture.order(:kickoff).first(8) and elsif (time_until < -6650) x.delete business into its own class or module.

> also there's some encoding mismatch I'm guessing it's not UTF, anyway it's from the BBC lineup where it looks fine, then when I scrape it I get stuff like "\u00C3\u0096zil" which gets lost somewhere. I haven't looked into it. (As of Friday 18th October at 4:16pm - I think I've solved this as was because the model was string rather than text and I remember reading recently that 255 in string and way more in text. I'm guessing because its a UTF world rails/AR had to make it comply to store). As of Saturday I still have this problem so we will have to see...


### Tests

Done:
- RSpec unit tests on models and lib.
- Cuke/Capybara on both pages, with @javascript
- Jasmine for secondscreen.js

Coverage:
- It's slipping slightly as I delve into Angular but will get back to 100% as soon as I know what I'm doing.

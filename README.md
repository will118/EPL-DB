Premier League Dashboard
====================

![Early days](/ss/1.gif "Love it")
> Alpha

I wanted marginally relevant information to have on my other/second screen during a match.

Like a "second screen" single page app, Devise/OAuth(GitHub) login and I plan to add customisable aspects

- Live graphs of 4 or 5 metrics.
- League table as it stands
- Our team, their team including subs and when people are subbed off.
- Upcoming fixtures
- Top scorers
- Our recent form, and opponents recent form.
- Stats from previous games

## Sources:

- BBC Sport [Lol](http://www.bbc.co.uk/sport/0/24067715)  
- Squawka/Opta
- FourFourTwo/Opta
- Stats FC API

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
- GitHub OAuth
- [Tim Snell's](http://www.testmeat.co.uk/extra/1192/stadium-love) photo of the Emirates.

## Dependencies/Requirements/Setup:

> Check the Procfile.dev for how I run it locally. And then you will see the clockwork clock being called too. Check that out as well.

- PostgreSQL.
- PhantomJS running GhostDriver (phantomjs --webdriver=9134)
- Pretty sure that's it. 
- Bundle obviously.

#### BBC Sport

So the situation here is bonafide-ish JSONs and CORS. The JSONs seem to be nested in 1 too many array/hashes so if you're trying to deal with these JSONs for some reason then be sure to check them on a JSON validator. As for my personal use, this is where all the magic comes from. Or at least most of the live data. I have a few different methods of scraping stuff off of the BBC, I think they're kind of cool (check lib/prod/BBC.rb). 

#### Stats FC

So while their API is great, I found the docs among the worst even out of the limited APIs I've come across. I think it's because they look so good, you expect them to work. However the actual samples they have are unhelpful because most of them don't work, and return "premier-league" competition could not be found. 200ms+ response times too I'd say but that's just annecdotal. Happy customer still.

That actually means they need more or less info I can't remember which. I.e. they need "&team=arsenal" appended to the end of their example for "Form" (results of last 5 matches). However returning competition not found is a bit counterintuitive. 

#### Squawka 

Don't really know what to say here, from their placement on Opta's own site and the data they show on their site it seems like they have Opta's data or data as good as. As far as I can tell... I have a few theories and no facts, surely whoever is responsible has been aware from when they first wrote it? 

Maybe I'm missing something but it seems pretty much like an open API. 

### Work in Progress

What I'm doing next, in order (at least in theory):

- Angular/Front End

> also there's some encoding mismatch I'm guessing it's not UTF, anyway it's from the BBC lineup where it looks fine, then when I scrape it I get stuff like "\u00C3\u0096zil" which gets lost somewhere. I haven't looked into it. (As of Friday 18th October at 4:16pm I think I've solved this as was because the model was string rather than text and I remember reading recently that 255 in string and way more in text. I'm guessing because its a UTF world rails/AR had to make it comply to store). As of Saturday I still have this problem so we will have to see... As of Wednesday night I still don't know at which point it happens, pretty sure it's Nokogiri but surely it can't be.

### Tests

Coverage:
- It's slipping slightly as I delve into Angular but will get back to 100% as soon as I know what I'm doing.
- It has now slipped as I've removed all the deprecated tests from earlier iterations.

Goals:
- RSpec unit tests on models and lib. 
- Capybara integration tests.
- Jasmine or Karma for the Angular app.

Premier League Dashboard
====================

![Early days](/ss/1.gif "Love it")

I wanted marginally relevant information to have on my other/second screen during a match.

## Features

- Customizeable dashboard.
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

So the situation here is bonafide-ish JSONs and CORS. The JSONs seem to be nested in 1 too many array/hashes so if you're trying to deal with these JSONs for some reason then be sure to check them on a JSON validator. As for my personal use, this is where all the magic comes from. Or at least most of the live data. The BBCGetter and BBCRecorder classes are managed by the MatchManager.

#### Stats FC

So while their API is great, I found the docs among the worst even out of the limited APIs I've come across. I think it's because they look so good, you expect them to work. However the actual samples they have are unhelpful because most of them don't work, and return "premier-league" competition could not be found. 200ms+ response times too I'd say but that's just annecdotal. Happy customer still.

That actually means they need more or less info I can't remember which. I.e. they need "&team=arsenal" appended to the end of their example for "Form" (results of last 5 matches). However returning competition not found is a bit counterintuitive. 

#### Squawka 

Don't really know what to say here, from their placement on Opta's own site and the data they show on their site it seems like they have Opta's data or data as good as. As far as I can tell... I have a few theories and no facts, surely whoever is responsible has been aware from when they first wrote it? 

Maybe I'm missing something but it seems pretty much like an open API. 

### Work in Progress

What I'm doing next, in order:

- Refactoring
- Angular/Front End
- Tests

### Tests

Coverage:
- RSpec ~90%
- Karma Unit 0%
- Karma E2E 0%

Goals:
- RSpec unit tests for Rails side.
- Karma for the Angular side. E2E and Unit.

Info:
> rspec
> karma start
> ./selenium/start
> protractor jasmine/e2e/config.js
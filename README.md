Premier League Dashboard
====================

![Img](/ss/1.png "That's a blurry emirates")

[Demo here](http://epldb.co.uk)

I wanted marginally relevant information to have on my other/second screen during a match, but also learn Angular etc.

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
- [NV directives](https://github.com/cmaurer/angularjs-nvd3-directives)
- [Mike Bostock for actual D3](http://bost.ocks.org/mike/)
- [Nokogiri I like.](http://nokogiri.org/)
- [Bootstrap](http://getbootstrap.com/)
- [Shout out to the HTTParty animals](https://github.com/jnunemaker/httparty/)
- [William Playfair](http://en.wikipedia.org/wiki/William_Playfair)

## Dependencies/Requirements/Setup:

> Check the Procfile.dev for how I run it locally. And then you will see the clockwork clock being called too. Check that out as well.

- PostgreSQL, I don't think I'm using any specific features though.
- Redis on default port.
- PhantomJS running GhostDriver (phantomjs --webdriver=9134)
- Pretty sure that's it.
- Bundle obviously.

#### BBC Sport

So the situation here is bonafide-ish JSONs and CORS. The JSONs seem to be nested in 1 too many array/hashes so if you're trying to deal with these JSONs for some reason then be sure to check them on a JSON validator. As for my personal use, this is where all the magic comes from. Or at least most of the live data. The BBCGetter and BBCRecorder classes are managed by the MatchManager.

#### Stats FC

So while their API is great, docs were a bit confusing at first. 100-200ms+ response times too I'd say but that's just annecdotal. Happy customer still.

#### Squawka

Don't really know what to say here, from their placement on Opta's own site and the data they show on their site it seems like they have Opta's data or data as good as. As far as I can tell... I have a few theories and no facts, surely whoever is responsible has been aware from when they first wrote it? Maybe I'm missing something but it seems pretty much like an open API.

This data has never been that useful but its quite nice to quickly compare recent form vaguely..

### Work in Progress

What I'm doing next, in order:

- Refactoring
- Angular/Front End
- Tests

### Tests

Coverage:
- RSpec ~95%
- Karma Unit ~40%
- Karma E2E ~70%

Info:
- rspec
- karma start
- ./selenium/start
- protractor jasmine/e2e/config.js

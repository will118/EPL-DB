Parsenal
====================

### An assortment of Arsenal parsers


Basically, scrapes articles I want off of Arsenal.com which was a few hours of work.

Then where most of the work is the "second screen" one-page thing. 

I wanted marginally relevant information to have on my other/second screen during a match.

- League table as it stands
- Our team, their team including subs and when people are subbed off.
- Next 4 matches
- Our recent form, and opponents recent form.
- Co-opted a quantity of data from Opta (indirectly) to plug into D3 graph front and center.

## Sources:

- Arsenal.com
- Stats FC API
- BBC Sport [Lol](http://www.bbc.co.uk/sport/0/24067715)  
- Squawka/Opta
- FourFourTwo/Opta


> Please don't use this by the way, I feel it's kind of deep already when it's just me.
> rake populater:all is the scraper though  

## Stuff used worth mentioning:

- [Underscore.js](http://underscorejs.org/)
- [NVD3(D3.js)](https://github.com/novus/nvd3)
- [Mike Bostock for actual D3](http://bost.ocks.org/mike/)
- [Shout out to the HTTParty animals](https://github.com/jnunemaker/httparty/)
- [Nokogiri I like.](http://nokogiri.org/) 
- [Foundation too, I haven't really shown its awesome though.](http://foundation.zurb.com/)
- [William Playfair](http://en.wikipedia.org/wiki/William_Playfair)
- Rails and Ruby. I suppose JS/jQuery but I can't pretend the love affair is even close.

## Dependencies/Requirements:

- PostgreSQL.
- Pretty sure that's it. 
- Bundle obviously.


#### Arsenal.com scraping

If you check out populater.rake, the "arscom" task here is a mechanize/nokogiri scraper that is probably better explained by my proceedural ruby... Grep to delete links I dont want, regex on the inner_text nokogiri then goes and gets.

![Parser](/ss/1.jpg "Nokogiri bit")

#### Stats FC

So while their API is great, I found the docs among the worst even out of the limited APIs I've come across. I think its because they look so good, you expect them to work. However the actual samples they have are unhelpful because most of them don't work, and return "premier-league" competition could not be found. 

That actually means they need more or less info I can't remember which. I.e. they need "&team=arsenal" appended to the end of their example for "Form" (results of last 5 matches). However returning competition not found is a bit counterintuitive. 

#### BBC Sport

So the situation here is bonafide-ish JSONs and CORS. The JSONs seem to be nested in 1 too many array/hashes so if you're trying to deal with these JSONs for some reason then be sure to check them on a JSON validator. As for my personal use, currently I get/serve a JSON for a possession pie chart, and then also scrape the starting XI's for the match. 

This is tragically hardcoded right now, which is only upsetting because it would be cooler if I started checking for this information in the hour leading up to kickoff. Doesn't seem too hard at all really but its always a slow hour anyway and I want to get my live/real-time/dynamic D3 graphs working first because that's actually useful. I'm planning on using the BBC for this data too, their JS gets updates every 30seconds which would mean a minimum of 180 data points per match I think that's fine to be honest. 

#### Squawka 

Don't really know what to say here, from their placement on Opta's own site and the data they show on their site it seems like they have Opta's data or data as good as. As far as I can tell... I have a few theories and no facts, the only thing I can say with any certainty is that whoever is responsible has been aware from when they first wrote it. 

Maybe I'm missing something but it seems pretty much like an open API. 

![Most of the work](/ss/2.jpg "Second Screen bit")

## Work in Progress

I've pretty much just detailed what has been done and hinted at plans. I'm only githubbing now cus I was quite impressed with my first ultran00b foray into regex this just now and it got the original scraper looking quite good. (Not behind the scenes I'm sure)

### Todo

Anyway what I'm doing next, in order (at least in theory):

Live D3js graphs of:
- Shots on target of both teams
- Possession % of both teams
- Corners
- Cards/tackles
- Nothing seems as good on paper as it does in my head.
- Also there's some encoding mismatch I'm guessing it's not UTF, anyway it's from the BBC lineup where it looks fine, then when I scrape it I get stuff like "\u00C3\u0096zil" which gets lost somewhere. I haven't looked into it.

Also bear in mind that from the get-go this has been a one page site, by one guy, intended for the same guy. It's like the volcanic springs of code smell.

### Tests..

Under development, seriously... As in actually seriously not sarcastic. 

As soon as I have the last of the JS polished/done I will finish the RSpec and Capycumbers with Selenium, don't think I'll bother with PhantomJS although it's very cool. 
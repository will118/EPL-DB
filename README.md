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
- BBC Sport  
- Squawka...

> Please don't use this by the way, I feel it's kind of deep already when it's just me. 

## Stuff used worth mentioning:

- [NVD3(D3.js)](https://github.com/novus/nvd3)
- [Shout out to the HTTParty animals](https://github.com/jnunemaker/httparty/)
- Nokogiri I like. 
- Foundation too, I haven't really shown its awesome though.

## Dependencies/Requirements:

- PostgreSQL.
- Pretty sure that's it. 
- Bundle obviously.

## Tests..

Under development, seriously... As in actually seriously not sarcastic. 

As soon as I have the last of the JS polished/done I will finish the RSpec and Capycumbers with Selenium, don't think I'll bother with PhantomJS although it's very cool. 

#### Arsenal.com scraping

If you check out populater.rake, the "arscom" task here is a mechanize/nokogiri scraper that is probably better explained by my proceedural ruby... Grep to delete links I dont want, regex on the inner_text nokogiri then goes and gets.

#### Stats FC

So while their API is great, I found the docs among the worst even out of the limited APIs I've come across. I think its because they look so good, you expect them to work. However the actual samples they have are unhelpful because most of them don't work, and return "premier-league" competition could not be found. 

That actually means they need more or less info I can't remember which. I.e. they need "&team=arsenal" appended to the end of their example for "Form" (results of last 5 matches). However returning competition not found is a bit counterintuitive. 

#### BBC Sport

So the situation here is bonafide-ish JSONs and CORS. The JSONs seem to be nested in 1 too many array/hashes so if you're trying to deal with these JSONs for some reason. One sec I'm just going to try embed pictures in GH md.
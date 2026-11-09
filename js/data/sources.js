// The article behind each source cited on a page, so CH 10 (Mga Sanggunian) can link straight to it.
// Keys are "channel/episode" or "channel/episode/part"; each entry is [label as cited, URL, article title].
// A cited source with no entry here has no public link we could confirm, and is listed as plain text.
export const SOURCE_LINKS = {
  "01/love-teams": [
    ["PEP.PH (NOV 26, 2021)", "https://www.pep.ph/news/local/162258/john-lloyd-cruz-bea-alonzo-box-office-hit-movies-a4995-20211126", "John Lloyd Cruz and Bea Alonzo's box-office hit movies"],
    ["WIKIPEDIA (ONE MORE CHANCE, 2007 FILM)", "https://en.wikipedia.org/wiki/One_More_Chance_(2007_film)", "One More Chance (2007 film)"],
  ],
  "01/filipino-pride": [
    ["AP", "https://archives-new.honoluluadvertiser.com/article/2008/Dec/07/br/hawaii81207013.html", "Filipinos exult in Pacquiao's win over De La Hoya"],
    ["REUTERS", "https://reuters.screenocean.com/record/375362", "Philippines' Pacquiao wins record 7th world title (Reuters video)"],
    ["PHILSTAR", "https://philstar.com/headlines/2008/12/08/421875/rp-pauses-dream-match", "RP pauses for Dream Match"],
  ],
  "01/filipino-pride/de-la-hoya": [
    ["AP", "https://archives-new.honoluluadvertiser.com/article/2008/Dec/07/br/hawaii81207013.html", "Filipinos exult in Pacquiao's win over De La Hoya"],
    ["PHILSTAR", "https://philstar.com/headlines/2008/12/08/421875/rp-pauses-dream-match", "RP pauses for Dream Match"],
  ],
  "01/filipino-pride/hatton": [
    ["MALACANANG PROCLAMATION NO. 1764", "https://lawphil.net/executive/proc/proc2009/proc_1764_2009.html", "Proclamation No. 1764, s. 2009"],
    ["AFP", "https://thehimalayantimes.com/ampArticle/72410", "Filipinos ecstatic over Pacquiao's win (AFP)"],
    ["GMA NEWS", "https://www.gmanetwork.com/news/sports/content/159696/rp-rejoices-over-pacquiao-victory/story", "RP rejoices over Pacquiao victory"],
    ["GMA NEWS", "https://www.gmanetwork.com/news/topstories/nation/159961/may-8-a-national-day-in-honor-of-pacquiao/story", "May 8 a national day in honor of Pacquiao"],
  ],
  "01/filipino-pride/cotto": [
    ["AP", "https://archives-new.honoluluadvertiser.com/article/2009/Nov/15/br/hawaii91114067.html", "Philippines celebrate Pacquiao despite disasters"],
    ["REUTERS", "https://reuters.screenocean.com/record/375362", "Philippines' Pacquiao wins record 7th world title (Reuters video)"],
    ["VISAYAN DAILY STAR", "https://archives.visayandailystar.com/2009/November/16/topstory2.htm", "Brings joy back to Brgy 19"],
  ],
  "01/opm-bands": [
    ["WIKIPEDIA", "https://en.wikipedia.org/wiki/Myx_Music_Awards_2006", "Myx Music Awards 2006"],
    ["PEP", "https://www.pep.ph/news/local/18953/updated-eraserheads-reunion-concert-cut-short-more-than-60000-people-in-attendance", "Eraserheads reunion concert cut short; more than 60,000 people in attendance"],
    ["PHILSTAR", "https://philstar.com/entertainment/2006/06/09/340808/cuesheacute-rivermaya-rachelle-ann-top-myx-awards", "Cueshé, Rivermaya, Rachelle Ann top MYX Awards"],
    ["KHALEEJ TIMES", "https://www.khaleejtimes.com/entertainment/for-cueshe-its-the-music-that-matters", "For Cueshe, it's the music that matters"],
  ],
  "01/opm-bands/hale": [
    ["WIKIPEDIA", "https://en.wikipedia.org/wiki/Hale_(band)", "Hale (band)"],
    ["MYX HIT CHART MIRROR", "http://wikibin.org/articles/myx-hit-chart.html", "MYX Hit Chart (archived chart history)"],
    ["WISH 107.5", "https://www.youtube.com/watch?v=lcnPPah8tMg", "Hale performs \"The Day You Said Goodnight\" live on the Wish 107.5 Bus"],
  ],
  "01/opm-bands/cueshe": [
    ["WIKIPEDIA", "https://en.wikipedia.org/wiki/Cuesh%C3%A9", "Cueshé"],
    ["PHILSTAR", "https://philstar.com/cebu-entertainment/2005/07/23/287863/story-cuesh", "The story of Cueshé (The Freeman, 2005)"],
    ["KHALEEJ TIMES", "https://www.khaleejtimes.com/entertainment/for-cueshe-its-the-music-that-matters", "For Cueshe, it's the music that matters"],
    ["MYX HIT CHART MIRROR", "http://wikibin.org/articles/myx-hit-chart.html", "MYX Hit Chart (archived chart history)"],
  ],
  "01/opm-bands/eraserheads": [
    ["PEP", "https://www.pep.ph/news/local/18953/updated-eraserheads-reunion-concert-cut-short-more-than-60000-people-in-attendance", "Eraserheads reunion concert cut short; more than 60,000 people in attendance"],
    ["PHILSTAR", "https://philstar.com/entertainment/2009/03/11/447133/resurrection-ecstasy", "Resurrection ecstasy (The Final Set, 2009)"],
    ["GMA NEWS", "https://www.gmanetwork.com/news/showbiz/content/151843/e-heads-pay-tribute-to-francis-m-at-last-concert/story", "E-Heads pay tribute to Francis M at last concert"],
    ["WIKIPEDIA", "https://en.wikipedia.org/wiki/Eraserheads:_The_Reunion_Concert_08.30.08", "Eraserheads: The Reunion Concert 08.30.08"],
  ],
  "01/cory-aquino": [
    ["GMA NEWS", "https://gmanetwork.com/news/topstories/nation/168834/filipinos-form-long-queues-to-pay-last-respects-to-cory/story", "Filipinos form long queues to pay last respects to Cory"],
    ["AP", "https://www2.ljworld.com/news/2009/aug/02/filipinos-set-aside-divisions-honor-ex-president/", "Filipinos set aside divisions to honor ex-president"],
    ["REUTERS", "https://www.stabroeknews.com/2009/08/06/news/guyana/filipinos-bid-goodbye-to-ex-leader-aquino/", "Filipinos bid goodbye to ex-leader Aquino (Reuters)"],
    ["VERA FILES", "https://verafiles.org/articles/cory-dies-10-day-national-mourning-set", "Cory dies; 10-day national mourning set"],
  ],
  "01/cory-aquino/the-wake": [
    ["GMA NEWS", "https://gmanetwork.com/news/topstories/nation/168834/filipinos-form-long-queues-to-pay-last-respects-to-cory/story", "Filipinos form long queues to pay last respects to Cory"],
    ["REUTERS", "https://reuters.screenocean.com/record/534618", "Remains of former President Corazon Aquino brought to a cathedral (Reuters video)"],
    ["BULATLAT", "https://www.bulatlat.com/2009/08/05/paying-tribute-to-cory-who-united-filipinos/", "Paying tribute to Cory, who united Filipinos"],
    ["AP", "https://www2.ljworld.com/news/2009/aug/02/filipinos-set-aside-divisions-honor-ex-president/", "Filipinos set aside divisions to honor ex-president"],
  ],
  "01/cory-aquino/yellow-confetti": [
    ["VERA FILES", "https://verafiles.org/articles/yellow-confetti-back-in-makati-for-cory", "Yellow confetti back in Makati for Cory"],
    ["VOA", "https://www.voanews.com/a/a-13-2009-08-03-voa11-68805462/412411.html", "Thousands gather for former Philippine president"],
    ["THE NATIONAL", "https://www.thenationalnews.com/world/asia/masses-gather-for-aquino-cortege-1.567608", "Masses gather for Aquino cortege"],
    ["WIKIPEDIA", "https://en.wikipedia.org/wiki/Death_and_funeral_of_Corazon_Aquino", "Death and funeral of Corazon Aquino"],
  ],
  "01/cory-aquino/the-long-goodbye": [
    ["AP", "https://archives.lincolndailynews.com/2009/Aug/05/News/other080509_s.shtml", "Aquino laid to rest, hailed as moral leader"],
    ["REUTERS", "https://www.stabroeknews.com/2009/08/06/news/guyana/filipinos-bid-goodbye-to-ex-leader-aquino/", "Filipinos bid goodbye to ex-leader Aquino (Reuters)"],
    ["ASIA SOCIETY", "https://asiasociety.org/node/14144", "Goodbye, Cory: Filipinos mourn former President Aquino"],
    ["VISAYAN DAILY STAR", "https://archives.visayandailystar.com/2009/August/06/topstory1.htm", "Bacolod drivers stage send-off, too"],
  ],
  "02/text-unli": [
    ["PHILSTAR (MAY 15, 2001)", "https://www.philstar.com/lifestyle/business-life/2001/05/15/85823/philippine-text-messaging-phenomenon", "The Philippine text messaging phenomenon"],
    ["PHILSTAR (DEC 20, 2008)", "https://www.philstar.com/business/telecoms/2008/12/20/424983/top-mobile-phones-2008", "The top mobile phones of 2008"],
  ],
  "02/text-unli/p1-a-text": [
    ["PHILSTAR (MAY 15, 2001)", "https://www.philstar.com/lifestyle/business-life/2001/05/15/85823/philippine-text-messaging-phenomenon", "The Philippine text messaging phenomenon"],
  ],
  "02/text-unli/keypad-to-tap": [
    ["PHILSTAR (DEC 20, 2008)", "https://www.philstar.com/business/telecoms/2008/12/20/424983/top-mobile-phones-2008", "The top mobile phones of 2008"],
  ],
  "02/pocket-soundtrack": [
    ["MACWORLD IPOD TIMELINE", "https://www.macworld.com/article/1053499/ipodtimeline.html", "The iPod timeline"],
    ["PHILSTAR (DEC 2008)", "https://www.philstar.com/business/telecoms/2008/12/20/424983/top-mobile-phones-2008", "The top mobile phones of 2008"],
    ["GMA NEWS", "https://www.gmanetwork.com/news/scitech/technology/245195/legit-music-downloads-for-just-p20-at-mymusic-store-philippines/story", "Legit music downloads for just P20 at MyMusic Store Philippines"],
  ],
  "02/pocket-soundtrack/1000-songs": [
    ["MACWORLD IPOD TIMELINE", "https://www.macworld.com/article/1053499/ipodtimeline.html", "The iPod timeline"],
  ],
  "02/pocket-soundtrack/the-playlist-era": [
    ["GMA NEWS (2012)", "https://www.gmanetwork.com/news/scitech/technology/245195/legit-music-downloads-for-just-p20-at-mymusic-store-philippines/story", "Legit music downloads for just P20 at MyMusic Store Philippines"],
  ],
  "02/pocket-soundtrack/phone-becomes-the-player": [
    ["MACWORLD", "https://www.macworld.com/article/1053499/ipodtimeline.html", "The iPod timeline (iPod touch, 2007)"],
    ["PHILSTAR (DEC 2008)", "https://www.philstar.com/business/telecoms/2008/12/20/424983/top-mobile-phones-2008", "The top mobile phones of 2008"],
    ["A BUGGED LIFE (2008)", "https://abuggedlife.com/?p=2671", "Nokia 5800 XpressMusic review in the Philippines"],
  ],
  "02/beyond-free-tv": [
    ["WIKIPEDIA (SKY CABLE, DESTINY CABLE)", "https://en.wikipedia.org/wiki/Sky_Cable_Corporation", "Sky Cable Corporation"],
    ["WIKIPEDIA (SKY CABLE, DESTINY CABLE)", "https://en.wikipedia.org/wiki/Destiny_Cable", "Destiny Cable"],
    ["IIPA SPECIAL 301 REPORT ON THE PHILIPPINES (2005)", "https://www.iipa.org/files/uploads/2017/12/2005SPEC301PHILIPPINES.pdf", "IIPA 2005 Special 301 Report: Philippines (PDF)"],
    ["AMAUTEURISH (2023)", "https://amauteurish.com/2023/03/11/condemned-property-video-piracy-as-nationalist-resistance-in-the-philippines/", "Condemned Property: Video piracy as a form of nationalist resistance"],
    ["MEDIACOMMONS", "https://mediacommons.org/imr/node/1315", "DVD piracy and cultural production in Manila"],
  ],
  "02/beyond-free-tv/cable-takes-over": [
    ["WIKIPEDIA (SKY CABLE, DESTINY CABLE)", "https://en.wikipedia.org/wiki/Sky_Cable_Corporation", "Sky Cable Corporation"],
    ["WIKIPEDIA (SKY CABLE, DESTINY CABLE)", "https://en.wikipedia.org/wiki/Destiny_Cable", "Destiny Cable"],
  ],
  "02/beyond-free-tv/dibidi-nights": [
    ["IIPA SPECIAL 301 REPORT (2005)", "https://www.iipa.org/files/uploads/2017/12/2005SPEC301PHILIPPINES.pdf", "IIPA 2005 Special 301 Report: Philippines (PDF)"],
    ["AMAUTEURISH (2023)", "https://amauteurish.com/2023/03/11/condemned-property-video-piracy-as-nationalist-resistance-in-the-philippines/", "Condemned Property: Video piracy as a form of nationalist resistance"],
    ["MEDIACOMMONS", "https://mediacommons.org/imr/node/1315", "DVD piracy and cultural production in Manila"],
  ],
  "02/beyond-free-tv/the-crackdown": [
    ["IIPA SPECIAL 301 REPORT ON THE PHILIPPINES (2005)", "https://www.iipa.org/files/uploads/2017/12/2005SPEC301PHILIPPINES.pdf", "IIPA 2005 Special 301 Report: Philippines (PDF)"],
    ["MEDIACOMMONS", "https://mediacommons.org/imr/node/1315", "DVD piracy and cultural production in Manila"],
  ],
  "02/click-upload-watch": [
    ["WIKIPEDIA (ME AT THE ZOO)", "https://en.wikipedia.org/wiki/Me_at_the_zoo", "Me at the zoo"],
    ["NPR (2012)", "https://www.npr.org/2012/06/19/155349191/silverdocs-how-journey-found-a-new-lead-singer-and-made-friends-in-manila", "How Journey found a new lead singer and made friends in Manila"],
    ["GLOBAL VOICES (2011)", "https://globalvoices.org/2011/05/02/philippines-goodbye-friendster/", "Philippines: Goodbye, Friendster"],
    ["TECHCRUNCH (NOV 2007)", "https://techcrunch.com/2007/11/07/multiply-big-in-the-philippines-lands-ad-deal/", "Multiply big in the Philippines, lands ad deal"],
    ["INQUIRER TECHNOLOGY (2011)", "https://technology.inquirer.net/?p=5395", "YouTube Philippines launched"],
  ],
  "02/click-upload-watch/broadcast-yourself": [
    ["WIKIPEDIA (ME AT THE ZOO)", "https://en.wikipedia.org/wiki/Me_at_the_zoo", "Me at the zoo"],
    ["INQUIRER TECHNOLOGY (2011)", "https://technology.inquirer.net/?p=5395", "YouTube Philippines launched"],
  ],
  "02/click-upload-watch/found-on-youtube": [
    ["NPR (2012)", "https://www.npr.org/2012/06/19/155349191/silverdocs-how-journey-found-a-new-lead-singer-and-made-friends-in-manila", "How Journey found a new lead singer and made friends in Manila"],
  ],
  "02/click-upload-watch/photos-online": [
    ["GLOBAL VOICES (2011)", "https://globalvoices.org/2011/05/02/philippines-goodbye-friendster/", "Philippines: Goodbye, Friendster"],
    ["TECHCRUNCH (NOV 2007)", "https://techcrunch.com/2007/11/07/multiply-big-in-the-philippines-lands-ad-deal/", "Multiply big in the Philippines, lands ad deal"],
  ],
  "03/western-waves": [
    ["LINKINPEDIA", "https://linkinpedia.com/wiki/Live:20040615", "Linkin Park live, June 15, 2004, Manila"],
    ["WIKIPEDIA (AVRIL LAVIGNE TOURS; MTV PHILIPPINES 1992-2010)", "https://en.wikipedia.org/wiki/List_of_Avril_Lavigne_concert_tours", "List of Avril Lavigne concert tours"],
    ["WIKIPEDIA (AVRIL LAVIGNE TOURS; MTV PHILIPPINES 1992-2010)", "https://en.wikipedia.org/wiki/MTV_(Philippines,_1992%E2%80%932010)", "MTV (Philippines, 1992–2010)"],
    ["PHILSTAR (JULY 29, 2009)", "https://www.philstar.com/entertainment/2009/07/29/490764/harry-potter-franchise-hits-p1-billion-mark-rp", "Harry Potter franchise hits P1 billion mark in RP"],
  ],
  "03/western-waves/live-in-manila": [
    ["LINKINPEDIA", "https://linkinpedia.com/wiki/Live:20040615", "Linkin Park live, June 15, 2004, Manila"],
    ["WIKIPEDIA (AVRIL LAVIGNE TOURS)", "https://en.wikipedia.org/wiki/List_of_Avril_Lavigne_concert_tours", "List of Avril Lavigne concert tours"],
  ],
  "03/western-waves/mtv-on-channel-41": [
    ["WIKIPEDIA (MTV PHILIPPINES 1992-2010)", "https://en.wikipedia.org/wiki/MTV_(Philippines,_1992%E2%80%932010)", "MTV (Philippines, 1992–2010)"],
  ],
  "03/western-waves/box-office-magic": [
    ["PHILSTAR (JULY 29, 2009)", "https://www.philstar.com/entertainment/2009/07/29/490764/harry-potter-franchise-hits-p1-billion-mark-rp", "Harry Potter franchise hits P1 billion mark in RP"],
  ],
  "03/dubbed-and-delivered": [
    ["PEP.PH", "https://www.pep.ph/guide/tv/27044/10-things-you-might-not-know-about-the-original-meteor-garden", "10 things you might not know about the original Meteor Garden"],
    ["PLARIDEL JOURNAL (2004)", "https://www.plarideljournal.org/wp-content/uploads/2015/10/2004-02-Sales.pdf", "Plaridel Journal, 2004: study of the Meteor Garden dub (PDF)"],
    ["WIKIPEDIA (SOUTH KOREAN TV DRAMAS IN THE PHILIPPINES; HERO TV)", "https://en.wikipedia.org/wiki/South_Korean_television_dramas_in_the_Philippines", "South Korean television dramas in the Philippines"],
    ["WIKIPEDIA (SOUTH KOREAN TV DRAMAS IN THE PHILIPPINES; HERO TV)", "https://en.wikipedia.org/wiki/Hero_(TV_channel)", "Hero (TV channel)"],
  ],
  "03/dubbed-and-delivered/meteor-fever": [
    ["PEP.PH", "https://www.pep.ph/guide/tv/27044/10-things-you-might-not-know-about-the-original-meteor-garden", "10 things you might not know about the original Meteor Garden"],
    ["PLARIDEL JOURNAL (2004)", "https://www.plarideljournal.org/wp-content/uploads/2015/10/2004-02-Sales.pdf", "Plaridel Journal, 2004: study of the Meteor Garden dub (PDF)"],
  ],
  "03/dubbed-and-delivered/koreanovela-nights": [
    ["WIKIPEDIA (SOUTH KOREAN TV DRAMAS IN THE PHILIPPINES)", "https://en.wikipedia.org/wiki/South_Korean_television_dramas_in_the_Philippines", "South Korean television dramas in the Philippines"],
  ],
  "03/dubbed-and-delivered/the-filipino-voice": [
    ["WIKIPEDIA (HERO TV)", "https://en.wikipedia.org/wiki/Hero_(TV_channel)", "Hero (TV channel)"],
    ["PLARIDEL JOURNAL (2004)", "https://www.plarideljournal.org/wp-content/uploads/2015/10/2004-02-Sales.pdf", "Plaridel Journal, 2004: study of the Meteor Garden dub (PDF)"],
  ],
  "03/hallyu-rising": [
    ["THE KOREA TIMES (SEPT 6, 2009)", "https://www.koreatimes.co.kr/amp/southkorea/20090906/filipinos-get-hooked-on-k-pop-craze", "Filipinos get hooked on K-pop craze"],
    ["PHILSTAR (NOV 15, 2009)", "https://www.philstar.com/entertainment/2009/11/15/523175/korean-pop-invasion", "Korean pop invasion"],
    ["WIKIPEDIA (SANDARA PARK; SORRY, SORRY)", "https://en.wikipedia.org/wiki/Sandara_Park", "Sandara Park"],
    ["WIKIPEDIA (SANDARA PARK; SORRY, SORRY)", "https://en.wikipedia.org/wiki/Sorry,_Sorry_(album)", "Sorry, Sorry (album)"],
  ],
  "03/hallyu-rising/krung-krung-to-2ne1": [
    ["WIKIPEDIA (SANDARA PARK)", "https://en.wikipedia.org/wiki/Sandara_Park", "Sandara Park"],
    ["THE KOREA TIMES (SEPT 6, 2009)", "https://www.koreatimes.co.kr/amp/southkorea/20090906/filipinos-get-hooked-on-k-pop-craze", "Filipinos get hooked on K-pop craze"],
    ["PHILSTAR (NOV 15, 2009)", "https://www.philstar.com/entertainment/2009/11/15/523175/korean-pop-invasion", "Korean pop invasion"],
  ],
  "03/hallyu-rising/sorry-sorry-on-myx": [
    ["THE KOREA TIMES (SEPT 6, 2009)", "https://www.koreatimes.co.kr/amp/southkorea/20090906/filipinos-get-hooked-on-k-pop-craze", "Filipinos get hooked on K-pop craze"],
    ["PHILSTAR (NOV 15, 2009)", "https://www.philstar.com/entertainment/2009/11/15/523175/korean-pop-invasion", "Korean pop invasion"],
    ["WIKIPEDIA (SORRY, SORRY)", "https://en.wikipedia.org/wiki/Sorry,_Sorry_(album)", "Sorry, Sorry (album)"],
  ],
  "03/hallyu-rising/fan-clubs-and-dance-covers": [
    ["THE KOREA TIMES (SEPT 6, 2009)", "https://www.koreatimes.co.kr/amp/southkorea/20090906/filipinos-get-hooked-on-k-pop-craze", "Filipinos get hooked on K-pop craze"],
    ["WIKIPEDIA (SORRY, SORRY)", "https://en.wikipedia.org/wiki/Sorry,_Sorry_(Super_Junior_song)", "Sorry, Sorry (Super Junior song)"],
  ],
  "03/courtside-and-counter": [
    ["ASSOCIATED PRESS VIA HONOLULU ADVERTISER (JULY 21, 2009)", "https://archives-new.honoluluadvertiser.com/article/2009/Jul/21/br/hawaii90721037.html", "Kobe visits Manila in opening stop on Asian tour"],
    ["WIKIPEDIA (MCDONALD'S PHILIPPINES; JOLLIBEE GROUP)", "https://en.wikipedia.org/wiki/McDonald%27s_Philippines", "McDonald's Philippines"],
    ["WIKIPEDIA (MCDONALD'S PHILIPPINES; JOLLIBEE GROUP)", "https://en.wikipedia.org/wiki/Jollibee_Group", "Jollibee Group"],
    ["SOUTH CHINA MORNING POST (2021)", "https://www.scmp.com/magazines/style/news-trends/article/3092165/how-jollibee-beat-mcdonalds-become-philippines-fast", "How Jollibee beat McDonald's to become the Philippines' fast-food king"],
  ],
  "03/courtside-and-counter/mamba-in-manila": [
    ["ASSOCIATED PRESS VIA HONOLULU ADVERTISER (JULY 21, 2009)", "https://archives-new.honoluluadvertiser.com/article/2009/Jul/21/br/hawaii90721037.html", "Kobe visits Manila in opening stop on Asian tour"],
  ],
  "03/courtside-and-counter/chickenjoy-vs-the-burger": [
    ["WIKIPEDIA (MCDONALD'S PHILIPPINES)", "https://en.wikipedia.org/wiki/McDonald%27s_Philippines", "McDonald's Philippines"],
  ],
  "03/courtside-and-counter/jollibee-goes-global": [
    ["WIKIPEDIA (JOLLIBEE GROUP)", "https://en.wikipedia.org/wiki/Jollibee_Group", "Jollibee Group"],
  ],
  "04/maputi-at-unat": [
    ["ESQUIRE PHILIPPINES (2019)", "https://www.esquiremag.ph/life/health-and-fitness/why-filipinos-obsess-over-skin-whitening-a00293-20190426", "A history of why Filipinos are obsessed with skin whitening"],
    ["JOURNAL OF PUBLIC HEALTH POLICY (2013)", "https://link.springer.com/article/10.1057/jphp.2013.50", "Journal of Public Health Policy (2013): the skin whitening industry in the Philippines"],
    ["WIKIPEDIA (HAIR STRAIGHTENING)", "https://en.wikipedia.org/wiki/Hair_straightening", "Hair straightening"],
  ],
  "04/maputi-at-unat/whitening-boom": [
    ["ESQUIRE PHILIPPINES (2019)", "https://www.esquiremag.ph/life/health-and-fitness/why-filipinos-obsess-over-skin-whitening-a00293-20190426", "A history of why Filipinos are obsessed with skin whitening"],
    ["GMA NEWS (JAN 29, 2010)", "https://www.gmanetwork.com/news/lifestyle/content/182773/dissecting-the-pinoy-white-skin-obsession/story", "Dissecting the Pinoy white skin obsession"],
    ["JOURNAL OF PUBLIC HEALTH POLICY (2013)", "https://link.springer.com/article/10.1057/jphp.2013.50", "Journal of Public Health Policy (2013): the skin whitening industry in the Philippines"],
  ],
  "04/maputi-at-unat/the-rebond-era": [
    ["WIKIPEDIA (HAIR STRAIGHTENING)", "https://en.wikipedia.org/wiki/Hair_straightening", "Hair straightening"],
  ],
  "04/maputi-at-unat/reality-check": [
    ["ESQUIRE PHILIPPINES (2019)", "https://www.esquiremag.ph/life/health-and-fitness/why-filipinos-obsess-over-skin-whitening-a00293-20190426", "A history of why Filipinos are obsessed with skin whitening"],
    ["JOURNAL OF PUBLIC HEALTH POLICY (2013)", "https://link.springer.com/article/10.1057/jphp.2013.50", "Journal of Public Health Policy (2013): the skin whitening industry in the Philippines"],
  ],
  "04/low-rise-high-style": [
    ["RADAR (SEPT 7, 2026)", "https://radar.ph/the-2000s-were-the-golden-age-of-philippine-retail-fashion/", "The 2000s were the golden age of Philippine retail fashion"],
    ["WIKIPEDIA (LOW-RISE FASHION)", "https://en.wikipedia.org/wiki/Low-rise_(fashion)", "Low-rise (fashion)"],
    ["PHILSTAR (OCT 31, 2005)", "https://www.philstar.com/metro/2005/10/31/304513/nbi-seizes-fake-lacoste-apparel-greenhills", "NBI seizes fake Lacoste apparel in Greenhills"],
  ],
  "04/low-rise-high-style/illegally-low": [
    ["WIKIPEDIA (LOW-RISE FASHION)", "https://en.wikipedia.org/wiki/Low-rise_(fashion)", "Low-rise (fashion)"],
    ["RADAR (SEPT 7, 2026)", "https://radar.ph/the-2000s-were-the-golden-age-of-philippine-retail-fashion/", "The 2000s were the golden age of Philippine retail fashion"],
  ],
  "04/low-rise-high-style/wear-the-logo": [
    ["WIKIPEDIA (BENCH; PENSHOPPE)", "https://en.wikipedia.org/wiki/Bench_(Philippine_clothing_brand)", "Bench (Philippine clothing brand)"],
    ["WIKIPEDIA (BENCH; PENSHOPPE)", "https://en.wikipedia.org/wiki/Penshoppe", "Penshoppe"],
    ["PHILSTAR (NOV 9, 2003)", "https://www.philstar.com/entertainment/2003/11/09/227248/dao-shalt-be-true-thyself", "Dao shalt be true to thyself"],
    ["PHILSTAR (NOV 13, 2009)", "https://www.philstar.com/entertainment/2009/11/13/522642/style-studded-bench-show", "Style-studded Bench show"],
    ["RADAR (SEPT 7, 2026)", "https://radar.ph/the-2000s-were-the-golden-age-of-philippine-retail-fashion/", "The 2000s were the golden age of Philippine retail fashion"],
  ],
  "04/low-rise-high-style/reality-check": [
    ["PHILSTAR (OCT 31, 2005)", "https://www.philstar.com/metro/2005/10/31/304513/nbi-seizes-fake-lacoste-apparel-greenhills", "NBI seizes fake Lacoste apparel in Greenhills"],
  ],
  "04/pang-f4-na-buhok": [
    ["PHILSTAR (SEPT 20, 2003)", "https://www.philstar.com/entertainment/2003/09/20/221300/meteor-garden-fever", "The Meteor Garden fever"],
    ["THE SUMMIT EXPRESS (FEB 3, 2025)", "https://www.thesummitexpress.com/2025/02/remembering-barbie-hsu-meteor-garden-fever-asianovela-craze.html", "Remembering Barbie Hsu and the \"Meteor Garden fever\" that started the Asianovela craze"],
    ["PEP.PH (APR 21, 2020)", "https://www.pep.ph/guide/tv/150849/lee-min-ho-dramas-a724-20200421-lfrm", "Lee Min Ho's dramas"],
    ["WIKIPEDIA (KKONMINAM)", "https://en.wikipedia.org/wiki/Kkonminam", "Kkonminam"],
  ],
  "04/pang-f4-na-buhok/the-f4-flow": [
    ["PHILSTAR (SEPT 20, 2003)", "https://www.philstar.com/entertainment/2003/09/20/221300/meteor-garden-fever", "The Meteor Garden fever"],
    ["PHILSTAR (NOV 9, 2003)", "https://www.philstar.com/entertainment/2003/11/09/227248/dao-shalt-be-true-thyself", "Dao shalt be true to thyself"],
    ["THE SUMMIT EXPRESS (FEB 3, 2025)", "https://www.thesummitexpress.com/2025/02/remembering-barbie-hsu-meteor-garden-fever-asianovela-craze.html", "Remembering Barbie Hsu and the \"Meteor Garden fever\" that started the Asianovela craze"],
    ["WIKIPEDIA (LIST OF F4 LIVE PERFORMANCES)", "https://en.wikipedia.org/wiki/List_of_F4_live_performances", "List of F4 live performances"],
  ],
  "04/pang-f4-na-buhok/the-jun-pyo-curl": [
    ["PEP.PH (APR 21, 2020)", "https://www.pep.ph/guide/tv/150849/lee-min-ho-dramas-a724-20200421-lfrm", "Lee Min Ho's dramas"],
    ["WIKIPEDIA (BOYS OVER FLOWERS)", "https://en.wikipedia.org/wiki/Boys_Over_Flowers_(South_Korean_TV_series)", "Boys Over Flowers (TV series)"],
    ["SOOMPI (OCT 21, 2013)", "https://www.soompi.com/article/541957wpp/the-hair-makes-the-character-lee-min-ho-edition", "The hair makes the character: Lee Min Ho edition"],
  ],
  "04/pang-f4-na-buhok/reality-check": [
    ["PCIJ (SEPT 2005)", "https://old.pcij.org/stories/machos-in-the-mirror/", "Machos in the mirror"],
    ["WIKIPEDIA (KKONMINAM)", "https://en.wikipedia.org/wiki/Kkonminam", "Kkonminam"],
  ],
  "04/sexy-fit-at-masaya": [
    ["WIKIPEDIA (SEXBOMB GIRLS)", "https://en.wikipedia.org/wiki/SexBomb_Girls", "SexBomb Girls"],
    ["PHILSTAR (SEPT 22, 2009)", "https://philstar.com/lifestyle/health-and-family/2009/09/22/507030/biggest-loser-asia-win-100-grand", "The Biggest Loser Asia: win 100 grand"],
  ],
  "04/sexy-fit-at-masaya/the-sexbomb-effect": [
    ["WIKIPEDIA (SEXBOMB GIRLS)", "https://en.wikipedia.org/wiki/SexBomb_Girls", "SexBomb Girls"],
  ],
  "04/sexy-fit-at-masaya/the-biggest-loser": [
    ["PHILSTAR (SEPT 22, 2009)", "https://philstar.com/lifestyle/health-and-family/2009/09/22/507030/biggest-loser-asia-win-100-grand", "The Biggest Loser Asia: win 100 grand"],
    ["PHILSTAR (DEC 23, 2010)", "https://philstar.com/entertainment/2010/12/23/641525/biggest-loser-asia-2-pinoys-put-good-fight", "Biggest Loser Asia 2: Pinoys put up a good fight"],
    ["WIKIPEDIA (THE BIGGEST LOSER ASIA)", "https://en.wikipedia.org/wiki/The_Biggest_Loser_Asia_season_1", "The Biggest Loser Asia (season 1)"],
  ],
  "04/sexy-fit-at-masaya/reality-check": [
    ["WIKIPEDIA (SEXBOMB GIRLS)", "https://en.wikipedia.org/wiki/SexBomb_Girls", "SexBomb Girls"],
    ["STAT NEWS (MAY 16, 2016)", "https://www.statnews.com/2016/05/16/the-biggest-loser-weight-loss/", "After \"The Biggest Loser,\" contestants' bodies fought to regain weight"],
  ],
  "05/noontime-showdown": [
    ["WIKIPEDIA (WOWOWEE)", "https://en.wikipedia.org/wiki/Wowowee", "Wowowee"],
    ["THE SMART LOCAL (MAR 23, 2022)", "https://thesmartlocal.ph/filipino-dance-trends/", "Dance trends that originated in the Philippines"],
    ["PHILSTAR (FEB 5, 2006)", "https://philstar.com/headlines/2006/02/05/320086/145wowowee146-stampede-73-killed-359-injured", "Wowowee stampede: 73 killed, 359 injured"],
  ],
  "05/noontime-showdown/wowowee": [
    ["WIKIPEDIA (WOWOWEE)", "https://en.wikipedia.org/wiki/Wowowee", "Wowowee"],
    ["PHILSTAR (MAR 21, 2007)", "https://philstar.com/entertainment/2007/03/21/390564/how-migz-beat-other-senatoriables-boom-tarat", "How Migz beat other senatoriables to Boom Tarat"],
  ],
  "05/noontime-showdown/dance-craze": [
    ["THE SMART LOCAL (MAR 23, 2022)", "https://thesmartlocal.ph/filipino-dance-trends/", "Dance trends that originated in the Philippines"],
    ["PHILSTAR (JUNE 17, 2005)", "https://philstar.com/entertainment/2005/06/17/282039/rock-takes-over-novelty-songs", "Rock takes over from novelty songs"],
  ],
  "05/noontime-showdown/the-verdict": [
    ["PHILSTAR (FEB 5, 2006)", "https://philstar.com/headlines/2006/02/05/320086/145wowowee146-stampede-73-killed-359-injured", "Wowowee stampede: 73 killed, 359 injured"],
    ["AL JAZEERA (FEB 4, 2006)", "https://www.aljazeera.com/news/2006/2/4/scores-killed-in-philippine-stampede", "Scores killed in Philippine stampede"],
    ["WIKIPEDIA (WOWOWEE)", "https://en.wikipedia.org/wiki/PhilSports_Stadium_stampede", "PhilSports Stadium stampede"],
  ],
  "05/text-to-vote": [
    ["WIKIPEDIA (PINOY BIG BROTHER: SEASON 1; PINOY DREAM ACADEMY SEASON 1; PILIPINAS GOT TALENT SEASON 1)", "https://en.wikipedia.org/wiki/Pinoy_Big_Brother:_Season_1", "Pinoy Big Brother: Season 1"],
    ["WIKIPEDIA (PINOY BIG BROTHER: SEASON 1; PINOY DREAM ACADEMY SEASON 1; PILIPINAS GOT TALENT SEASON 1)", "https://en.wikipedia.org/wiki/Pinoy_Dream_Academy_season_1", "Pinoy Dream Academy season 1"],
    ["WIKIPEDIA (PINOY BIG BROTHER: SEASON 1; PINOY DREAM ACADEMY SEASON 1; PILIPINAS GOT TALENT SEASON 1)", "https://en.wikipedia.org/wiki/Pilipinas_Got_Talent_season_1", "Pilipinas Got Talent season 1"],
    ["PEP.PH (MAY 24, 2019)", "https://www.pep.ph/guide/tv/143475/reality-show-chronicles-yeng-constantino-recalls-being-rejected-by-star-in-a-million-starstruck-a724-20190524-lfrm2", "Yeng Constantino recalls being rejected by Star in a Million and StarStruck"],
  ],
  "05/text-to-vote/star-search": [
    ["PEP.PH (MAY 24, 2019)", "https://www.pep.ph/guide/tv/143475/reality-show-chronicles-yeng-constantino-recalls-being-rejected-by-star-in-a-million-starstruck-a724-20190524-lfrm2", "Yeng Constantino recalls being rejected by Star in a Million and StarStruck"],
    ["WIKIPEDIA (PINOY DREAM ACADEMY SEASON 1)", "https://en.wikipedia.org/wiki/Pinoy_Dream_Academy_season_1", "Pinoy Dream Academy season 1"],
  ],
  "05/text-to-vote/bahay-ni-kuya": [
    ["WIKIPEDIA (PINOY BIG BROTHER: SEASON 1; ORANGE AND LEMONS)", "https://en.wikipedia.org/wiki/Pinoy_Big_Brother:_Season_1", "Pinoy Big Brother: Season 1"],
    ["WIKIPEDIA (PINOY BIG BROTHER: SEASON 1; ORANGE AND LEMONS)", "https://en.wikipedia.org/wiki/Orange_and_Lemons", "Orange and Lemons"],
  ],
  "05/text-to-vote/got-talent": [
    ["WIKIPEDIA (PILIPINAS GOT TALENT SEASON 1)", "https://en.wikipedia.org/wiki/Pilipinas_Got_Talent_season_1", "Pilipinas Got Talent season 1"],
  ],
  "05/band-explosion": [
    ["PHILSTAR (JUNE 17, 2005)", "https://philstar.com/entertainment/2005/06/17/282039/rock-takes-over-novelty-songs", "Rock takes over from novelty songs"],
    ["WIKIPEDIA (POGI ROCK)", "https://en.wikipedia.org/wiki/Pogi_rock", "Pogi rock"],
  ],
  "05/band-explosion/rock-takes-over": [
    ["PHILSTAR (JUNE 17, 2005)", "https://philstar.com/entertainment/2005/06/17/282039/rock-takes-over-novelty-songs", "Rock takes over from novelty songs"],
  ],
  "05/band-explosion/pogi-rock": [
    ["WIKIPEDIA (CUESHÉ; POGI ROCK)", "https://en.wikipedia.org/wiki/Cuesh%C3%A9", "Cueshé"],
    ["WIKIPEDIA (CUESHÉ; POGI ROCK)", "https://en.wikipedia.org/wiki/Pogi_rock", "Pogi rock"],
  ],
  "05/band-explosion/pinoy-ako": [
    ["WIKIPEDIA (ORANGE AND LEMONS)", "https://en.wikipedia.org/wiki/Orange_and_Lemons", "Orange and Lemons"],
  ],
  "05/videoke-nation": [
    ["PCIJ (MAR-APR 2008)", "https://old.pcij.org/stories/conquered-by-videoke/", "Conquered by videoke"],
    ["WIKIPEDIA (MAGIC MIC)", "https://en.wikipedia.org/wiki/Magic_Mic", "Magic Mic"],
    ["WIKIPEDIA (MY WAY KILLINGS)", "https://en.wikipedia.org/wiki/My_Way_killings", "My Way killings"],
  ],
  "05/videoke-nation/five-pesos-a-song": [
    ["PCIJ (MAR-APR 2008)", "https://old.pcij.org/stories/conquered-by-videoke/", "Conquered by videoke"],
  ],
  "05/videoke-nation/magic-sing": [
    ["WIKIPEDIA (MAGIC MIC)", "https://en.wikipedia.org/wiki/Magic_Mic", "Magic Mic"],
  ],
  "05/videoke-nation/my-way": [
    ["PCIJ (MAR-APR 2008)", "https://old.pcij.org/stories/conquered-by-videoke/", "Conquered by videoke"],
    ["WIKIPEDIA (MY WAY KILLINGS)", "https://en.wikipedia.org/wiki/My_Way_killings", "My Way killings"],
    ["NEW YORK TIMES (FEB 7, 2010)", "https://longform.org/posts/sinatra-song-often-strikes-deadly-chord", "Sinatra song often strikes deadly chord (New York Times, via Longform)"],
  ],
  "05/primetime-heroes": [
    ["WIKIPEDIA (DARNA; SUPER INGGO; CAPTAIN BARBELL; PANDAY; LOVE TEAM)", "https://en.wikipedia.org/wiki/Darna_(2005_TV_series)", "Darna (2005 TV series)"],
    ["WIKIPEDIA (DARNA; SUPER INGGO; CAPTAIN BARBELL; PANDAY; LOVE TEAM)", "https://en.wikipedia.org/wiki/Super_Inggo", "Super Inggo"],
    ["WIKIPEDIA (DARNA; SUPER INGGO; CAPTAIN BARBELL; PANDAY; LOVE TEAM)", "https://en.wikipedia.org/wiki/Captain_Barbell_(2006_TV_series)", "Captain Barbell (2006 TV series)"],
    ["WIKIPEDIA (DARNA; SUPER INGGO; CAPTAIN BARBELL; PANDAY; LOVE TEAM)", "https://en.wikipedia.org/wiki/Panday_(2005_TV_series)", "Panday (2005 TV series)"],
    ["WIKIPEDIA (DARNA; SUPER INGGO; CAPTAIN BARBELL; PANDAY; LOVE TEAM)", "https://en.wikipedia.org/wiki/Love_team", "Love team"],
    ["PHILSTAR (AUG 21, 2006)", "https://philstar.com/entertainment/2006/08/21/353986/kick-won-makisig-inggo-role", "The kick that won for Makisig the Inggo role"],
  ],
  "05/primetime-heroes/super-inggo": [
    ["WIKIPEDIA (SUPER INGGO)", "https://en.wikipedia.org/wiki/Super_Inggo", "Super Inggo"],
    ["PHILSTAR (AUG 21, 2006)", "https://philstar.com/entertainment/2006/08/21/353986/kick-won-makisig-inggo-role", "The kick that won for Makisig the Inggo role"],
  ],
  "05/primetime-heroes/darna-fever": [
    ["WIKIPEDIA (DARNA, 2005 TV SERIES)", "https://en.wikipedia.org/wiki/Darna_(2005_TV_series)", "Darna (2005 TV series)"],
  ],
  "05/primetime-heroes/reel-to-real": [
    ["WIKIPEDIA (LOVE TEAM; A VERY SPECIAL LOVE; KATORSE)", "https://en.wikipedia.org/wiki/Love_team", "Love team"],
    ["WIKIPEDIA (LOVE TEAM; A VERY SPECIAL LOVE; KATORSE)", "https://en.wikipedia.org/wiki/A_Very_Special_Love", "A Very Special Love"],
    ["WIKIPEDIA (LOVE TEAM; A VERY SPECIAL LOVE; KATORSE)", "https://en.wikipedia.org/wiki/Katorse", "Katorse"],
  ],
  "06/sa-mall-tayo": [
    ["SM PRIME (c. 2008)", "https://www.smprime.com/latest_news/filipinos-flock-to-supersize-malls/", "Filipinos flock to supersize malls"],
    ["WIKIPEDIA (SM MALL OF ASIA)", "https://en.wikipedia.org/wiki/SM_Mall_of_Asia", "SM Mall of Asia"],
  ],
  "06/sa-mall-tayo/weekend-sa-mall": [
    ["WIKIPEDIA (SM MALL OF ASIA)", "https://en.wikipedia.org/wiki/SM_Mall_of_Asia", "SM Mall of Asia"],
    ["SM PRIME (c. 2008)", "https://www.smprime.com/latest_news/filipinos-flock-to-supersize-malls/", "Filipinos flock to supersize malls"],
  ],
  "06/sa-mall-tayo/mall-ang-lahat": [
    ["WIKIPEDIA (SIMBANG GABI)", "https://en.wikipedia.org/wiki/Simbang_Gabi", "Simbang Gabi"],
    ["PHILSTAR (JUNE 20, 2010)", "https://www.philstar.com/headlines/2010/06/20/585643/no-visit-internet-shops-during-class-hours", "'No visit to Internet shops during class hours'"],
  ],
  "06/sa-mall-tayo/glorietta": [
    ["WIKIPEDIA (2007 GLORIETTA EXPLOSION)", "https://en.wikipedia.org/wiki/2007_Glorietta_explosion", "2007 Glorietta explosion"],
  ],
  "06/computer-shop": [
    ["PHILSTAR (DEC 15, 2003)", "https://philstar.com/business-life/2003/12/15/231729/business-online-gaming", "The business of online gaming"],
    ["PHILSTAR (SEPT 11, 2006)", "https://www.philstar.com/headlines/2006/09/11/357505/quest-virtual-warriors", "The quest of the virtual warriors"],
    ["WIKIPEDIA (VIDEO GAMES IN THE PHILIPPINES)", "https://en.wikipedia.org/wiki/Video_games_in_the_Philippines", "Video games in the Philippines"],
  ],
  "06/computer-shop/log-in": [
    ["PHILSTAR (DEC 15, 2003)", "https://philstar.com/business-life/2003/12/15/231729/business-online-gaming", "The business of online gaming"],
    ["PHILSTAR (SEPT 11, 2006)", "https://www.philstar.com/headlines/2006/09/11/357505/quest-virtual-warriors", "The quest of the virtual warriors"],
  ],
  "06/computer-shop/after-school": [
    ["PHILSTAR (SEPT 11, 2006)", "https://www.philstar.com/headlines/2006/09/11/357505/quest-virtual-warriors", "The quest of the virtual warriors"],
    ["PHILSTAR (DEC 15, 2003)", "https://philstar.com/business-life/2003/12/15/231729/business-online-gaming", "The business of online gaming"],
  ],
  "06/computer-shop/class-hours": [
    ["PHILSTAR (JUNE 16, 2006)", "https://philstar.com/cebu-news/2006/06/16/342253/deped-asks-net-cafs-turn-down-students-during-class-hours", "DepEd asks net cafés to turn down students during class hours"],
    ["PHILSTAR (JUNE 20, 2010)", "https://www.philstar.com/headlines/2010/06/20/585643/no-visit-internet-shops-during-class-hours", "'No visit to Internet shops during class hours'"],
  ],
  "06/pista-at-handaan": [
    ["PHILSTAR (JAN 21, 2009)", "https://philstar.com/nation/2009/01/21/433139/29th-sinulog-festival-stunning-success", "29th Sinulog festival a stunning success"],
    ["WIKIPEDIA (FILIPINO SPAGHETTI; DARNA, 2005 TV SERIES)", "https://en.wikipedia.org/wiki/Filipino_spaghetti", "Filipino spaghetti"],
    ["WIKIPEDIA (FILIPINO SPAGHETTI; DARNA, 2005 TV SERIES)", "https://en.wikipedia.org/wiki/Darna_(2005_TV_series)", "Darna (2005 TV series)"],
  ],
  "06/pista-at-handaan/pista": [
    ["PHILSTAR (JAN 21, 2009)", "https://philstar.com/nation/2009/01/21/433139/29th-sinulog-festival-stunning-success", "29th Sinulog festival a stunning success"],
  ],
  "06/pista-at-handaan/handaan": [
    ["WIKIPEDIA (FILIPINO SPAGHETTI)", "https://en.wikipedia.org/wiki/Filipino_spaghetti", "Filipino spaghetti"],
    ["THE SMART LOCAL (MAR 23, 2022)", "https://thesmartlocal.ph/filipino-dance-trends/", "Filipino dance trends through the years"],
  ],
  "06/pista-at-handaan/sala": [
    ["WIKIPEDIA (DARNA, 2005 TV SERIES; WOWOWEE)", "https://en.wikipedia.org/wiki/Darna_(2005_TV_series)", "Darna (2005 TV series)"],
    ["WIKIPEDIA (DARNA, 2005 TV SERIES; WOWOWEE)", "https://en.wikipedia.org/wiki/Wowowee", "Wowowee"],
  ],
  "06/linggo": [
    ["WIKIPEDIA (SIMBANG GABI; SEVEN CHURCHES VISITATION)", "https://en.wikipedia.org/wiki/Simbang_Gabi", "Simbang Gabi"],
    ["WIKIPEDIA (SIMBANG GABI; SEVEN CHURCHES VISITATION)", "https://en.wikipedia.org/wiki/Seven_Churches_Visitation", "Seven Churches Visitation"],
    ["PHILSTAR (JAN 9, 2010)", "https://philstar.com/headlines/2010/01/09/538935/black-nazarene-feast-today", "Black Nazarene feast today"],
    ["PHILSTAR (MAY 12, 2009)", "https://philstar.com/sports/2009/05/12/466364/world-slasher-cup-unwraps-big-dome", "World Slasher Cup unwraps at Big Dome"],
  ],
  "06/linggo/simbang-gabi": [
    ["WIKIPEDIA (SIMBANG GABI)", "https://en.wikipedia.org/wiki/Simbang_Gabi", "Simbang Gabi"],
  ],
  "06/linggo/nazareno": [
    ["WIKIPEDIA (SEVEN CHURCHES VISITATION)", "https://en.wikipedia.org/wiki/Seven_Churches_Visitation", "Seven Churches Visitation"],
    ["PHILSTAR (JAN 9, 2010)", "https://philstar.com/headlines/2010/01/09/538935/black-nazarene-feast-today", "Black Nazarene feast today"],
  ],
  "06/linggo/sabungan": [
    ["PHILSTAR (MAY 12, 2009)", "https://philstar.com/sports/2009/05/12/466364/world-slasher-cup-unwraps-big-dome", "World Slasher Cup unwraps at Big Dome"],
    ["NBC NEWS (2013)", "https://www.nbcnews.com/business/travel/just-making-living-cockfighting-way-life-philippines-f6C10945776", "'Just making a living': Cockfighting a way of life in the Philippines"],
  ],
  "07/text-muna": [
    ["PHILSTAR (MAY 15, 2001)", "https://www.philstar.com/lifestyle/business-life/2001/05/15/85823/philippine-text-messaging-phenomenon/amp/", "The Philippine text messaging phenomenon"],
    ["GMA NEWS (AUG 18, 2010)", "https://www.gmanetwork.com/news/scitech/content/198832/philippines-still-text-messaging-champ-us-study/story", "Philippines still text messaging champ — US study"],
  ],
  "07/text-muna/texting-capital": [
    ["PHILSTAR (MAY 15, 2001)", "https://www.philstar.com/lifestyle/business-life/2001/05/15/85823/philippine-text-messaging-phenomenon/amp/", "The Philippine text messaging phenomenon"],
  ],
  "07/text-muna/unli": [
    ["PHILSTAR (MARCH 5, 2005)", "https://www.philstar.com/business/2005/03/05/269029/sun-cellular-set-launch-247-spinoff-text-unlimited-offer", "Sun Cellular set to launch 24/7 spinoff with text unlimited offer"],
  ],
  "07/text-muna/pasaload": [
    ["PHILSTAR (MARCH 8, 2004)", "https://philstar.com/business/telecoms/2004/03/08/241781/gsm-award-honors-filipino-it-ingenuity", "GSM award honors Filipino IT ingenuity"],
  ],
  "07/primetime": [
    ["PEP (FEB 15, 2008)", "https://www.pep.ph/news/local/1635/tv-ratings-feb-12-14-gma-7s-telebabad-block-hanging-tough-versus-abs-cbns-primetime-bida", "TV Ratings (Feb. 12-14): GMA-7's Telebabad block hanging tough versus ABS-CBN's Primetime Bida"],
    ["TVASIA (JUNE 2009)", "https://tva.onscreenasia.com/2009/06/pacman-packs-a-ratings-punch/", "Pacman packs a ratings punch"],
    ["PHILSTAR (OCT 9, 2007)", "https://philstar.com/metro/2007/10/09/19650/ncrpo-says-no-crimes-reported-during-pacquiao-fight", "NCRPO says no crimes reported during Pacquiao fight"],
  ],
  "07/primetime/telebabad": [
    ["PEP (FEB 15, 2008)", "https://www.pep.ph/news/local/1635/tv-ratings-feb-12-14-gma-7s-telebabad-block-hanging-tough-versus-abs-cbns-primetime-bida", "TV Ratings (Feb. 12-14): GMA-7's Telebabad block hanging tough versus ABS-CBN's Primetime Bida"],
  ],
  "07/primetime/laban-ni-pacman": [
    ["PHILSTAR (OCT 9, 2007)", "https://philstar.com/metro/2007/10/09/19650/ncrpo-says-no-crimes-reported-during-pacquiao-fight", "NCRPO says no crimes reported during Pacquiao fight"],
    ["TVASIA (JUNE 2009)", "https://tva.onscreenasia.com/2009/06/pacman-packs-a-ratings-punch/", "Pacman packs a ratings punch"],
  ],
  "07/linggo-at-alas-tres": [
    ["LOST MEDIA WIKI (3 O'CLOCK PRAYER)", "https://lostmediawiki.com/3_o%27_clock_prayer_(lost_Filipino_prayer_habit_interstitial;_1980s-2000s)", "3 o' clock prayer (partially found Filipino prayer habit interstitial; 1980s-2000s)"],
    ["WIKIPEDIA (SOP, ASAP)", "https://en.wikipedia.org/wiki/SOP_(TV_program)", "SOP (TV program)"],
    ["WIKIPEDIA (SOP, ASAP)", "https://en.wikipedia.org/wiki/ASAP_(TV_program)", "ASAP (TV program)"],
    ["PHILSTAR (JUNE 24, 2012)", "https://www.philstar.com/entertainment/2012/06/24/820809/entertainment", "When radio was king"],
  ],
  "07/linggo-at-alas-tres/sunday-oldies": [
    ["PHILSTAR (JUNE 24, 2012)", "https://www.philstar.com/entertainment/2012/06/24/820809/entertainment", "When radio was king"],
  ],
  "07/linggo-at-alas-tres/alas-tres": [
    ["LOST MEDIA WIKI (3 O'CLOCK PRAYER)", "https://lostmediawiki.com/3_o%27_clock_prayer_(lost_Filipino_prayer_habit_interstitial;_1980s-2000s)", "3 o' clock prayer (partially found Filipino prayer habit interstitial; 1980s-2000s)"],
  ],
  "07/linggo-at-alas-tres/asap-vs-sop": [
    ["WIKIPEDIA (SOP, ASAP)", "https://en.wikipedia.org/wiki/SOP_(TV_program)", "SOP (TV program)"],
    ["WIKIPEDIA (SOP, ASAP)", "https://en.wikipedia.org/wiki/ASAP_(TV_program)", "ASAP (TV program)"],
  ],
  "07/graveyard-shift": [
    ["AFP VIA GOVERNANCE NOW (DEC 7, 2010)", "https://www.governancenow.com/gov-next/egov/philippines-overtakes-india-call-centre-capital", "Philippines overtakes India as call centre capital"],
    ["PHILSTAR (SEPT 8, 2008)", "https://philstar.com/business/business-as-usual/2008/09/08/399050/eastwood-cyberpark-first-home-etelecare", "Eastwood Cyberpark: first home of eTelecare"],
    ["INQUIRER (FAST FACTS)", "https://opinion.inquirer.net/31739/fast-facts-4", "Fast facts"],
  ],
  "07/graveyard-shift/call-center-capital": [
    ["AFP VIA GOVERNANCE NOW (DEC 7, 2010)", "https://www.governancenow.com/gov-next/egov/philippines-overtakes-india-call-centre-capital", "Philippines overtakes India as call centre capital"],
  ],
  "07/graveyard-shift/gising-sa-gabi": [
    ["PHILSTAR (SEPT 8, 2008)", "https://philstar.com/business/business-as-usual/2008/09/08/399050/eastwood-cyberpark-first-home-etelecare", "Eastwood Cyberpark: first home of eTelecare"],
    ["WIKIPEDIA (EASTWOOD CITY)", "https://en.wikipedia.org/wiki/Eastwood_City", "Eastwood City"],
  ],
  "07/graveyard-shift/sweldo-sa-gabi": [
    ["INQUIRER (FAST FACTS)", "https://opinion.inquirer.net/31739/fast-facts-4", "Fast facts"],
  ],
};

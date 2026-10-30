// CH 03: Global Mix (Globalization), presented as the "Balitang Global" newscast.
// To add a video: set video.youtube to the YouTube video ID (the part after "v=").
// To add a photo: set src to the image URL (for example, a Supabase Storage public URL).
const v = (label) => ({ label, youtube: null });
const ph = (...captions) => captions.map((caption) => ({ caption, src: null }));

export default {
  num: '03',
  title: 'Global Mix',
  aspect: 'Globalization: the world on our screens',
  format: 'news',
  bg: '#062a4a',
  what: 'Globalization is how the world arrived in everyday Filipino life: music, films, shows, sports stars, and food from other countries. Filipinos did not just watch and eat them. They adapted them into something distinctly Filipino.',
  felt: 'Connected and curious. A song from America, a drama from Asia, or a basketball star on the other side of the world could feel like part of the neighborhood, and Filipino voices, dubbing, and tastes made each one our own.',
  // Map pins: [longitude, latitude]. "ep" is the story number each pin opens.
  pins: [
    { ll: [-118.2, 34.05], eps: [1, 4], city: 'LOS ANGELES' },
    { ll: [139.7, 35.7], eps: [2], city: 'TOKYO' },
    { ll: [121.5, 25.0], eps: [2], city: 'TAIPEI', left: true },
    { ll: [127.0, 37.5], eps: [3], city: 'SEOUL', left: true },
  ],
  home: { ll: [121.0, 14.6], city: 'PHILIPPINES' },
  episodes: [
    {
      slug: 'western-waves',
      ep: 1,
      title: 'WESTERN WAVES',
      dateline: 'FROM HOLLYWOOD',
      cardSub: 'Pop hits, rock anthems, and blockbusters',
      overview: {
        sub: 'FROM HOLLYWOOD: POP HITS, ROCK ANTHEMS, AND BLOCKBUSTERS',
        panels: [
          ['THE REPORT', 'Through radio, MTV, CDs, and eventually the internet, Filipinos had strong access to American and other Western music. Artists like Britney Spears, Avril Lavigne, Linkin Park, and Beyoncé became familiar names, and Hollywood franchises like Harry Potter and Spider-Man became part of Filipino entertainment.'],
          ['LOCAL ANGLE', 'Western hits shaped what young Filipinos listened to and wanted. Some of those stars also came to perform here, and Filipino moviegoers turned Hollywood series into record-setting hits.'],
        ],
        video: v('an official music video or film trailer from the 2000s'),
        photos: ph('A 2000s album cover', 'A concert crowd', 'A movie poster'),
        ticker: ['SOURCES: LINKINPEDIA', 'WIKIPEDIA (AVRIL LAVIGNE TOURS; MTV PHILIPPINES 1992-2010)', 'PHILSTAR (JULY 29, 2009)'],
      },
      cta: { title: 'VOX POP', text: 'Which Western song or film defined your 2000s? First name and city only.' },
      parts: [
        {
          slug: 'live-in-manila', label: 'REPORT 1', cardTitle: 'LIVE IN MANILA', cardLine: 'Linkin Park and Avril Lavigne play to Filipino crowds',
          title: 'LIVE IN MANILA', sub: 'REPORT 1: WESTERN STARS PLAY TO FILIPINO CROWDS', camTag: 'LIVE',
          stats: [['JUNE 15, 2004', 'Linkin Park at the CCP Grounds'], ['1ST', "Linkin Park's first show in the Philippines"], ['MARCH 31, 2005', 'Avril Lavigne at Fort Bonifacio, Taguig']],
          panels: [
            ['THE REPORT', 'Linkin Park played their first Philippine show on June 15, 2004, at the CCP Grounds in Manila, the sixth stop of their Asian and European run. The show was moved there from its original venue. On March 31, 2005, Avril Lavigne brought her Bonez Tour to Fort Bonifacio in Taguig, with Simple Plan opening.'],
            ['LOCAL ANGLE', 'The songs Filipinos had heard on radio and MTV were now performed live, here at home. At the Linkin Park show, fans were brought onstage during "A Place for My Head."'],
          ],
          video: v('official concert footage'),
          photos: ph('A concert ticket', 'The crowd'),
          cta: { title: 'WERE YOU THERE?', text: 'Share your memory of a 2000s concert in the Philippines. First name and city only.' },
          ticker: ['SOURCES: LINKINPEDIA', 'WIKIPEDIA (AVRIL LAVIGNE TOURS)'],
        },
        {
          slug: 'mtv-on-channel-41', label: 'REPORT 2', cardTitle: 'MTV ON CHANNEL 41', cardLine: 'A 24-hour music channel on UHF 41',
          title: 'MTV ON CHANNEL 41', sub: 'REPORT 2: A 24-HOUR MUSIC CHANNEL FOR FILIPINO VIEWERS',
          stats: [['JAN 1, 2001', 'MTV Philippines starts 24-hour broadcasting'], ['UHF 41', 'its home channel until 2006'], ['FEB 16, 2010', 'MTV Philippines signs off']],
          panels: [
            ['THE REPORT', 'On January 1, 2001, MTV Philippines began broadcasting 24 hours a day on UHF Channel 41, through a joint venture with Nation Broadcasting Corporation. Channel 41 went off the air on December 31, 2006, and another company ran MTV Philippines from 2007 until it signed off on February 16, 2010.'],
            ['LOCAL ANGLE', 'MTV showed Western hits alongside local Filipino talent in its videos and in-between segments. Its VJs, including Sarah Meier, KC Montero, Derek Ramsay, Kat Alano, Andi Manzano, and Maggie Wilson, became familiar faces.'],
          ],
          video: v('an MTV Philippines VJ segment or station ID'),
          photos: ph('A music channel on TV', 'A VJ segment'),
          ticker: ['SOURCES: WIKIPEDIA (MTV PHILIPPINES 1992-2010)'],
        },
        {
          slug: 'box-office-magic', label: 'REPORT 3', cardTitle: 'BOX-OFFICE MAGIC', cardLine: 'The first film series to cross P1 billion',
          title: 'BOX-OFFICE MAGIC', sub: 'REPORT 3: HOLLYWOOD FRANCHISES IN PHILIPPINE CINEMAS',
          stats: [['P1B+', 'Harry Potter series total by July 2009'], ['1ST', 'film series to cross P1 billion in the Philippines'], ['P214M', 'Order of the Phoenix (2007), the top earner']],
          panels: [
            ['THE REPORT', "In July 2009, Warner Bros. announced that the Harry Potter films had earned more than P1 billion at the Philippine box office, the first film series to do so. Each film earned between about P137 million and P214 million, from Sorcerer's Stone in 2001 to Half-Blood Prince in 2009."],
            ['LOCAL ANGLE', 'Hollywood franchises like Harry Potter and Spider-Man became big events in Philippine cinemas, and the audience kept growing: the fifth Harry Potter film earned about P77 million more here than the first.'],
          ],
          video: v('an official Harry Potter or Spider-Man trailer'),
          photos: ph('A cinema line', 'A movie ticket'),
          cta: { title: 'YOUR FIRST BLOCKBUSTER', text: 'What Hollywood movie did you line up for in the 2000s? First name and city only.' },
          ticker: ['SOURCES: PHILSTAR (JULY 29, 2009)'],
        },
      ],
    },
    {
      slug: 'dubbed-and-delivered',
      ep: 2,
      title: 'DUBBED AND DELIVERED',
      dateline: 'FROM TAIPEI, TOKYO, AND SEOUL',
      cardSub: 'Asian dramas and anime in Filipino',
      overview: {
        sub: 'FROM TAIPEI, TOKYO, AND SEOUL: ASIAN DRAMAS AND ANIME IN FILIPINO',
        panels: [
          ['THE REPORT', "In the 2000s, Filipino TV filled up with stories from elsewhere in Asia. Taiwan's Meteor Garden became a sensation in 2003, Korean dramas followed the same year, and anime got its own all-Tagalog channel in 2005."],
          ['LOCAL ANGLE', 'These shows were not watched in their original languages. They were dubbed into Filipino, with Tagalog theme songs and local voice actors, so a drama from Taipei or Seoul felt like it was made for Filipino viewers.'],
        ],
        video: v('the Tagalog opening of Meteor Garden or a Koreanovela trailer'),
        photos: ph('F4 on TV', 'A Koreanovela poster', 'An anime opening'),
        ticker: ['SOURCES: PEP.PH', 'PLARIDEL JOURNAL (2004)', 'WIKIPEDIA (SOUTH KOREAN TV DRAMAS IN THE PHILIPPINES; HERO TV)'],
      },
      cta: { title: 'VOX POP', text: 'Which Asianovela or anime did you never miss? First name and city only.' },
      parts: [
        {
          slug: 'meteor-fever', label: 'REPORT 1', cardTitle: 'METEOR FEVER', cardLine: 'F4, Tagalog theme songs, and record ratings',
          title: 'METEOR FEVER', sub: 'REPORT 1: THE TAIWANESE DRAMA THAT STOPPED AFTERNOONS',
          stats: [['MAY 2003', 'premieres on ABS-CBN'], ['24.9%', 'first-week rating vs. 12%'], ['34.2%', 'after moving to 5:30 PM'], ['~P1M', 'reported earnings a day']],
          panels: [
            ['THE REPORT', "Meteor Garden premiered on ABS-CBN in May 2003 as the country's first Chinovela. In its first week it reportedly drew a 24.9 percent rating against GMA's 12 percent, and after moving to 5:30 PM, before TV Patrol, it reached 34.2 percent. It returned in 2005 in prime time as Meteor Garden: The Full Version."],
            ['LOCAL ANGLE', 'The opening theme became "Byahe," sung in Tagalog by Josh Santana. In 2003, F4 members came to perform in Manila, including Jerry Yan and Vic Chou at ABS-CBN\'s 50th anniversary show in November.'],
          ],
          video: v('the "Byahe" opening or an F4 performance'),
          photos: ph('F4', 'A Meteor Garden VCD'),
          cta: { title: 'F4 FAN CHECK', text: 'Who was your F4 bias? Tell us, with your first name and city.' },
          ticker: ['SOURCES: PEP.PH', 'PLARIDEL JOURNAL (2004)'],
        },
        {
          slug: 'koreanovela-nights', label: 'REPORT 2', cardTitle: 'KOREANOVELA NIGHTS', cardLine: 'From Endless Love to Boys Over Flowers',
          title: 'KOREANOVELA NIGHTS', sub: 'REPORT 2: KOREAN DRAMAS CROSS INTO FILIPINO HOMES',
          stats: [['2003', 'first Korean drama on Philippine TV'], ['2003', 'Endless Love: Autumn in My Heart on GMA'], ['2008', 'first local remake: Ako si Kim Samsoon'], ['2009', 'Boys Over Flowers on ABS-CBN']],
          panels: [
            ['THE REPORT', 'Korean dramas began airing in the Philippines in 2003, starting with Successful Story of a Bright Girl. GMA followed with dubbed hits like Endless Love: Autumn in My Heart, and shows like Full House, Stairway to Heaven, My Name Is Kim Sam Soon, and Jewel in the Palace drew big audiences. In 2009, ABS-CBN aired Boys Over Flowers, the Korean version of the Meteor Garden story.'],
            ['LOCAL ANGLE', 'Demand grew so strong that networks made their own Filipino versions, starting with Ako si Kim Samsoon in 2008, then Stairway to Heaven and Full House in 2009. An ABS-CBN executive described the appeal as a different style of storytelling from the usual Filipino soap opera.'],
          ],
          video: v('a dubbed Koreanovela trailer from GMA or ABS-CBN'),
          photos: ph('A Koreanovela on TV', 'A local remake'),
          ticker: ['SOURCES: WIKIPEDIA (SOUTH KOREAN TV DRAMAS IN THE PHILIPPINES)'],
        },
        {
          slug: 'the-filipino-voice', label: 'REPORT 3', cardTitle: 'THE FILIPINO VOICE', cardLine: 'Dubbing, and an all-Tagalog anime channel',
          title: 'THE FILIPINO VOICE', sub: 'REPORT 3: DUBBING, AND AN ALL-TAGALOG ANIME CHANNEL',
          stats: [['NOV 12, 2005', 'Hero TV launches'], ['24/7', 'anime dubbed in Filipino'], ['1ST', 'all-Tagalog anime channel in the Philippines']],
          panels: [
            ['THE REPORT', "On November 12, 2005, ABS-CBN's cable arm launched Hero TV, a 24-hour channel of Japanese anime dubbed in Filipino, billed as the first all-Tagalog anime channel in the country. Free TV also aired anime in the afternoon: Meteor Garden was first scheduled against GMA's cartoon Daimos."],
            ['LOCAL ANGLE', 'Dubbing did more than translate. A 2004 study of the Meteor Garden dub found that ABS-CBN softened insults and harsh words for Filipino family audiences, making the show fit local values.'],
          ],
          video: v('a Hero TV station ID or a Tagalog-dubbed anime opening'),
          photos: ph('An anime on Hero TV', 'A dubbing booth'),
          cta: { title: 'SING THE OPENING', text: 'Which Tagalog anime theme can you still sing? First name and city only.' },
          ticker: ['SOURCES: WIKIPEDIA (HERO TV)', 'PLARIDEL JOURNAL (2004)'],
        },
      ],
    },
    {
      slug: 'hallyu-rising',
      ep: 3,
      title: 'HALLYU RISING',
      dateline: 'FROM SEOUL',
      cardSub: 'K-pop and cover dance groups',
      overview: {
        sub: 'FROM SEOUL: K-POP AND COVER DANCE GROUPS',
        panels: [
          ['THE REPORT', 'After Koreanovelas won over Filipino TV, Korean pop music followed. By 2009, Filipino teens and young adults were discovering groups like Super Junior, Wonder Girls, Big Bang, and 2NE1 through YouTube, cable TV, and music downloads.'],
          ['LOCAL ANGLE', "Filipino fans did not just listen. They formed fan clubs, met up, learned the choreography, and formed cover dance groups. And one of the decade's biggest K-pop stars had already been a Filipino TV favorite."],
        ],
        video: v('an official 2009 K-pop music video'),
        photos: ph('A K-pop album', 'A fan meetup', 'A dance cover'),
        ticker: ['SOURCES: THE KOREA TIMES (SEPT 6, 2009)', 'PHILSTAR (NOV 15, 2009)', 'WIKIPEDIA (SANDARA PARK; SORRY, SORRY)'],
      },
      cta: { title: 'VOX POP', text: 'Which K-pop song got you hooked? First name and city only.' },
      parts: [
        {
          slug: 'krung-krung-to-2ne1', label: 'REPORT 1', cardTitle: 'FROM KRUNG-KRUNG TO 2NE1', cardLine: 'Sandara Park, from Star Circle Quest to K-pop',
          title: 'FROM KRUNG-KRUNG TO 2NE1', sub: 'REPORT 1: A FILIPINO TV FAVORITE BECOMES A K-POP STAR',
          stats: [['2004', 'first runner-up, Star Circle Quest'], ['2004-2007', 'Filipino films and TV shows'], ['2007', 'returns to South Korea'], ['2009', 'debuts with 2NE1']],
          panels: [
            ['THE REPORT', 'Sandara Park placed first runner-up on ABS-CBN\'s Star Circle Quest in 2004, behind Hero Angeles. Filipinos called her the "Pambansang Krung-Krung." She starred in films like Bcuz of U and Super Noypi and released the novelty hit "In or Out." She returned to South Korea in 2007 and debuted with 2NE1 in 2009, with songs like "Fire" and "I Don\'t Care."'],
            ['LOCAL ANGLE', 'For many Filipinos, 2NE1 was not a foreign group: it had "our" Dara. The Korea Times reported in 2009 that 2NE1\'s popularity in the Philippines was largely driven by her.'],
          ],
          video: v('"In or Out" or an official 2NE1 music video'),
          photos: ph('Sandara Park on Filipino TV', '2NE1'),
          ticker: ['SOURCES: WIKIPEDIA (SANDARA PARK)', 'THE KOREA TIMES (SEPT 6, 2009)', 'PHILSTAR (NOV 15, 2009)'],
        },
        {
          slug: 'sorry-sorry-on-myx', label: 'REPORT 2', cardTitle: 'SORRY, SORRY ON MYX', cardLine: 'K-pop reaches the Myx countdown',
          title: 'SORRY, SORRY ON MYX', sub: 'REPORT 2: K-POP REACHES THE FILIPINO MUSIC COUNTDOWN',
          stats: [['MARCH 2009', '"Sorry, Sorry" is released'], ['TOP 10', 'Myx daily countdown, July 2009'], ['SEPT 4, 2009', 'first Korean album launched in the Philippines']],
          panels: [
            ['THE REPORT', 'In July 2009, Super Junior\'s "Sorry, Sorry" and Wonder Girls\' "Nobody" reached the top 10 of the Myx daily countdown. On September 4, 2009, Universal Records Philippines released the Sorry, Sorry album here, the first Korean album launched in the country. Until then, fans had to order Korean albums online or ask friends abroad.'],
            ['LOCAL ANGLE', 'In October 2009, "Nobody" became the first song by a Korean group on the Billboard charts. Filipino fans had already been playing it for months.'],
          ],
          video: v('the official "Sorry, Sorry" or "Nobody" music video'),
          photos: ph('The Sorry, Sorry album', 'A music countdown on TV'),
          cta: { title: 'REQUEST A SONG', text: 'Which 2000s K-pop song should we play next? First name and city only.' },
          ticker: ['SOURCES: THE KOREA TIMES (SEPT 6, 2009)', 'PHILSTAR (NOV 15, 2009)', 'WIKIPEDIA (SORRY, SORRY)'],
        },
        {
          slug: 'fan-clubs-and-dance-covers', label: 'REPORT 3', cardTitle: 'FAN CLUBS AND DANCE COVERS', cardLine: 'Fan clubs, meetups, and the dance that went viral',
          title: 'FAN CLUBS AND DANCE COVERS', sub: 'REPORT 3: FILIPINO FANS BUILD THEIR OWN K-POP SCENE',
          stats: [['40 TO 1,000+', 'TVXQ fan club, 2006 to 2009'], ['JULY 2008', 'Pops in Seoul tapes in Manila'], ['~60,000', 'Filipino visitors to fan site Soompi'], ['0', 'K-pop concert tours here, as of Sept 2009']],
          panels: [
            ['THE REPORT', "Cassiopeia Philippines, a TVXQ fan club, drew 40 people to its first gathering in 2006 and had more than 1,000 members by 2009. Super Junior fans formed an umbrella club in 2008, and Girls' Generation Philippines grew after Arirang's Pops in Seoul taped its 1,000th episode in Manila in July 2008. No K-pop group had toured the Philippines yet, so fans met up, shared videos, and danced."],
            ['LOCAL ANGLE', 'Filipinos formed K-pop cover dance groups and learned the choreography. One Filipino dance video even went viral: inmates at the Cebu Provincial Detention and Rehabilitation Center dancing to "Sorry, Sorry," uploaded to YouTube.'],
          ],
          video: v('a 2000s K-pop dance cover, used with permission'),
          photos: ph('A fan club gathering', 'A dance cover group'),
          cta: { title: 'JOIN THE COVER', text: "Did you join a K-pop cover group? Share your group's name and city." },
          ticker: ['SOURCES: THE KOREA TIMES (SEPT 6, 2009)', 'WIKIPEDIA (SORRY, SORRY)'],
        },
      ],
    },
    {
      slug: 'courtside-and-counter',
      ep: 4,
      title: 'COURTSIDE AND COUNTER',
      dateline: 'FROM THE WORLD',
      cardSub: "Kobe's Black Mamba and fast-food chains",
      overview: {
        sub: 'FROM THE WORLD: AN NBA STAR AND THE FAST-FOOD COUNTER',
        panels: [
          ['THE REPORT', 'In a basketball-obsessed nation, Kobe Bryant, the "Black Mamba," became a hero to Filipino fans. At the counter, global chains like McDonald\'s and KFC competed for Filipino customers, while homegrown Jollibee grew its own influence beyond the country.'],
          ['LOCAL ANGLE', "Globalization ran both ways. The world's stars and brands came to the Philippines, and a Filipino brand went out to the world, buying chains abroad and following Filipinos overseas."],
        ],
        video: v('Kobe Bryant in Manila, or a 2000s fast-food commercial'),
        photos: ph('A Kobe jersey', 'A fast-food counter', 'A Chickenjoy meal'),
        ticker: ['SOURCES: ASSOCIATED PRESS VIA HONOLULU ADVERTISER (JULY 21, 2009)', "WIKIPEDIA (MCDONALD'S PHILIPPINES; JOLLIBEE GROUP)", 'SOUTH CHINA MORNING POST (2021)'],
      },
      cta: { title: 'VOX POP', text: "Kobe jersey or Jollibee Chickenjoy: what's your strongest 2000s memory? First name and city only." },
      parts: [
        {
          slug: 'mamba-in-manila', label: 'REPORT 1', cardTitle: 'MAMBA IN MANILA', cardLine: 'Kobe\'s 2009 visit and his "home away from home"',
          title: 'MAMBA IN MANILA', sub: 'REPORT 1: KOBE BRYANT\'S "HOME AWAY FROM HOME"',
          stats: [['JULY 21, 2009', 'Kobe arrives in Manila'], ['~1,000', 'fans greet him'], ['3RD', 'visit to the Philippines'], ['1 MONTH', 'after leading the Lakers to the NBA title']],
          panels: [
            ['THE REPORT', 'On July 21, 2009, one month after leading the Los Angeles Lakers to the NBA title, Kobe Bryant opened his Asian shoe tour in Manila. About 1,000 fans greeted him. He took off his shoes, signed them, and gave them away, then held a basketball clinic in Pasig. It was his third visit to the Philippines.'],
            ['LOCAL ANGLE', 'Bryant called the Philippines "like a home away from home" and said, "I am welcomed with open arms." Of Filipino fans, he said: "They love the game, and I love being around their energy."'],
          ],
          video: v("news footage of Kobe Bryant's 2009 Manila visit"),
          photos: ph('Fans in Manila', 'The basketball clinic'),
          cta: { title: 'WERE YOU THERE?', text: 'Did you see Kobe in person? Share your memory. First name and city only.' },
          ticker: ['SOURCES: ASSOCIATED PRESS VIA HONOLULU ADVERTISER (JULY 21, 2009)'],
        },
        {
          slug: 'chickenjoy-vs-the-burger', label: 'REPORT 2', cardTitle: 'CHICKENJOY VS. THE BURGER', cardLine: 'Where the local chain beat the global giant',
          title: 'CHICKENJOY VS. THE BURGER', sub: 'REPORT 2: WHERE THE LOCAL CHAIN BEAT THE GLOBAL GIANT',
          stats: [['#1', 'Jollibee leads Philippine fast food'], ['#2', "McDonald's, its main rival"], ['2002', "The Economist notes the rare market McDonald's doesn't lead"], ['2005', "McDonald's Philippines becomes 100% Filipino-owned"]],
          panels: [
            ['THE REPORT', "In most of the world, McDonald's led fast food. In the Philippines, Jollibee came first and McDonald's second. In 2002, The Economist noted the Philippines as one of the few markets where McDonald's was not the leader. In 2005, McDonald's Philippines became 100 percent Filipino-owned."],
            ['LOCAL ANGLE', "To compete, global chains went Filipino. McDonald's Philippines added local-style dishes to its menu, introducing McSpaghetti in 1986 and Chicken McDo in 1987."],
          ],
          video: v("a 2000s Jollibee or McDonald's TV commercial"),
          photos: ph('A Jollibee store', "A McDonald's meal"),
          ticker: ["SOURCES: WIKIPEDIA (MCDONALD'S PHILIPPINES)"],
        },
        {
          slug: 'jollibee-goes-global', label: 'REPORT 3', cardTitle: 'JOLLIBEE GOES GLOBAL', cardLine: 'From Chowking to Mang Inasal, and abroad',
          title: 'JOLLIBEE GOES GLOBAL', sub: 'REPORT 3: A FILIPINO BRAND BUYS INTO THE WORLD',
          stats: [['2000', 'buys Chowking'], ['2004', "buys China's Yonghe King"], ['2005', 'buys Red Ribbon'], ['2010', 'buys 70% of Mang Inasal for P3B']],
          panels: [
            ['THE REPORT', 'In the 2000s, Jollibee Foods Corporation grew by buying other chains. It bought Chowking in 2000, Red Ribbon in 2005, and the rest of Greenwich in 2006. Abroad, it bought Chinese chains Yonghe King in 2004 for $22.5 million and Hong Zhuang Yuan in 2007 for $50.5 million. In October 2010, it bought 70 percent of Mang Inasal for P3 billion.'],
            ['LOCAL ANGLE', "Globalization did not only bring foreign brands in. A Filipino company became a buyer in other countries, showing the Philippines' growing connections to the world."],
          ],
          video: v('a Jollibee commercial from the 2000s'),
          photos: ph('A Jollibee store abroad', 'A Mang Inasal meal'),
          cta: { title: 'YOUR ORDER', text: 'What was your go-to 2000s fast-food order? First name and city only.' },
          ticker: ['SOURCES: WIKIPEDIA (JOLLIBEE GROUP)'],
        },
      ],
    },
  ],
};

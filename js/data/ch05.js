// CH 05: Starstruck! (Performance), presented as a 2000s "Grand Finals" talent show.
// Each act is a contestant; each round is a part. Stats appear as the judges' scorecards.
// Vote codes on the channel page are for display only.
const v = (label) => ({ label, youtube: null });
const ph = (...captions) => captions.map((caption) => ({ caption, src: null }));

export default {
  num: '05',
  title: 'Starstruck!',
  aspect: 'Performance: the decade on stage',
  format: 'talent',
  bg: '#1a0838',
  showTitle: 'STARSTRUCK! THE 2000s GRAND FINALS',
  showSub: 'FIVE ACTS · ONE DECADE · YOU BE THE JUDGE',
  what: 'Performance is how people present themselves to an audience. In the 2000s, Filipino TV was one big stage: noontime shows, talent searches, bands, videoke, and primetime stars. Viewers did not just watch; they sang along, danced along, and voted.',
  felt: 'Loud, hopeful, and participatory. Anyone could be discovered on TV or sing their heart out at a videoke, but the spotlight also brought crowds, pressure, and public judgment.',
  episodes: [
    {
      slug: 'noontime-showdown',
      ep: 1,
      title: 'NOONTIME SHOWDOWN',
      cardSub: 'Variety shows and dance crazes at lunchtime',
      color: '#ffcf3a',
      overview: {
        sub: 'Variety shows and dance crazes at lunchtime',
        panels: [
          ['THE PERFORMANCE', 'At noon, Filipino TV turned into a party. Wowowee and Eat Bulaga mixed songs, games, and cash prizes, and their dance numbers spread to birthdays, Christmas parties, and even classrooms during breaks. Viewers were not only watching; they were dancing along and lining up to join.'],
          ["JUDGES' NOTES", "The biggest stars were often the audience, and big prizes drew big crowds. When up to 30,000 people massed for Wowowee's first anniversary in February 2006, the crush at the gate turned deadly."],
        ],
        video: v('a 2000s noontime show opening'),
        photos: ph('Eat Bulaga', 'A Wowowee host', 'Joey de Leon'),
        ticker: ['SOURCES: WIKIPEDIA (WOWOWEE)', 'THE SMART LOCAL (MAR 23, 2022)', 'PHILSTAR (FEB 5, 2006)'],
      },
      parts: [
        {
          slug: 'wowowee', label: 'ROUND 1', cardTitle: 'WOWOWEE!', cardLine: 'The noontime show that promised a jackpot',
          title: 'WOWOWEE!', sub: 'The noontime show that promised a jackpot',
          stats: [['FEB 5, 2005', 'Wowowee premieres on ABS-CBN'], ['~20%', 'its usual rating, sometimes topping 30%'], ['32.3%', "Willie's comeback episode, vs. 20.2% for Eat Bulaga"]],
          panels: [
            ['THE PERFORMANCE', 'Wowowee premiered on February 5, 2005, with Willie Revillame singing and dancing to open each show. Games like Willie of Fortune and Hep, Hep, Hooray put ordinary viewers on stage for cash, and the show usually rated about 20 percent, sometimes passing 30.'],
            ["JUDGES' NOTES", 'Its songs left the studio too. Lito Camo\'s "Boom Tarat Tarat," one of the show\'s theme songs, became a chant. In 2007, a senatorial candidate used it as his campaign jingle and said his awareness rating shot up to 90 percent.'],
          ],
          video: v('a Wowowee dance number'),
          photos: ph('A Wowowee host'),
          ticker: ['SOURCES: WIKIPEDIA (WOWOWEE)', 'PHILSTAR (MAR 21, 2007)'],
        },
        {
          slug: 'dance-craze', label: 'ROUND 2', cardTitle: 'DANCE CRAZE', cardLine: 'Otso-Otso, Spageti, Papaya, and more',
          title: 'DANCE CRAZE', sub: 'Otso-Otso, Spageti, Papaya, and more',
          stats: [['2003', 'the "Otso Otso mosh pit" at MYX Mo'], ['2007', 'Papaya and Itaktak Mo take over'], ['2008', 'Kagat Labi, born from an ad-lib']],
          panels: [
            ['THE PERFORMANCE', "Novelty dance songs ruled radio in 2004, from Otso Otso and Pamela One to Jumbo Hot Dog and the SexBomb Girls' Spageti. Bayani Agbayani's Otso Otso got a whole crowd moving at the 2003 MYX Mo festival, and Spageti became the go-to dance at birthdays and Christmas parties."],
            ["JUDGES' NOTES", "The crazes kept coming. Edu Manzano's Papaya (2007), from Pilipinas, Game KNB?, was later called \"the new Macarena\" on Good Morning America, and Eat Bulaga's Itaktak Mo (2007) and Kagat Labi (2008) were copied in classrooms during breaks. By mid-2005, though, rock songs had pushed novelty tunes off the top of the radio."],
          ],
          video: v('a 2000s dance craze performance'),
          photos: ph('Joey de Leon', 'Eat Bulaga'),
          ticker: ['SOURCES: THE SMART LOCAL (MAR 23, 2022)', 'PHILSTAR (JUNE 17, 2005)'],
        },
        {
          slug: 'the-verdict', label: 'ROUND 3', cardTitle: 'THE VERDICT', cardLine: 'When the crowd became the show',
          title: 'THE VERDICT', sub: 'When the crowd became the show',
          stats: [['FEB 4, 2006', 'stampede at the ULTRA arena in Pasig'], ['73', 'people killed'], ['30,000', 'people massed for the anniversary taping']],
          panels: [
            ['THE PERFORMANCE', "For Wowowee's first anniversary, the show promised cash and prizes, including a P1-million jackpot, jeepneys, and houses. Some fans camped outside the ULTRA stadium for days, and up to 30,000 people massed to get into the taping."],
            ["JUDGES' NOTES", 'Before dawn on February 4, 2006, the crowd surged toward a single narrow entrance. Seventy-three people were killed and at least 359 were injured. "We were hoping to get a chance to win some money," one survivor said. The show returned in March 2006 and ran until 2010.'],
          ],
          video: v('a 2006 news report'),
          photos: [],
          ticker: ['SOURCES: PHILSTAR (FEB 5, 2006)', 'AL JAZEERA (FEB 4, 2006)', 'WIKIPEDIA (WOWOWEE)'],
        },
      ],
    },
    {
      slug: 'text-to-vote',
      ep: 2,
      title: 'TEXT TO VOTE',
      cardSub: 'Reality talent searches that let viewers decide',
      color: '#19B5F0',
      overview: {
        sub: 'Reality talent searches that let viewers decide',
        panels: [
          ['THE PERFORMANCE', 'The 2000s turned the audience into the judges. Star searches, Pinoy Big Brother, Pinoy Dream Academy, and Pilipinas Got Talent let viewers pick winners by text, and ordinary Filipinos became stars overnight.'],
          ["JUDGES' NOTES", 'Contestants did not just perform songs; they performed themselves, on camera all day in some shows, for an audience that voted. Winning often meant being the most liked, not only the most talented.'],
        ],
        video: v('a 2000s reality show'),
        photos: ph('A star search winner', 'Reality TV stars', 'The PBB house'),
        ticker: ['SOURCES: WIKIPEDIA (PINOY BIG BROTHER: SEASON 1; PINOY DREAM ACADEMY SEASON 1; PILIPINAS GOT TALENT SEASON 1)', 'PEP.PH (MAY 24, 2019)'],
      },
      parts: [
        {
          slug: 'star-search', label: 'ROUND 1', cardTitle: 'STAR SEARCH SEASON', cardLine: 'From Star in a Million to Pinoy Dream Academy',
          title: 'STAR SEARCH SEASON', sub: 'From Star in a Million to Pinoy Dream Academy',
          stats: [['2003', 'Erik Santos wins Star in a Million'], ['697,648', 'votes for Yeng Constantino, 2006'], ['37.32%', 'her share of the final vote']],
          panels: [
            ['THE PERFORMANCE', 'In the early 2000s, networks ran star search after star search, from Star for a Night and Star in a Million to StarStruck and Star Circle Quest. Erik Santos won Star in a Million in 2003. A young Yeng Constantino tried out for several of them and was turned down.'],
            ["JUDGES' NOTES", "Yeng kept trying. On December 16, 2006, at the Araneta Coliseum, she was named Pinoy Dream Academy's first Grand Star Dreamer with 697,648 votes, 37.32 percent of the total. On the show, the scholar with the most text votes was saved from expulsion."],
          ],
          video: v('a star search finale'),
          photos: ph('Erik Santos'),
          ticker: ['SOURCES: PEP.PH (MAY 24, 2019)', 'WIKIPEDIA (PINOY DREAM ACADEMY SEASON 1)'],
        },
        {
          slug: 'bahay-ni-kuya', label: 'ROUND 2', cardTitle: 'BAHAY NI KUYA', cardLine: 'Pinoy Big Brother and the 24-hour stage',
          title: 'BAHAY NI KUYA', sub: 'Pinoy Big Brother and the 24-hour stage',
          stats: [['AUG 21, 2005', 'Pinoy Big Brother premieres'], ['112 DAYS', 'in the house'], ['48.9%', "Nene Tamayo's winning share"]],
          panels: [
            ['THE PERFORMANCE', 'Pinoy Big Brother premiered on ABS-CBN on August 21, 2005, putting a dozen strangers in a house across from the network\'s studios in Quezon City, on camera for 112 days. Its theme song was Orange & Lemons\' "Pinoy Ako."'],
            ["JUDGES' NOTES", 'On December 10, 2005, Nene Tamayo won with 554,906 votes, or 48.9 percent, taking home a prize package worth P6 million. In this show the performance never stopped: viewers judged how housemates acted every day, not just how they sang.'],
          ],
          video: v('Pinoy Big Brother, 2005'),
          photos: ph('Reality TV stars', 'The PBB house'),
          ticker: ['SOURCES: WIKIPEDIA (PINOY BIG BROTHER: SEASON 1; ORANGE AND LEMONS)'],
        },
        {
          slug: 'got-talent', label: 'ROUND 3', cardTitle: 'PILIPINAS GOT TALENT', cardLine: 'Singers, dancers, and more from every province',
          title: 'PILIPINAS GOT TALENT', sub: 'Singers, dancers, and more from every province',
          stats: [['FEB 20, 2010', 'premiere on ABS-CBN'], ['16', "Jovit Baldivino's age when he won"], ['48.41%', 'his share of the Grand Finals vote']],
          panels: [
            ['THE PERFORMANCE', 'Pilipinas Got Talent premiered on February 20, 2010, with hosts Billy Crawford and Luis Manzano and judges Freddie M. Garcia, Kris Aquino, and Ai-Ai delas Alas. Acts from across the country competed, and viewers voted by SMS and online.'],
            ["JUDGES' NOTES", 'On June 13, 2010, 16-year-old Jovit Baldivino from Batangas won with 48.41 percent of the vote. In the semifinals, the top-voted act went straight to the finals while the judges picked the rest, a mix of public vote and expert opinion.'],
          ],
          video: v('a Pilipinas Got Talent audition'),
          photos: [],
          ticker: ['SOURCES: WIKIPEDIA (PILIPINAS GOT TALENT SEASON 1)'],
        },
      ],
    },
    {
      slug: 'band-explosion',
      ep: 3,
      title: 'BAND EXPLOSION',
      cardSub: 'When Pinoy bands took over the airwaves',
      color: '#ff4d5e',
      overview: {
        sub: 'When Pinoy bands took over the airwaves',
        panels: [
          ['THE PERFORMANCE', 'By mid-2005, Pinoy bands ruled the radio. Hale, Cueshé, Sponge Cola, Orange & Lemons, Kitchie Nadal, and Mayonnaise filled playlists and MYX played their videos, alongside Kamikazee, Wolfgang, and many more.'],
          ["JUDGES' NOTES", 'A band was a performance of image too. Clean-cut "pogi rock" acts drew teenage fans with love songs and boy-next-door looks, and some critics said they were known more for their looks than their music.'],
        ],
        video: v('a 2000s Pinoy band music video'),
        photos: ph('Kitchie Nadal', 'Bamboo', 'Rivermaya'),
        ticker: ['SOURCES: PHILSTAR (JUNE 17, 2005)', 'WIKIPEDIA (POGI ROCK)'],
      },
      parts: [
        {
          slug: 'rock-takes-over', label: 'ROUND 1', cardTitle: 'ROCK TAKES OVER', cardLine: 'From novelty songs to band anthems',
          title: 'ROCK TAKES OVER', sub: 'From novelty songs to band anthems',
          stats: [['JUNE 2004', 'novelty songs top the radio'], ['JUNE 2005', 'Pinoy rock takes over'], ['12', "band songs in one critic's June 2005 radio list"]],
          panels: [
            ['THE PERFORMANCE', 'In June 2004, radio was full of novelty songs like Otso Otso, Jumbo Hot Dog, and Spageti. A year later, a Philstar critic heard something new: Hale\'s "The Day You Said Goodnight," Cueshé\'s "Stay," Mayonnaise\'s "Jopay," Sponge Cola\'s "KLSP," Orange & Lemons\' "Hanggang Kailan," and Bamboo\'s "Hallelujah."'],
            ["JUDGES' NOTES", 'She wrote that the novelty song "has given way to rock music." Even so, the top-selling album she named was neither: an orchestral set of Great Filipino Love Songs, and she said the industry still needed more buyers.'],
          ],
          video: v('a 2005 band music video'),
          photos: ph('Kitchie Nadal', 'Bamboo'),
          ticker: ['SOURCES: PHILSTAR (JUNE 17, 2005)'],
        },
        {
          slug: 'pogi-rock', label: 'ROUND 2', cardTitle: 'POGI ROCK', cardLine: 'Love songs, clean looks, screaming fans',
          title: 'POGI ROCK', sub: 'Love songs, clean looks, screaming fans',
          stats: [['1998', 'Cueshé forms in Cebu'], ['2x PLATINUM', 'Half Empty Half Full (2005)'], ['2006', '"Stay" wins MYX Favorite Song']],
          panels: [
            ['THE PERFORMANCE', 'Cueshé formed in Cebu in 1998, and its debut album Half Empty Half Full (2005) went double platinum. "Stay" won BOMB FM\'s Song of the Year in 2005 and MYX\'s Favorite Song in 2006. With Hale and Callalily, they were tagged "pogi rock": love songs, heartbreak anthems, and boy-next-door looks, all over radio and MYX.'],
            ["JUDGES' NOTES", 'Some critics said these bands were too good-looking to be taken seriously. Sponge Cola\'s Yael Yuzon had a reply: "At least, we were called pogi rock, not pangit rock."'],
          ],
          video: v('a pogi rock band performance'),
          photos: ph('A band crowd'),
          ticker: ['SOURCES: WIKIPEDIA (CUESHÉ; POGI ROCK)'],
        },
        {
          slug: 'pinoy-ako', label: 'ROUND 3', cardTitle: 'PINOY AKO?', cardLine: 'A hit theme song and a borrowed melody',
          title: 'PINOY AKO?', sub: 'A hit theme song and a borrowed melody',
          stats: [['MAR 2005', '"Hanggang Kailan" is released'], ['AUG 1, 2005', '"Pinoy Ako" released for PBB'], ['2007', 'Orange & Lemons disband']],
          panels: [
            ['THE PERFORMANCE', 'Orange & Lemons, formed in 1999, broke through with "Hanggang Kailan" in March 2005 and won Artist of the Year at the 2005 NU Rock Awards. ABS-CBN then asked them to write the theme for Pinoy Big Brother, and "Pinoy Ako" came out on August 1, 2005.'],
            ["JUDGES' NOTES", 'Listeners soon said its melody and arrangement sounded like "Chandeliers," an obscure 1980s song by the English band Care. Years later, in 2021, Clem Castro said he had "subconsciously" applied its chord patterns. The band split in 2007.'],
          ],
          video: v('Pinoy Ako live, 2005'),
          photos: [],
          ticker: ['SOURCES: WIKIPEDIA (ORANGE AND LEMONS)'],
        },
      ],
    },
    {
      slug: 'videoke-nation',
      ep: 4,
      title: 'VIDEOKE NATION',
      cardSub: 'Five pesos a song, and everyone is a singer',
      color: '#E83BD0',
      overview: {
        sub: 'Five pesos a song, and everyone is a singer',
        panels: [
          ['THE PERFORMANCE', 'In the 2000s, anyone could take the stage. Videoke stalls stood on street corners, in markets, and in malls, and even remote barangays had a place to sing. At home, a Magic Sing mic turned birthdays and fiestas into concerts.'],
          ["JUDGES' NOTES", 'The machine kept score, and so did the crowd. Singing was fun, but it was also public, loud, and sometimes taken too seriously.'],
        ],
        video: v('a 2000s videoke commercial'),
        photos: ph('Videoke machines in a mall'),
        ticker: ['SOURCES: PCIJ (MAR-APR 2008)', 'WIKIPEDIA (MAGIC MIC)', 'WIKIPEDIA (MY WAY KILLINGS)'],
      },
      parts: [
        {
          slug: 'five-pesos-a-song', label: 'ROUND 1', cardTitle: 'FIVE PESOS A SONG', cardLine: 'Videoke on every corner',
          title: 'FIVE PESOS A SONG', sub: 'Videoke on every corner',
          stats: [['P5', 'per song at a videoke bar, 2008'], ['P1,500', 'to rent a unit overnight'], ['1975', "del Rosario's Sing-Along System"]],
          panels: [
            ['THE PERFORMANCE', 'By 2008, singing at a videoke bar could cost as little as five pesos a song, and renting a whole unit overnight cost about P1,500. Stalls stood on street corners, in neighborhood markets, and in malls, and even remote barangays had a videoke or karaoke joint.'],
            ["JUDGES' NOTES", 'Many Filipinos call it a homegrown invention. Businessman Roberto del Rosario built his "sing-along system" in 1975, patented it in 1983, and reportedly won a Supreme Court ruling recognizing him as its inventor, though Japan\'s Daisuke Inoue also claims karaoke\'s beginnings.'],
          ],
          video: v('a 2000s videoke commercial'),
          photos: ph('Videoke machines in a mall'),
          ticker: ['SOURCES: PCIJ (MAR-APR 2008)'],
        },
        {
          slug: 'magic-sing', label: 'ROUND 2', cardTitle: 'MAGIC SING', cardLine: 'The microphone that brought the songbook home',
          title: 'MAGIC SING', sub: 'The microphone that brought the songbook home',
          stats: [['2000', 'the first Magic Sing mic'], ['2006', 'the first fully wireless model'], ['1 TV', 'all you needed to plug it into']],
          panels: [
            ['THE PERFORMANCE', "Enter Tech's first portable karaoke microphone, Magic Sing, came out in 2000, with the songs built into the mic itself. Plug it into a TV and a living room became a videoke bar. A fully wireless model followed in 2006."],
            ["JUDGES' NOTES", 'Singing moved from bars into homes. Birthdays, fiestas, hotels, restaurants, and family celebrations all became places to perform, and almost every party had its own lineup of singers.'],
          ],
          video: v('a Magic Sing commercial'),
          photos: ph('Sarah Geronimo'),
          ticker: ['SOURCES: WIKIPEDIA (MAGIC MIC)'],
        },
        {
          slug: 'my-way', label: 'ROUND 3', cardTitle: 'MY WAY', cardLine: 'When the videoke got serious',
          title: 'MY WAY', sub: 'When the videoke got serious',
          stats: [['6+', 'killings tied to "My Way," per a 2010 NYT count'], ['2007', 'bars reportedly drop the song'], ['P5', 'the price of one song']],
          panels: [
            ['THE PERFORMANCE', 'Not every performance ended in applause. By 2007, some videoke bars had reportedly pulled Frank Sinatra\'s "My Way" from their song lists because it so often led to fistfights.'],
            ["JUDGES' NOTES", 'In February 2010, The New York Times counted at least six killings linked to singing the song. Explanations varied, from its sheer popularity in bars where fights were common to the pride in its lyrics. The stage was open to everyone, and so was the judgment.'],
          ],
          video: v('a family videoke night'),
          photos: [],
          ticker: ['SOURCES: PCIJ (MAR-APR 2008)', 'WIKIPEDIA (MY WAY KILLINGS)', 'NEW YORK TIMES (FEB 7, 2010)'],
        },
      ],
    },
    {
      slug: 'primetime-heroes',
      ep: 5,
      title: 'PRIMETIME HEROES',
      cardSub: 'Superheroes, fantaseryes, and love teams after dinner',
      color: '#4cd964',
      overview: {
        sub: 'Superheroes, fantaseryes, and love teams after dinner',
        panels: [
          ['THE PERFORMANCE', 'After dinner, families gathered for primetime, and the decade\'s heroes came from Filipino komiks and the network studios. Darna flew on GMA in 2005 and Captain Barbell followed in 2006, while ABS-CBN answered with Panday in 2005 and a 9-year-old Super Inggo in 2006. Love teams like John Lloyd Cruz and Bea Alonzo made viewers kilig between the fights.'],
          ["JUDGES' NOTES", 'Primetime asked stars to perform beyond the script. Heroes had to look the part, and love teams were sold as couples off-screen too.'],
        ],
        video: v('a 2006 primetime superhero teaser'),
        photos: ph('Darna', 'Primetime love team', 'The family TV'),
        ticker: ['SOURCES: WIKIPEDIA (DARNA; SUPER INGGO; CAPTAIN BARBELL; PANDAY; LOVE TEAM)', 'PHILSTAR (AUG 21, 2006)'],
      },
      parts: [
        {
          slug: 'super-inggo', label: 'ROUND 1', cardTitle: 'SUPER INGGO', cardLine: 'A 9-year-old superhero on primetime',
          title: 'SUPER INGGO', sub: 'A 9-year-old superhero on primetime',
          stats: [['AUG 28, 2006', 'Super Inggo premieres'], ['1,000', 'kids who auditioned for the lead'], ['#2', 'in nationwide Nielsen ratings']],
          panels: [
            ['THE PERFORMANCE', "Super Inggo premiered on ABS-CBN's Primetime Bida on August 28, 2006. It followed Budong, a street-smart boy who discovers he has superpowers. Nine-year-old Makisig Morales, a Little Big Star finalist with a blue belt in karate, beat 1,000 children for the lead with a high-flying kick."],
            ["JUDGES' NOTES", 'The show ranked number 2 in nationwide Nielsen ratings and ran 120 episodes until February 2007, followed by Super Inggo 1.5 in 2007 and an animated series in 2009. Children and families tuned in for a homegrown kid hero.'],
          ],
          video: v('the Super Inggo theme song'),
          photos: [],
          ticker: ['SOURCES: WIKIPEDIA (SUPER INGGO)', 'PHILSTAR (AUG 21, 2006)'],
        },
        {
          slug: 'darna-fever', label: 'ROUND 2', cardTitle: 'DARNA FEVER', cardLine: 'Telefantasya and the body of a superhero',
          title: 'DARNA FEVER', sub: 'Telefantasya and the body of a superhero',
          stats: [['APR 4, 2005', 'Darna premieres on GMA'], ['47.1%', 'pilot rating, called a Philippine TV record'], ['52.1%', 'peak rating, April 7, 2005']],
          panels: [
            ['THE PERFORMANCE', "GMA's Darna premiered on April 4, 2005, with Angel Locsin as Mars Ravelo's heroine. Its pilot drew a 47.1 percent Mega Manila rating, called the highest for any pilot on Philippine TV, and it peaked at 52.1 percent three days later."],
            ["JUDGES' NOTES", 'Playing a superhero meant fitting the costume. Iza Calzado was first approached for the role, but because she would have had to lose weight to wear the suit, it went to Locsin. Even heroes faced the body standards from CH 04.'],
          ],
          video: v('a 2005 Darna teaser'),
          photos: ph('Angel Locsin'),
          ticker: ['SOURCES: WIKIPEDIA (DARNA, 2005 TV SERIES)'],
        },
        {
          slug: 'reel-to-real', label: 'ROUND 3', cardTitle: 'REEL TO REAL', cardLine: 'Love teams and the performance of romance',
          title: 'REEL TO REAL', sub: 'Love teams and the performance of romance',
          stats: [['2007', 'One More Chance: Popoy and Basha'], ['JULY 30, 2008', 'A Very Special Love opens'], ['#1', 'Filipino film of 2008 at the box office']],
          panels: [
            ['THE PERFORMANCE', "Love teams were pairings built to sell. John Lloyd Cruz and Bea Alonzo became Popoy and Basha in One More Chance (2007), John Lloyd and Sarah Geronimo's A Very Special Love (2008) was the year's highest-grossing Filipino film, and Erich Gonzales and Enchong Dee led ABS-CBN's Katorse in 2009."],
            ["JUDGES' NOTES", 'Fans often wanted their favorite pairs to be real couples, and some pushed for it. Critics say love teams pressure actors to keep up a romantic image off-screen and make it hard to take other roles. The kilig was a performance too.'],
          ],
          video: v('a 2008 love team movie trailer'),
          photos: ph('John Lloyd Cruz', 'Sarah Geronimo'),
          ticker: ['SOURCES: WIKIPEDIA (LOVE TEAM; A VERY SPECIAL LOVE; KATORSE)'],
        },
      ],
    },
  ],
};

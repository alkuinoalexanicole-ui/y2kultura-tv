// CH 04: Style File (Body and Self-Image), presented as a 2000s teen magazine.
// Slogans are invented for the museum; no real brands are used.
// An ad without `overview` shows on the channel page as "coming up after the break."
const v = (label) => ({ label, youtube: null });
const ph = (...captions) => captions.map((caption) => ({ caption, src: null }));

export default {
  num: '04',
  title: 'Style File',
  aspect: 'Body and self-image: the looks the 2000s sold us',
  format: 'mag',
  bg: '#3a1a5c',
  what: 'Body and self-image is how people see their own looks, and what shapes that view. In the 2000s, celebrities, fashion, beauty products, and fitness on TV told Filipinos what "beautiful" and "handsome" should look like.',
  felt: 'Exciting and pressured at once. A new haircut from a teleserye or a pair of low-rise jeans could make you feel in style, while ads and public judgment set standards that not everyone could, or should have to, meet.',
  episodes: [
    {
      slug: 'maputi-at-unat',
      ep: 1,
      title: '"MAPUTI AT UNAT!"',
      cardSub: 'Skin whitening and hair rebonding',
      fine: '*Beauty standards sold separately.',
      color: '#ffffff',
      overview: {
        sub: 'Skin whitening and hair rebonding',
        panels: [
          ['THE PITCH', 'In the 2000s, whitening lotions and soaps filled store shelves and TV ad breaks, and salons promised sleek, straight hair through rebonding. The decade had a deep preference for lighter skin and rebonded hair.'],
          ['REALITY CHECK', 'These looks were sold as "beautiful," but they were standards with a long history, not natural facts. They told many Filipinos that their own brown skin and wavy or curly hair needed fixing.'],
        ],
        video: v('a 2000s beauty or hair salon commercial'),
        photos: ph('A whitening product shelf', 'A salon chair', 'A before-and-after ad'),
        ticker: ['SOURCES: ESQUIRE PHILIPPINES (2019)', 'INQUIRER PLUS', 'JOURNAL OF PUBLIC HEALTH POLICY (2013)', 'WIKIPEDIA (HAIR STRAIGHTENING)'],
      },
      parts: [
        {
          slug: 'whitening-boom', label: 'SPOT 1', cardTitle: 'THE WHITENING BOOM', cardLine: 'A market that took off in the 2000s',
          title: 'THE WHITENING BOOM', sub: 'Lotions, soaps, and the promise of fairer skin', fine: '*Results not typical. Side effects not advertised.',
          stats: [['2004', 'whitening was still an "emerging market"'], ['400+ YEARS', 'how far back the preference for fair skin goes'], ['2009', 'law creating the Philippine FDA (RA 9711)']],
          panels: [
            ['THE PITCH', 'In 2004, the skin-whitening industry in the Philippines was still described as an emerging market. By 2010, store shelves were full of whitening soaps, creams, and powders, major brands sold them in single-use sachets, and makers were moving into sari-sari stores.'],
            ['REALITY CHECK', 'A public health study of Filipino whitening consumers found adulterated and misbranded products, and that cheaper, toxic whiteners could undercut safer ones. Regulation tried to keep up: the law creating the Philippine FDA passed in 2009.'],
          ],
          video: v('a news report on whitening products'),
          photos: ph('Whitening soaps', 'A drugstore aisle'),
          ticker: ['SOURCES: ESQUIRE PHILIPPINES (2019)', 'GMA NEWS (JAN 29, 2010)', 'JOURNAL OF PUBLIC HEALTH POLICY (2013)'],
        },
        {
          slug: 'the-rebond-era', label: 'SPOT 2', cardTitle: 'THE REBOND ERA', cardLine: 'How the straight-hair look took over',
          title: 'THE REBOND ERA', sub: 'The decade of pin-straight hair', fine: '*Treatment takes 4 to 8 hours. Do not wash for 3 days.',
          stats: [['#1', "the 2000s' most achieved hairstyle"], ['4-8 HRS', 'for one rebonding treatment'], ['3 DAYS', 'no washing after treatment']],
          panels: [
            ['THE PITCH', 'Rebonding became the decade\'s most achieved look, giving sleek, pin-straight hair that signaled neatness, professionalism, and a modern polish. The name "rebonding" is how this treatment is known in the Philippines and nearby countries.'],
            ['REALITY CHECK', "Rebonding uses chemicals to loosen the hair's bonds, then heat to reset them straight, over 4 to 8 hours. It can damage hair from the heat and cause scalp irritation or hair loss."],
          ],
          video: v('a 2000s salon rebonding segment'),
          photos: ph('Pin-straight hair', 'A flat iron'),
          ticker: ['SOURCES: INQUIRER PLUS', 'WIKIPEDIA (HAIR STRAIGHTENING)'],
        },
        {
          slug: 'reality-check', label: 'SPOT 3', cardTitle: 'REALITY CHECK', cardLine: 'The colonial roots behind the standard',
          title: 'REALITY CHECK', sub: 'Where "fair" and "straight" came from', fine: '*This message is not sponsored.',
          stats: [['300+ YEARS', 'of Spanish rule ranking people by skin color'], ['DOÑA VICTORINA', "Rizal's satire of the fair-skin obsession"], ['~5%', 'European ancestry in Filipinos, per National Geographic']],
          panels: [
            ['WHERE IT CAME FROM', "Under Spanish rule, brown-skinned indios were placed in the lower classes while Spaniards and mestizos held privilege. Rizal mocked this in Noli Me Tangere through Doña Victorina, a brown-skinned woman who caked on white makeup to pass as Spanish. Researchers link today's whitening market to this post-colonial history."],
            ['REALITY CHECK', 'Filipinos are mostly of Malay descent, with only about 5 percent European ancestry. Yet film and TV long cast fair-skinned mestizos as leads and darker-skinned actors as maids and drivers. Brown skin and natural curls were never the problem; the standard was.'],
          ],
          video: v('a discussion on colorism in the Philippines'),
          photos: ph('Noli Me Tangere', 'Morena and proud'),
          ticker: ['SOURCES: ESQUIRE PHILIPPINES (2019)', 'JOURNAL OF PUBLIC HEALTH POLICY (2013)'],
        },
      ],
    },
    {
      slug: 'low-rise-high-style',
      ep: 2,
      title: '"LOW-RISE, HIGH STYLE!"',
      cardSub: 'Low-rise jeans and branded streetwear',
      fine: '*Logo must be visible at all times.',
      color: '#19B5F0',
      overview: {
        sub: 'Low-rise jeans and branded streetwear',
        panels: [
          ['THE PITCH', 'In the 2000s, the mall was the runway. Jeans sat inches below the navel, and local brands like Bench and Penshoppe put their names on T-shirts and on giant billboards along EDSA. Wearing the brand said you were in style.'],
          ['REALITY CHECK', 'The jeans were cut to show skin at the waist, putting bodies on display, and the logo mattered as much as the clothes. Not everyone could pay mall prices, so copies with the same logos filled tiangges, and authorities raided stalls selling fakes.'],
        ],
        video: v('a 2000s clothing brand commercial'),
        photos: ph('A mall', 'Low-rise jeans', 'A graphic tee'),
        ticker: ['SOURCES: RADAR (SEPT 7, 2026)', 'WIKIPEDIA (LOW-RISE FASHION)', 'PHILSTAR (OCT 31, 2005)'],
      },
      parts: [
        {
          slug: 'illegally-low', label: 'SPOT 1', cardTitle: 'ILLEGALLY LOW', cardLine: 'The jeans that sat below the navel',
          title: 'ILLEGALLY LOW', sub: 'The jeans that sat below the navel', fine: '*Bend over at your own risk.',
          stats: [['DEC 2000', "Levi's introduces low-rise jeans"], ['~8 IN', 'low-rise rise, vs. about 12 for regular pants'], ['2001-2007', 'the years of the visible "whale tail"']],
          panels: [
            ['THE PITCH', "Levi's introduced low-rise jeans in December 2000, with the top sitting about three inches below the navel, and Britney Spears helped make them the look of the early 2000s. In Manila's malls, Folded & Hung, launched in 1998, pushed the style with its provocative \"Illegally Low Jean\" campaign."],
            ['REALITY CHECK', 'A low-rise pair has a rise of roughly 8 inches, against about 12 for regular pants. Sit or bend and underwear showed. From 2001 to 2007 the visible thong even had a nickname, the "whale tail," before the trend declined after 2007.'],
          ],
          video: v('a 2000s denim fashion show'),
          photos: ph('Low-rise jeans', 'A mall'),
          ticker: ['SOURCES: WIKIPEDIA (LOW-RISE FASHION)', 'RADAR (SEPT 7, 2026)'],
        },
        {
          slug: 'wear-the-logo', label: 'SPOT 2', cardTitle: 'WEAR THE LOGO', cardLine: 'Mall brands, billboards, and big names',
          title: 'WEAR THE LOGO', sub: 'Mall brands, billboards, and big names', fine: '*Celebrity not included.',
          stats: [['1987', 'Bench opens its first outlet'], ['2002', 'Mandy Moore signs with Penshoppe'], ['NOV 2003', "F4's Jerry Yan becomes a Bench endorser"]],
          panels: [
            ['THE PITCH', "Bench began in 1987 selling men's T-shirts, and Penshoppe started in Cebu in 1986. In the 2000s both chased star power: Penshoppe signed Mandy Moore in 2002, and Bench presented Meteor Garden's Jerry Yan as its newest endorser in November 2003. Their billboards along EDSA worked like a giant runway."],
            ['LOCAL ANGLE', 'A logo turned a plain shirt into a statement about who you were. In 2009, Bench\'s Pinoy Lab line even sold "I am Ninoy" and "I am Cory" shirts, a sign of how far wearing a message on your chest had gone.'],
          ],
          video: v('a 2000s Bench commercial'),
          photos: ph('Billboards along EDSA', 'A graphic tee'),
          ticker: ['SOURCES: WIKIPEDIA (BENCH; PENSHOPPE)', 'PHILSTAR (NOV 9, 2003)', 'PHILSTAR (NOV 13, 2009)', 'RADAR (SEPT 7, 2026)'],
        },
        {
          slug: 'reality-check', label: 'SPOT 3', cardTitle: 'REALITY CHECK', cardLine: 'The logo, the copy, and the price',
          title: 'REALITY CHECK', sub: 'The logo, the copy, and the price', fine: '*Original price available upon request.',
          stats: [['7,500+', 'fake Lacoste pieces seized in Greenhills, 2005'], ['P2.6M', 'value of the goods in that one raid'], ['13', 'stalls raided']],
          panels: [
            ['THE PITCH', 'If the logo made the outfit, then any shirt with the right logo would do. Tiangges in Greenhills and bargain malls in Divisoria offered look-alike branded clothes for less.'],
            ['REALITY CHECK', 'In October 2005, the NBI raided 13 stalls at Greenhills Shopping Center and seized more than 7,500 pieces of fake Lacoste clothing worth about P2.6 million. Chasing the logo pushed some shoppers toward copies, and it set a standard that said your worth showed on your shirt.'],
          ],
          video: v('a 2000s bargain mall'),
          photos: ph('A tiangge', 'Greenhills'),
          ticker: ['SOURCES: PHILSTAR (OCT 31, 2005)'],
        },
      ],
    },
    {
      slug: 'pang-f4-na-buhok',
      ep: 3,
      title: '"PANG-F4 NA BUHOK!"',
      cardSub: 'Asianovela hairstyles and fashion',
      fine: '*As seen on afternoon TV.',
      color: '#FFD21F',
      overview: {
        sub: 'Asianovela hairstyles and fashion',
        panels: [
          ['THE PITCH', 'Asianovelas did more than tell love stories. When Meteor Garden\'s F4, and later the F4 of Boys Over Flowers, reached Filipino TV, their hair, clothes, and faces became the decade\'s picture of a "gwapo" guy, and fans copied the look.'],
          ['REALITY CHECK', 'The look came from a "flower boy" ideal of smooth, fair skin and silky, styled hair. Few Filipino boys looked like that naturally, and the market was ready with products to close the gap.'],
        ],
        video: v('a 2000s ad with an Asianovela star'),
        photos: ph('F4', 'Gu Jun-pyo', 'Yoon Ji-hoo'),
        ticker: ['SOURCES: PHILSTAR (SEPT 20, 2003)', 'THE SUMMIT EXPRESS (FEB 3, 2025)', 'PEP.PH (APR 21, 2020)', 'WIKIPEDIA (KKONMINAM)'],
      },
      parts: [
        {
          slug: 'the-f4-flow', label: 'SPOT 1', cardTitle: 'THE F4 FLOW', cardLine: 'Meteor Garden and the long-hair comeback',
          title: 'THE F4 FLOW', sub: 'Meteor Garden and the long-hair comeback', fine: '*Bandana sold separately.',
          stats: [['2003', 'Meteor Garden fever peaks in Manila'], ['NOV 2003', 'Jerry Yan joins Bench'], ['DEC 26, 2003', 'F4 concert at PhilSports Arena']],
          panels: [
            ['THE PITCH', 'When Meteor Garden hit Filipino TV, F4 "brought back long hair." Fans copied Dao Ming Si\'s forehead bandana and the F4 hairstyles, while posters, songbooks, notebooks, and keychains flooded the market.'],
            ['LOCAL ANGLE', 'In November 2003, Jerry Yan, who played Dao Ming Si, came to Manila as Bench\'s newest endorser, wearing a simple white Bench T-shirt and maong pants, and met President Arroyo at Malacañang. F4 played Manila\'s PhilSports Arena on December 26, 2003.'],
          ],
          video: v('F4 in Manila'),
          photos: ph('Vanness Wu', 'Vic Chou'),
          ticker: ['SOURCES: PHILSTAR (SEPT 20, 2003)', 'PHILSTAR (NOV 9, 2003)', 'THE SUMMIT EXPRESS (FEB 3, 2025)', 'WIKIPEDIA (LIST OF F4 LIVE PERFORMANCES)'],
        },
        {
          slug: 'the-jun-pyo-curl', label: 'SPOT 2', cardTitle: 'THE JUN PYO CURL', cardLine: 'Boys Over Flowers and the 2009 makeover',
          title: 'THE JUN PYO CURL', sub: 'Boys Over Flowers and the 2009 makeover', fine: '*Curls not guaranteed.',
          stats: [['MAY 11, 2009', 'Boys Over Flowers premieres on ABS-CBN'], ['34.1%', 'its peak rating, June 24, 2009'], ['2', 'reruns on ABS-CBN in 2009-2010']],
          panels: [
            ['THE PITCH', "Boys Over Flowers, the Korean version of the Meteor Garden story, premiered on ABS-CBN on May 11, 2009, peaked at a 34.1 percent rating on June 24, and was rerun twice. Lee Min-ho's curly hairstyle as Gu Jun-pyo was mocked at first, then became a huge hit in Korea."],
            ['LOCAL ANGLE', 'In Korea, the show pushed many men to take their looks more seriously, with more men wearing cosmetics, preppy outfits, and pink or floral clothes. A new F4 meant a new standard of handsome for a new set of Filipino fans.'],
          ],
          video: v('Boys Over Flowers on ABS-CBN'),
          photos: ph('Lee Min-ho', 'Kim Hyun-joong'),
          ticker: ['SOURCES: PEP.PH (APR 21, 2020)', 'WIKIPEDIA (BOYS OVER FLOWERS)', 'SOOMPI (OCT 21, 2013)'],
        },
        {
          slug: 'reality-check', label: 'SPOT 3', cardTitle: 'REALITY CHECK', cardLine: 'Who gets to be "gwapo"?',
          title: 'REALITY CHECK', sub: 'Who gets to be "gwapo"?', fine: '*Gwapo is not one look.',
          stats: [['40%', "men's share of Filipino beauty-care buyers, 2005"], ['10%', 'their share about a decade earlier'], ['"PUMUPUTI KA YATA"', "a line from a men's whitening ad"]],
          panels: [
            ['WHERE IT CAME FROM', 'The F4 look grew from the Korean "kkonminam," or flower boy, ideal: smooth, fair skin, silky hair, and a soft manner. Asianovelas carried that ideal into Filipino living rooms.'],
            ['REALITY CHECK', 'By 2005, men made up about 40 percent of Filipino beauty-care buyers, up from 10 percent a decade earlier, and growth in men\'s skin care came largely from whitening products. One ad had a friend saying, "Pare, pumuputi ka yata, ah!" A marketer linked it to colonial mentality. Brown, morena Filipino guys were already gwapo.'],
          ],
          video: v("a 2000s men's grooming ad"),
          photos: ph('Kim Joon', 'Gelled hair'),
          ticker: ['SOURCES: PCIJ (SEPT 2005)', 'WIKIPEDIA (KKONMINAM)'],
        },
      ],
    },
    {
      slug: 'sexy-fit-at-masaya',
      ep: 4,
      title: '"SEXY, FIT, AT MASAYA!"',
      cardSub: 'Fit bodies on TV, from Sexbomb to The Biggest Loser',
      fine: '*Every body is a 2000s body.',
      color: '#E83BD0',
      overview: {
        sub: 'Fit bodies on TV, from Sexbomb to The Biggest Loser',
        panels: [
          ['THE PITCH', 'Every noon, the SexBomb Girls danced on Eat Bulaga, and their albums went platinum again and again. By the end of the decade, reality TV had turned weight loss into a contest, and Filipinos lined up to audition for The Biggest Loser Asia.'],
          ['REALITY CHECK', 'Both put bodies on display for an audience, one as entertainment and one as a race to shrink. TV kept telling viewers which bodies were sexy, which were fit, and which needed fixing.'],
        ],
        video: v('a 2000s SexBomb Girls show opening'),
        photos: ph('Eat Bulaga', 'Joey de Leon', 'A dance-fitness class'),
        ticker: ['SOURCES: WIKIPEDIA (SEXBOMB GIRLS)', 'PHILSTAR (SEPT 22, 2009)'],
      },
      parts: [
        {
          slug: 'the-sexbomb-effect', label: 'SPOT 1', cardTitle: 'THE SEXBOMB EFFECT', cardLine: 'Noontime dancers who became stars',
          title: 'THE SEXBOMB EFFECT', sub: 'Noontime dancers who became stars', fine: '*Dance at your own risk.',
          stats: [['NOV 1999', 'formed as Eat Bulaga background dancers'], ['5x PLATINUM', 'Round 2 (2003)'], ['2003-2010', 'Daisy Siete on GMA']],
          panels: [
            ['THE PITCH', 'Formed in November 1999 as background dancers for Eat Bulaga, the SexBomb Girls became stars through the "Laban o Bawi" segment. Their 2002 album Unang Putok went 4x Platinum, 2003\'s Round 2 went 5x Platinum, and "The Spageti Song" became a dance craze for all ages.'],
            ['LOCAL ANGLE', "They also starred in GMA's Daisy Siete, which ran from 2003 to July 2010 across 26 seasons. They won Most Popular Dance Group at the Box Office Entertainment Awards five years in a row and entered its Hall of Fame in April 2007."],
          ],
          video: v('a SexBomb Girls performance'),
          photos: ph('Eat Bulaga', 'Joey de Leon'),
          ticker: ['SOURCES: WIKIPEDIA (SEXBOMB GIRLS)'],
        },
        {
          slug: 'the-biggest-loser', label: 'SPOT 2', cardTitle: 'THE BIGGEST LOSER', cardLine: 'Weight loss as a TV contest',
          title: 'THE BIGGEST LOSER', sub: 'Weight loss as a TV contest', fine: '*Weigh-ins every week.',
          stats: [['2004', 'The Biggest Loser debuts on NBC'], ['US$100K', 'prize on The Biggest Loser Asia'], ['57 KG', 'lost by Filipino finalist Genghis Khan Enrique']],
          panels: [
            ['THE PITCH', 'The Biggest Loser debuted on NBC in 2004 and aired in more than 90 countries. In September 2009, hundreds of hopefuls lined up at a Fitness First gym in SM Megamall to audition for The Biggest Loser Asia, which offered US$100,000 and premiered on Hallmark Channel on November 24, 2009.'],
            ['LOCAL ANGLE', 'In the second season, Internet café owner Genghis Khan Enrique went from 162 kg to 105 kg in about six months and became one of three finalists. "I want to show other countries that Pinoys can do it," he said in December 2010.'],
          ],
          video: v('The Biggest Loser Asia'),
          photos: ph('Biggest Loser contestants', 'A step-aerobics class'),
          ticker: ['SOURCES: PHILSTAR (SEPT 22, 2009)', 'PHILSTAR (DEC 23, 2010)', 'WIKIPEDIA (THE BIGGEST LOSER ASIA)'],
        },
        {
          slug: 'reality-check', label: 'SPOT 3', cardTitle: 'REALITY CHECK', cardLine: 'The SexBomb paradox and the cost of shrinking',
          title: 'REALITY CHECK', sub: 'The SexBomb paradox and the cost of shrinking', fine: '*Fit is not a shape.',
          stats: [['NOONTIME', 'where "sexy" dancers became normal TV'], ['14', 'Biggest Loser contestants studied for six years'], ['6+ YRS', 'how long their slower metabolism lasted']],
          panels: [
            ['THE SEXBOMB PARADOX', 'Families loved the SexBomb Girls, yet some Catholic commentators objected to their outfits and moves. One study argued that their daily TV presence helped normalize "sexy female background dancers" on noontime television. The members answered that their talent mattered more than the image.'],
            ['REALITY CHECK', 'Weight-loss TV had its own cost. A 2016 study in the journal Obesity followed 14 Biggest Loser contestants and found their metabolisms stayed slower for six years or more, and many regained much of the weight. Being fit is about health, not a shape TV picks for you.'],
          ],
          video: v('a 2000s fitness segment'),
          photos: ph('A dance-fitness class', 'Eat Bulaga'),
          ticker: ['SOURCES: WIKIPEDIA (SEXBOMB GIRLS)', 'STAT NEWS (MAY 16, 2016)'],
        },
      ],
    },
  ],
};

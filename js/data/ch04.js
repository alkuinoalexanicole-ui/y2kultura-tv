// CH 04: Style File (Body and Self-Image), presented as a TV commercial break.
// Slogans are invented for the museum; no real brands are used.
// An ad without `overview` shows on the channel page as "coming up after the break."
const v = (label) => ({ label, youtube: null });
const ph = (...captions) => captions.map((caption) => ({ caption, src: null }));

export default {
  num: '04',
  title: 'Style File',
  aspect: 'Body and self-image: the looks the 2000s sold us',
  format: 'ads',
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
      cta: { title: 'YOUR STORY', text: 'Did you ever rebond your hair or try a whitening product in the 2000s? How do you feel about it now? First name and city only.' },
      parts: [
        {
          slug: 'whitening-boom', label: 'SPOT 1', cardTitle: 'THE WHITENING BOOM', cardLine: 'A market that took off in the 2000s',
          title: 'THE WHITENING BOOM', sub: 'Lotions, soaps, and the promise of fairer skin', fine: '*Results not typical. Side effects not advertised.',
          stats: [['2004', 'whitening was still an "emerging market"'], ['400+ YEARS', 'how far back the preference for fair skin goes'], ['2009', 'law creating the Philippine FDA (RA 9711)']],
          panels: [
            ['THE PITCH', 'In 2004, the skin-whitening industry in the Philippines was still described as an emerging market. Over the decade it grew into lotions, soaps, and creams sold everywhere from malls to sari-sari stores, often advertised with fair-skinned celebrities.'],
            ['REALITY CHECK', 'A public health study of Filipino whitening consumers found adulterated and misbranded products, and that cheaper, toxic whiteners could undercut safer ones. Regulation tried to keep up: the law creating the Philippine FDA passed in 2009.'],
          ],
          video: v('a news report on whitening products'),
          photos: ph('Whitening soaps', 'A drugstore aisle'),
          ticker: ['SOURCES: ESQUIRE PHILIPPINES (2019)', 'JOURNAL OF PUBLIC HEALTH POLICY (2013)'],
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
          cta: { title: 'MORENA AND KULOT PRIDE', text: 'Share a word of love for your natural skin or hair. First name and city only.' },
          ticker: ['SOURCES: ESQUIRE PHILIPPINES (2019)', 'JOURNAL OF PUBLIC HEALTH POLICY (2013)'],
        },
      ],
    },
    { slug: 'low-rise-high-style', ep: 2, title: '"LOW-RISE, HIGH STYLE!"', cardSub: 'Low-rise jeans and branded streetwear', fine: '*Logo must be visible at all times.', color: '#19B5F0' },
    { slug: 'pang-f4-na-buhok', ep: 3, title: '"PANG-F4 NA BUHOK!"', cardSub: 'Asianovela hairstyles and fashion', fine: '*As seen on afternoon TV.', color: '#FFD21F' },
    { slug: 'sexy-fit-at-masaya', ep: 4, title: '"SEXY, FIT, AT MASAYA!"', cardSub: 'Fit bodies on TV, from Sexbomb to The Biggest Loser', fine: '*Every body is a 2000s body.', color: '#E83BD0' },
  ],
};

// CH 09: Credits Roll (credits and references), presented as end credits and a network sign-off.
// References, photo credits, and video credits are collected automatically from every channel's pages,
// so they stay complete when a page's sources or media change.
export default {
  num: '09',
  title: 'Credits Roll',
  aspect: 'Credits and references',
  format: 'credits',
  bg: '#000000',
  what: 'The people, sources, photos, and videos behind Y2Kultura TV, listed the way a 2000s show ran its closing credits, followed by the network sign-off.',
  felt: 'Like the last minutes of a teleserye finale: the theme song plays, the names roll up the screen, and nobody wants to change the channel yet.',
  presents: 'Y2KULTURA TV NETWORK',
  tagline: 'Where the 2000s come alive!',
  curatorsLabel: 'CURATED AND PRODUCED BY',
  curators: ['Alexa', 'Angelica', 'Ash', 'Michael'],
  rollVideo: { youtube: 'DnlzKIszk7U', label: 'ABS-CBN sign-off, recorded September 21, 2003', credit: 'Patrick Villegas Samantela Lucas' },
  builtWith: [
    ['Website', 'HTML, CSS, and JavaScript, hosted on Vercel'],
    ['Fonts', 'Anton, Barlow Condensed, Oswald, and Playfair Display (Google Fonts)'],
    ['Icons', 'Tabler Icons'],
    ['World map (CH 03)', 'd3-geo, TopoJSON, and world-atlas (Natural Earth data)'],
    ['Photos', 'Wikimedia Commons, under free licenses'],
    ['Videos', 'YouTube, embedded from their original uploaders'],
  ],
  thanks: [
    'The photographers who shared their 2000s photos on Wikimedia Commons',
    'The fans and archivists who saved 2000s Philippine TV on VHS and uploaded it to YouTube',
    'The journalists whose reporting from the decade made it possible to check every fact',
    'Every Filipino family who fought over the remote in the 2000s',
  ],
  episodes: [
    {
      slug: 'ang-gumawa', ep: 1, kind: 'team',
      title: 'Ang Gumawa', en: 'THE TEAM', cardSub: 'The curators and the people we thank',
      overview: { sub: 'The curators and the people we thank', ticker: ['SALAMAT SA LAHAT NG TUMULONG!'] },
      parts: [],
    },
    {
      slug: 'mga-sanggunian', ep: 2, kind: 'refs',
      title: 'Mga Sanggunian', en: 'REFERENCES', cardSub: 'Every source cited, channel by channel',
      overview: { sub: 'Every source cited on the museum\'s pages, channel by channel', ticker: ['SOURCES ALSO APPEAR IN THE TICKER OF EACH PAGE'] },
      parts: [],
    },
    {
      slug: 'larawan-at-video', ep: 3, kind: 'media',
      title: 'Mga Larawan at Video', en: 'PHOTO AND VIDEO CREDITS', cardSub: 'Every photographer and uploader',
      overview: { sub: 'Every photo and video in the museum, with its photographer or uploader', ticker: ['PHOTOS: WIKIMEDIA COMMONS', 'VIDEOS: YOUTUBE, BY THEIR ORIGINAL UPLOADERS'] },
      parts: [],
    },
    {
      slug: 'paalam', ep: 4, kind: 'signoff',
      title: 'Paalam', en: 'SIGN-OFF', cardSub: 'This concludes our broadcast day',
      overview: {
        sub: 'This concludes our broadcast day',
        video: { youtube: 'dBFL2685KRs', label: 'GMA sign-off notice, 2002', credit: 'Dann Garcia' },
        ticker: ['SALAMAT SA PANONOOD!', 'Y2KULTURA TV: WHERE THE 2000s COME ALIVE!'],
      },
      parts: [],
    },
  ],
};

// Videos and photos for every page, kept in one place.
// Key = page address without "/ch/": "01/love-teams" is an episode overview, "01/filipino-pride/hatton" a part.
// Videos: official YouTube uploads only, all checked to allow embedding. `yt` is the video ID.
// Photos: freely licensed images from Wikimedia Commons, shown with author and license.
// To swap a photo for one in Supabase Storage, replace `src` with its public URL and update the credit.

const C = 'https://upload.wikimedia.org/wikipedia/commons/';
const T = 'https://upload.wikimedia.org/wikipedia/commons/thumb/';
const W = 'https://commons.wikimedia.org/wiki/File:';
const ph = (src, caption, author, license, file) => ({ src, caption, credit: `${author} / ${license}`, link: W + file });

const P = {
  love1: ph(C + '3/3f/John_Lloyd_Cruz_at_ABS-CBN_Talent_Center%2C_May_2010.jpg', 'John Lloyd Cruz, 2010', 'Thedarkknightjc', 'CC BY-SA 3.0', 'John_Lloyd_Cruz_at_ABS-CBN_Talent_Center,_May_2010.jpg'),
  love2: ph(C + '4/4c/Bea_Alonzo.jpg', 'Bea Alonzo, 2009', 'karicafort', 'CC BY 2.0', 'Bea_Alonzo.jpg'),
  pride1: ph(C + '2/22/Manny_Pacman_Pacquiao_1.jpg', 'Manny Pacquiao, 2009', 'SC Ryan A', 'CC BY-SA 3.0', 'Manny_Pacman_Pacquiao_1.jpg'),
  pride2: ph(C + '5/50/Ceremonial_first_pitch_by_Manny_Pacquiao%2C_April_21%2C_2009.jpg', 'Pacquiao throws a first pitch, April 2009', 'bryce_edwards', 'CC BY 2.0', 'Ceremonial_first_pitch_by_Manny_Pacquiao,_April_21,_2009.jpg'),
  dlh: ph(T + 'e/e6/Oscar_De_La_Hoya_in_June_2008.jpg/960px-Oscar_De_La_Hoya_in_June_2008.jpg', 'Oscar De La Hoya, June 2008', 'Oscar the WWE Nexus Shirt Guy', 'CC BY-SA 4.0', 'Oscar_De_La_Hoya_in_June_2008.jpg'),
  hat1: ph(C + '0/02/Hatton_and_Pacquiao_with_trainers.jpg', 'Hatton and Pacquiao with their trainers, 2009', 'Ganglandboss', 'Public domain', 'Hatton_and_Pacquiao_with_trainers.jpg'),
  hat2: ph(C + '5/55/Ricky_Hatton_2009.jpg', 'Ricky Hatton, 2009', 'SamboD', 'CC BY 2.0', 'Ricky_Hatton_2009.jpg'),
  cotto: ph(T + '2/2d/Miguel_Cotto_at_the_weigh-in.jpg/960px-Miguel_Cotto_at_the_weigh-in.jpg', 'Miguel Cotto at a weigh-in, 2009', 'Chamber of Fear', 'CC BY-SA 2.0', 'Miguel_Cotto_at_the_weigh-in.jpg'),
  eheads: ph(T + '7/75/Eraserheads_Final_Set.jpg/960px-Eraserheads_Final_Set.jpg', 'The Eraserheads at The Final Set, March 7, 2009', 'charisseyorke', 'CC BY 2.0', 'Eraserheads_Final_Set.jpg'),
  cory: ph(C + 'c/c6/Cory_Aquino_funeral.jpg', "Cory Aquino's funeral, August 2009", 'Richel King', 'CC BY 2.0', 'Cory_Aquino_funeral.jpg'),
  cathedral: ph(T + '6/63/Manila_Cathedral_dome.jpg/960px-Manila_Cathedral_dome.jpg', 'Manila Cathedral, August 4, 2009', 'Howard the Duck', 'CC BY-SA 3.0', 'Manila_Cathedral_dome.jpg'),
  n3310a: ph(T + '3/31/Nokia_3310_blue.jpg/960px-Nokia_3310_blue.jpg', 'A Nokia 3310, released in 2000', 'Michael Brandtner', 'Public domain', 'Nokia_3310_blue.jpg'),
  n3310b: ph(T + 'a/a2/Nokia_3310_grey_front_%28tidied_and_enhanced%29.jpg/960px-Nokia_3310_grey_front_%28tidied_and_enhanced%29.jpg', 'The multi-tap keypad', 'Multicherry', 'CC BY-SA 4.0', 'Nokia_3310_grey_front_(tidied_and_enhanced).jpg'),
  p800: ph(C + 'f/f3/Sony_Ericsson_P800_with_web_browser.jpg', 'Sony Ericsson P800, a stylus touchscreen', 'Zache', 'CC BY-SA 3.0', 'Sony_Ericsson_P800_with_web_browser.jpg'),
  iphone: ph(T + 'b/b1/IPhone_%26_iPhone_3G_fronts.jpg/960px-IPhone_%26_iPhone_3G_fronts.jpg', 'The first iPhone and the iPhone 3G, 2008', 'Dan Taylor', 'CC BY 2.0', 'IPhone_%26_iPhone_3G_fronts.jpg'),
  zenmini: ph(T + '2/22/Creative_Zen_Micro_%5E_Apple_iPod_Mini_-_Flickr_-_dan_taylor.jpg/960px-Creative_Zen_Micro_%5E_Apple_iPod_Mini_-_Flickr_-_dan_taylor.jpg', 'A Creative Zen Micro and an iPod mini, 2005', 'Dan Taylor-Watt', 'CC BY 2.0', 'Creative_Zen_Micro_%5E_Apple_iPod_Mini_-_Flickr_-_dan_taylor.jpg'),
  nanoshuf: ph(C + 'c/cf/IPod_nano_vs_iPod_Shuffle_-_Flickr_-_veroyama.jpg', 'iPod nano and iPod shuffle, September 2005', 'veroyama', 'CC BY-SA 2.0', 'IPod_nano_vs_iPod_Shuffle_-_Flickr_-_veroyama.jpg'),
  zen: ph(T + '8/82/Zen_micro.JPG/960px-Zen_micro.JPG', 'A Creative Zen Micro', 'Sebyx', 'CC BY-SA 3.0', 'Zen_micro.JPG'),
  cds: ph(C + '6/6b/CD_stack.jpg', 'A stack of CDs', 'mutednarayan', 'CC BY-SA 2.0', 'CD_stack.jpg'),
  n5800: ph(T + '6/6a/Nokia_5800_XpressMusic_3Q.jpg/960px-Nokia_5800_XpressMusic_3Q.jpg', 'Nokia 5800 XpressMusic', 'Conrad Longmore', 'CC0', 'Nokia_5800_XpressMusic_3Q.jpg'),
  vcd: ph(C + '1/1a/Old_model_VCD_player.jpg', 'A VCD player', 'Obuezie', 'CC BY-SA 4.0', 'Old_model_VCD_player.jpg'),
  stb: ph(T + '3/3e/Set-top_box_%28CATV%2C_Keihan_Cable_TV%29.jpg/960px-Set-top_box_%28CATV%2C_Keihan_Cable_TV%29.jpg', 'A cable TV box from the 2000s', 'MASA', 'CC BY-SA 3.0', 'Set-top_box_(CATV,_Keihan_Cable_TV).jpg'),
  dvd: ph(T + 'b/bf/SEG_DVD_430-2458.jpg/960px-SEG_DVD_430-2458.jpg', 'A DVD player', 'Raimond Spekking', 'CC BY-SA 4.0', 'SEG_DVD_430-2458.jpg'),
  jawed: ph(T + 'c/ca/Jawed_Karim.jpg/960px-Jawed_Karim.jpg', 'YouTube co-founder Jawed Karim', 'Jawed', 'Public domain', 'Jawed_Karim.jpg'),
  arnel: ph(T + '5/5b/Arnel_Pineda_by_Phey_Palma.jpg/960px-Arnel_Pineda_by_Phey_Palma.jpg', 'Arnel Pineda, March 2009', 'Phey Palma', 'CC BY 2.0', 'Arnel_Pineda_by_Phey_Palma.jpg'),
  avril1: ph(C + 'c/ce/Avril_Lavigne_in_May_2005.jpg', 'Avril Lavigne on her 2005 Bonez Tour', 'James Wyse', 'CC BY-SA 2.0', 'Avril_Lavigne_in_May_2005.jpg'),
  avril2: ph(T + '6/6b/Avril_Lavigne_in_Taiwan_-_1.jpg/960px-Avril_Lavigne_in_Taiwan_-_1.jpg', 'Avril Lavigne in Asia, 2005', 'usarenee', 'CC BY-SA 2.0', 'Avril_Lavigne_in_Taiwan_-_1.jpg'),
  suju: ph(T + 'b/bf/Super_Junior_in_BKK.jpg/960px-Super_Junior_in_BKK.jpg', 'Super Junior in Bangkok, February 2009', 'Sry85', 'CC BY 3.0', 'Super_Junior_in_BKK.jpg'),
  suju2: ph(C + '0/08/Super_Junior_from_Acrofan.jpg', 'Super Junior, May 2009', 'acrofan.com', 'CC BY-SA 3.0', 'Super_Junior_from_Acrofan.jpg'),
  dara: ph(C + '3/3c/Dara_DMA_2009_2.jpg', 'Sandara Park with 2NE1, August 2009', 'O2NEWS', 'CC BY 4.0', 'Dara_DMA_2009_2.jpg'),
  twone: ph(T + '0/06/2NE1_at_2009_Asia_Song_Festival.jpg/960px-2NE1_at_2009_Asia_Song_Festival.jpg', '2NE1 at the 2009 Asia Song Festival', 'Kiyoung Kim', 'CC BY 2.0', '2NE1_at_2009_Asia_Song_Festival.jpg'),
  wg: ph(C + '0/04/Wonder_Girls_20090808_1.jpg', 'Wonder Girls, August 2009', 'Mister Chi', 'CC BY 4.0', 'Wonder_Girls_20090808_1.jpg'),
  kobe1: ph(C + 'd/d4/Kobe_Bryant_61_NYK4_2.jpg', 'Kobe Bryant, February 2009', 'luzer / C. J.', 'CC BY-SA 2.0', 'Kobe_Bryant_61_NYK4_2.jpg'),
  kobe2: ph(T + '8/84/Kobe_Bryant_Magic_Johnson_Barack_Obama_2009_NBA_Champions_Lakers.jpg/960px-Kobe_Bryant_Magic_Johnson_Barack_Obama_2009_NBA_Champions_Lakers.jpg', 'The 2009 NBA champion Lakers at the White House', 'The White House', 'Public domain', 'Kobe_Bryant_Magic_Johnson_Barack_Obama_2009_NBA_Champions_Lakers.jpg'),
  jolhk: ph(T + 'c/c5/Jollibee%2C_Central%2C_Hong_Kong_1.jpg/960px-Jollibee%2C_Central%2C_Hong_Kong_1.jpg', 'Jollibee in Hong Kong, 2008', 'Minghong', 'CC BY-SA 4.0', 'Jollibee,_Central,_Hong_Kong_1.jpg'),
  mang: ph(T + '9/9c/Mang_Inasal_Butuan_-_panoramio.jpg/960px-Mang_Inasal_Butuan_-_panoramio.jpg', 'Mang Inasal in Butuan, December 2009', 'kbraner', 'CC BY-SA 3.0', 'Mang_Inasal_Butuan_-_panoramio.jpg'),
  chow: ph(T + '3/3b/Chowkingjf.JPG/960px-Chowkingjf.JPG', 'A Chowking branch', 'Ramon FVelasquez', 'CC BY-SA 3.0', 'Chowkingjf.JPG'),
  noli: ph(C + 'f/f1/Noli_Me_Tangere.jpg', "Rizal's Noli Me Tangere, 1887", 'José Rizal', 'Public domain', 'Noli_Me_Tangere.jpg'),
};

const yt = (id, label, credit) => ({ youtube: id, label, credit });

export default {
  /* CH 01 */
  '01/love-teams': { video: yt('ZmuQJg6ZTRU', "One More Chance official trailer", 'ABS-CBN Star Cinema'), photos: [P.love1, P.love2] },
  '01/filipino-pride': { video: yt('9gx_CisURrA', 'Pacquiao vs. Hatton, the knockout', 'Top Rank Boxing'), photos: [P.pride1, P.pride2] },
  '01/filipino-pride/de-la-hoya': { video: yt('wDqOnlqRlLo', 'Full fight: De La Hoya vs. Pacquiao', 'DAZN Boxing'), photos: [P.dlh] },
  '01/filipino-pride/hatton': { video: yt('Zj7Saz9Jync', 'Full fight: Pacquiao vs. Hatton', 'DAZN Boxing'), photos: [P.hat1, P.hat2] },
  '01/filipino-pride/cotto': { video: yt('kUruG4y9mak', 'Full fight: Pacquiao vs. Cotto', 'Top Rank Boxing'), photos: [P.cotto] },
  '01/opm-bands': { video: yt('lcnPPah8tMg', 'Hale performs "The Day You Said Goodnight" live', 'Wish 107.5'), photos: [P.eheads] },
  '01/opm-bands/hale': { video: yt('DbIY9NSho8Y', '"The Day You Said Goodnight" official music video', 'PolyEast Records') },
  '01/opm-bands/cueshe': { video: yt('17Sv2FAZnkw', '"Stay" official music video', 'Cueshé (VEVO)') },
  '01/opm-bands/eraserheads': { photos: [P.eheads] },
  '01/cory-aquino': { video: yt('B7qRhUiA95w', 'Noynoy Aquino confirms his mother\'s death, August 1, 2009', 'AP Archive'), photos: [P.cory, P.cathedral] },
  '01/cory-aquino/the-wake': { video: yt('CulRHeW_m_E', 'Mourners line up at La Salle Greenhills, August 2, 2009', 'AP Archive') },
  '01/cory-aquino/yellow-confetti': { video: yt('rWDAyEGUzIg', 'Crowds at Manila Cathedral, August 4, 2009', 'AP Archive'), photos: [P.cathedral] },
  '01/cory-aquino/the-long-goodbye': { video: yt('2XCgKQU5saQ', "TV Patrol: Cory Aquino's burial beside Ninoy", 'ABS-CBN News'), photos: [P.cory] },

  /* CH 02 */
  '02/text-unli': { photos: [P.n3310a, P.p800] },
  '02/text-unli/p1-a-text': { video: yt('2ckXEssOL48', 'EDSA 2 protests, January 19, 2001', 'AP Archive'), photos: [P.n3310b] },
  '02/text-unli/keypad-to-tap': { photos: [P.p800, P.iphone] },
  '02/pocket-soundtrack': { photos: [P.zenmini, P.nanoshuf] },
  '02/pocket-soundtrack/1000-songs': { photos: [P.nanoshuf, P.zen] },
  '02/pocket-soundtrack/the-playlist-era': { photos: [P.cds] },
  '02/pocket-soundtrack/phone-becomes-the-player': { photos: [P.n5800, P.iphone] },
  '02/beyond-free-tv': { video: yt('KWVi9ziKT3I', 'Sniffer dogs join a pirated-DVD raid in the Philippines, 2007', 'AP Archive'), photos: [P.stb, P.dvd, P.vcd] },
  '02/beyond-free-tv/cable-takes-over': { video: yt('AldpwVP_8sQ', 'SKY: 25 years of entertainment', 'SKY'), photos: [P.stb] },
  '02/beyond-free-tv/dibidi-nights': { photos: [P.dvd, P.vcd] },
  '02/beyond-free-tv/the-crackdown': { video: yt('mQbZDDxa9QU', 'Steamrollers crush pirated CDs and VCDs in Manila, 2002', 'AP Archive') },
  '02/click-upload-watch': { video: yt('yKv93LcfLOI', "Don't Stop Believin': Everyman's Journey, official trailer", 'Rotten Tomatoes Indie'), photos: [P.jawed, P.arnel] },
  '02/click-upload-watch/broadcast-yourself': { video: yt('jNQXAC9IVRw', '"Me at the zoo," the first YouTube video', 'jawed'), photos: [P.jawed] },
  '02/click-upload-watch/found-on-youtube': { video: yt('HH_i4DC0-BU', 'Journey with Arnel Pineda, "Faithfully" (Live in Manila)', 'Journey (VEVO)'), photos: [P.arnel] },

  /* CH 03 */
  '03/western-waves': { video: yt('5NPBIwQyPWE', 'Avril Lavigne, "Complicated" official video', 'Avril Lavigne (VEVO)'), photos: [P.avril1] },
  '03/western-waves/live-in-manila': { video: yt('kXYiU_JCYtU', 'Linkin Park, "Numb" official music video (2003)', 'Linkin Park'), photos: [P.avril2] },
  '03/western-waves/box-office-magic': { video: yt('LLAaW1EgyY8', 'Harry Potter and the Order of the Phoenix, official trailer', 'Harry Potter') },
  '03/hallyu-rising': { video: yt('x6QA3m58DQw', 'Super Junior, "Sorry, Sorry" official MV', 'SMTOWN'), photos: [P.suju, P.twone] },
  '03/hallyu-rising/krung-krung-to-2ne1': { video: yt('JhfRt_k5_vg', 'Sandara Park, "In or Out"', 'ABS-CBN Star Music'), photos: [P.dara, P.twone] },
  '03/hallyu-rising/sorry-sorry-on-myx': { video: yt('BA7fdSkp8ds', 'Wonder Girls, "Nobody" official MV', 'Wonder Girls'), photos: [P.suju2, P.wg] },
  '03/hallyu-rising/fan-clubs-and-dance-covers': { video: yt('AAWqnA8PdcY', 'Super Junior, "Sorry, Sorry" dance version', 'SMTOWN') },
  '03/courtside-and-counter': { video: yt('cHYApcfdDn8', 'Filipino fans pay tribute to Kobe Bryant in Manila, January 2020', 'AP Archive'), photos: [P.kobe1, P.jolhk] },
  '03/courtside-and-counter/mamba-in-manila': { photos: [P.kobe2, P.kobe1] },
  '03/courtside-and-counter/jollibee-goes-global': { photos: [P.jolhk, P.mang, P.chow] },

  /* CH 04 */
  '04/maputi-at-unat': { video: yt('NEs3g5LVqPU', 'Undercover Asia: the cost of skin whitening in the Philippines (2020)', 'CNA Insider') },
  '04/maputi-at-unat/reality-check': { photos: [P.noli] },
};

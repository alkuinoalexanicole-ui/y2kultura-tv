// Videos and photos for every page, kept in one place.
// Key = page address without "/ch/": "01/love-teams" is an episode overview, "01/filipino-pride/hatton" a part.
// Videos: YouTube uploads (official and fan) whose footage dates from 2000 to 2010, all checked to allow embedding.
// `yt` is the video ID; the label states what the clip is and when it is from.
// Photos: freely licensed images from Wikimedia Commons taken 2000 to 2010, shown with author and license.
// To swap a photo for one in Supabase Storage, replace `src` with its public URL and update the credit.

const C = 'https://upload.wikimedia.org/wikipedia/commons/';
const T = 'https://upload.wikimedia.org/wikipedia/commons/thumb/';
const W = 'https://commons.wikimedia.org/wiki/File:';
// `pos` (optional) picks which part of the photo stays in frame, e.g. 'center top', or 'contain' to show the whole photo uncropped. Default keeps the upper part, where faces usually are.
const ph = (src, caption, author, license, file, pos) => ({ src, caption, credit: `${author} / ${license}`, link: W + file, pos });

const P = {
  love1: ph(C + '3/3f/John_Lloyd_Cruz_at_ABS-CBN_Talent_Center%2C_May_2010.jpg', 'John Lloyd Cruz, 2010', 'Thedarkknightjc', 'CC BY-SA 3.0', 'John_Lloyd_Cruz_at_ABS-CBN_Talent_Center,_May_2010.jpg'),
  love2: ph(C + '4/4c/Bea_Alonzo.jpg', 'Bea Alonzo, 2009', 'karicafort', 'CC BY 2.0', 'Bea_Alonzo.jpg'),
  pride1: ph(C + '2/22/Manny_Pacman_Pacquiao_1.jpg', 'Manny Pacquiao, 2009', 'SC Ryan A', 'CC BY-SA 3.0', 'Manny_Pacman_Pacquiao_1.jpg', 'center top'),
  pride2: ph(C + '5/50/Ceremonial_first_pitch_by_Manny_Pacquiao%2C_April_21%2C_2009.jpg', 'Pacquiao throws a first pitch, April 2009', 'bryce_edwards', 'CC BY 2.0', 'Ceremonial_first_pitch_by_Manny_Pacquiao,_April_21,_2009.jpg', 'center top'),
  dlh: ph(T + 'e/e6/Oscar_De_La_Hoya_in_June_2008.jpg/960px-Oscar_De_La_Hoya_in_June_2008.jpg', 'Oscar De La Hoya, June 2008', 'Oscar the WWE Nexus Shirt Guy', 'CC BY-SA 4.0', 'Oscar_De_La_Hoya_in_June_2008.jpg'),
  hat1: ph(C + '0/02/Hatton_and_Pacquiao_with_trainers.jpg', 'Hatton and Pacquiao with their trainers, 2009', 'Ganglandboss', 'Public domain', 'Hatton_and_Pacquiao_with_trainers.jpg'),
  hat2: ph(C + '5/55/Ricky_Hatton_2009.jpg', 'Ricky Hatton, 2009', 'SamboD', 'CC BY 2.0', 'Ricky_Hatton_2009.jpg'),
  cotto: ph(T + '2/2d/Miguel_Cotto_at_the_weigh-in.jpg/960px-Miguel_Cotto_at_the_weigh-in.jpg', 'Miguel Cotto at a weigh-in, 2009', 'Chamber of Fear', 'CC BY-SA 2.0', 'Miguel_Cotto_at_the_weigh-in.jpg'),
  eheads: ph(T + '7/75/Eraserheads_Final_Set.jpg/960px-Eraserheads_Final_Set.jpg', 'The Eraserheads at The Final Set, March 7, 2009', 'charisseyorke', 'CC BY 2.0', 'Eraserheads_Final_Set.jpg'),
  cory: ph(C + 'c/c6/Cory_Aquino_funeral.jpg', "Cory Aquino's funeral, August 2009", 'Richel King', 'CC BY 2.0', 'Cory_Aquino_funeral.jpg'),
  cathedral: ph(T + '6/63/Manila_Cathedral_dome.jpg/960px-Manila_Cathedral_dome.jpg', 'Manila Cathedral, August 4, 2009', 'Howard the Duck', 'CC BY-SA 3.0', 'Manila_Cathedral_dome.jpg'),
  wakeLine: ph(T + '4/4a/Line_at_the_Corazon_Aquino_wake_at_the_Manila_Cathedral.jpg/960px-Line_at_the_Corazon_Aquino_wake_at_the_Manila_Cathedral.jpg', 'The line of mourners to Manila Cathedral, August 2009', 'Howard the Duck', 'CC BY-SA 3.0', 'Line_at_the_Corazon_Aquino_wake_at_the_Manila_Cathedral.jpg'),
  wakeCoffin: ph(T + '0/0f/Visit_to_the_Wake_of_Former_Philippine_President_Corazon_C._Aquino_by_President_Gloria_Macapagal_Arroyo_-_5_August_2009.webm/960px--Visit_to_the_Wake_of_Former_Philippine_President_Corazon_C._Aquino_by_President_Gloria_Macapagal_Arroyo_-_5_August_2009.webm.jpg', 'Her flag-draped coffin under guard at Manila Cathedral, August 2009', 'Radio Television Malacañang', 'Public domain', 'Visit_to_the_Wake_of_Former_Philippine_President_Corazon_C._Aquino_by_President_Gloria_Macapagal_Arroyo_-_5_August_2009.webm'),
  n3310a: ph(T + '3/31/Nokia_3310_blue.jpg/960px-Nokia_3310_blue.jpg', 'A Nokia 3310, released in 2000', 'Michael Brandtner', 'Public domain', 'Nokia_3310_blue.jpg', 'contain'),
  textNokia: ph(T + '9/90/Text_message_on_a_Nokia.jpg/960px-Text_message_on_a_Nokia.jpg', 'Typing a text on a Nokia keypad phone, 2008', 'CayleeChristinePhotography', 'CC BY 2.0', 'Text_message_on_a_Nokia.jpg'),
  glorietta: ph(T + '2/2b/Makati6.jpg/960px-Makati6.jpg', 'Glorietta mall in Makati, January 2007', 'Eternal dragon', 'Public domain', 'Makati6.jpg'),
  p800: ph(C + 'f/f3/Sony_Ericsson_P800_with_web_browser.jpg', 'Sony Ericsson P800, a stylus touchscreen', 'Zache', 'CC BY-SA 3.0', 'Sony_Ericsson_P800_with_web_browser.jpg', 'contain'),
  iphone: ph(T + 'b/b1/IPhone_%26_iPhone_3G_fronts.jpg/960px-IPhone_%26_iPhone_3G_fronts.jpg', 'The first iPhone and the iPhone 3G, 2008', 'Dan Taylor', 'CC BY 2.0', 'IPhone_%26_iPhone_3G_fronts.jpg'),
  zenmini: ph(T + '2/22/Creative_Zen_Micro_%5E_Apple_iPod_Mini_-_Flickr_-_dan_taylor.jpg/960px-Creative_Zen_Micro_%5E_Apple_iPod_Mini_-_Flickr_-_dan_taylor.jpg', 'A Creative Zen Micro and an iPod mini, 2005', 'Dan Taylor-Watt', 'CC BY 2.0', 'Creative_Zen_Micro_%5E_Apple_iPod_Mini_-_Flickr_-_dan_taylor.jpg'),
  nanoshuf: ph(C + 'c/cf/IPod_nano_vs_iPod_Shuffle_-_Flickr_-_veroyama.jpg', 'iPod nano and iPod shuffle, September 2005', 'veroyama', 'CC BY-SA 2.0', 'IPod_nano_vs_iPod_Shuffle_-_Flickr_-_veroyama.jpg'),
  zen: ph(T + '8/82/Zen_micro.JPG/960px-Zen_micro.JPG', 'A Creative Zen Micro', 'Sebyx', 'CC BY-SA 3.0', 'Zen_micro.JPG', 'contain'),
  dvdPlayer: ph(T + '5/51/Hyundai_HY-DV805_20100701.jpg/960px-Hyundai_HY-DV805_20100701.jpg', 'A budget DVD/VCD/MP3 player and remote, 2010', 'Kristoferb', 'CC BY-SA 3.0', 'Hyundai_HY-DV805_20100701.jpg'),
  tvCorner: ph(T + '0/04/Philips_CRT_TV%2C_LG_DVD_player%2C_Samsung_VHS_recorder_and_anime_DVD_boxes_20051109.jpg/960px-Philips_CRT_TV%2C_LG_DVD_player%2C_Samsung_VHS_recorder_and_anime_DVD_boxes_20051109.jpg', 'A home TV corner: CRT TV, DVD player, VHS deck and DVD box sets, 2005', 'Raxzje', 'CC BY-SA 2.0', 'Philips_CRT_TV,_LG_DVD_player,_Samsung_VHS_recorder_and_anime_DVD_boxes_20051109.jpg', 'contain'),
  pirateVendor: ph(C + 'd/d2/Pirate_street_vendor.jpg', 'A street vendor packs up his pirated CDs, ever watchful for police, c. 2005', 'Alkivar', 'Public domain', 'Pirate_street_vendor.jpg'),
  pirateTable: ph(T + 'd/de/Film_piracy_in_Singapore.jpg/960px-Film_piracy_in_Singapore.jpg', 'Pirated film discs on a night-market table, Singapore, 2008', 'David Sifry', 'CC BY 2.0', 'Film_piracy_in_Singapore.jpg', 'contain'),
  cds: ph(C + '6/6b/CD_collection_3.jpg', 'A shelf of CD albums, 2006', 'Alice and Matt from US', 'CC BY 2.0', 'CD_collection_3.jpg'),
  n5800: ph(T + '6/6a/Nokia_5800_XpressMusic_3Q.jpg/960px-Nokia_5800_XpressMusic_3Q.jpg', 'Nokia 5800 XpressMusic', 'Conrad Longmore', 'CC0', 'Nokia_5800_XpressMusic_3Q.jpg'),
  stb: ph(T + '3/3e/Set-top_box_%28CATV%2C_Keihan_Cable_TV%29.jpg/960px-Set-top_box_%28CATV%2C_Keihan_Cable_TV%29.jpg', 'A cable TV box from the 2000s', 'MASA', 'CC BY-SA 3.0', 'Set-top_box_(CATV,_Keihan_Cable_TV).jpg'),
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
};

const yt = (id, label, credit) => ({ youtube: id, label, credit });

export default {
  /* CH 01 */
  '01/love-teams': { video: yt('ZmuQJg6ZTRU', 'One More Chance official trailer, 2007', 'ABS-CBN Star Cinema'), photos: [P.love1, P.love2] },
  '01/filipino-pride': { video: yt('9gx_CisURrA', 'Pacquiao vs. Hatton, the knockout, May 2009', 'Top Rank Boxing'), photos: [P.pride1, P.pride2] },
  '01/filipino-pride/de-la-hoya': { video: yt('wDqOnlqRlLo', 'De La Hoya vs. Pacquiao, December 2008', 'DAZN Boxing'), photos: [P.dlh] },
  '01/filipino-pride/hatton': { video: yt('Zj7Saz9Jync', 'Pacquiao vs. Hatton, May 2009', 'DAZN Boxing'), photos: [P.hat1, P.hat2] },
  '01/filipino-pride/cotto': { video: yt('kUruG4y9mak', 'Pacquiao vs. Cotto, November 2009', 'Top Rank Boxing'), photos: [P.cotto] },
  '01/opm-bands': { video: yt('WtuZ3FVnTDU', 'Hale perform "The Day You Said Goodnight" on MYX Live!, mid-2000s', 'All Music MYX'), photos: [P.eheads] },
  '01/opm-bands/hale': { video: yt('DbIY9NSho8Y', 'Hale, "The Day You Said Goodnight" music video, 2005', 'PolyEast Records') },
  '01/opm-bands/cueshe': { video: yt('17Sv2FAZnkw', 'Cueshé, "Stay" music video, 2005', 'Cueshé (VEVO)') },
  '01/opm-bands/eraserheads': { video: yt('mI0k8YisS1A', 'TV Patrol Sabado: the reunion concert is cut short, August 30, 2008', "schizo's Eraserheads Video Vault"), photos: [P.eheads] },
  '01/cory-aquino': { video: yt('B7qRhUiA95w', "Noynoy Aquino confirms his mother's death, August 1, 2009", 'AP Archive'), photos: [P.cory, P.cathedral] },
  '01/cory-aquino/the-wake': { video: yt('CulRHeW_m_E', 'Mourners line up at La Salle Greenhills, August 2, 2009', 'AP Archive'), photos: [P.wakeLine, P.wakeCoffin] },
  '01/cory-aquino/yellow-confetti': { video: yt('1p_6sDAIPtw', 'Scenes from Ayala Avenue, August 3, 2009', 'Mich Bustamante'), photos: [P.cathedral] },
  '01/cory-aquino/the-long-goodbye': { video: yt('2XCgKQU5saQ', "TV Patrol: Cory Aquino's burial beside Ninoy, August 5, 2009", 'ABS-CBN News'), photos: [P.cory] },

  /* CH 02 */
  '02/text-unli': { video: yt('tApCa8whWCI', 'Smart Buddy load ad with Heart Evangelista, 2003', 'UndustFixation'), photos: [P.n3310a, P.p800] },
  '02/text-unli/p1-a-text': { video: yt('bd4o8RMF3d8', "Talk 'N Text ad with Rico Yan on low rates and affordable phones, 2000", 'UndustFixation'), photos: [P.n3310a] },
  '02/text-unli/gm-textmate-eyeball': { video: yt('XipJFRBBoYs', 'Globe Gentxt group-texting TV ad, 2002', '莢豌豆本舗'), photos: [P.textNokia, P.glorietta] },
  '02/text-unli/keypad-to-tap': { video: yt('PcVg9pzxzDA', 'Nokia 3310 TV ad, 2000: the keypad era', 'Fredrik Idestam'), photos: [P.p800, P.iphone] },
  '02/pocket-soundtrack': { video: yt('mE_bDNaYAr8', 'The first iPod TV ad, 2001', 'xaviertic'), photos: [P.zenmini, P.nanoshuf] },
  '02/pocket-soundtrack/1000-songs': { video: yt('e84SER_IkP4', 'The first iPod promotional video, 2001', 'JoshuaG'), photos: [P.nanoshuf, P.zen] },
  '02/pocket-soundtrack/the-playlist-era': { video: yt('NS80VFHn7D4', 'Creative Zen MP3 player TV ad, 2004', 'filmfactoryltd'), photos: [P.cds] },
  '02/pocket-soundtrack/phone-becomes-the-player': { video: yt('jG7ohCRGd4Q', 'Nokia 5800 XpressMusic TV ad, 2009', 'N5800XM'), photos: [P.n5800, P.iphone] },
  '02/beyond-free-tv': { video: yt('KWVi9ziKT3I', 'Sniffer dogs join a pirated-DVD raid in the Philippines, April 2007', 'AP Archive'), photos: [P.stb] },
  '02/beyond-free-tv/cable-takes-over': { video: yt('FXEA9o7gkEY', 'SkyCable "The Biggest Show On Air" TV ad, 2000', 'JKSHLTR'), photos: [P.stb] },
  '02/beyond-free-tv/dibidi-nights': { video: yt('I-zSnSxIwqs', 'Optical Media Board raid on pirated DVDs in Quiapo, August 17, 2010', 'Optical Media Board'), photos: [P.dvdPlayer, P.tvCorner] },
  '02/beyond-free-tv/the-crackdown': { video: yt('mQbZDDxa9QU', 'Steamrollers crush pirated CDs and VCDs in Manila, July 2002', 'AP Archive'), photos: [P.pirateVendor, P.pirateTable] },
  '02/click-upload-watch': { video: yt('HH_i4DC0-BU', 'Journey with Arnel Pineda, "Faithfully," Live in Manila, 2009', 'Journey (VEVO)'), photos: [P.jawed, P.arnel] },
  '02/click-upload-watch/broadcast-yourself': { video: yt('jNQXAC9IVRw', '"Me at the zoo," the first YouTube video, April 23, 2005', 'jawed'), photos: [P.jawed] },
  '02/click-upload-watch/found-on-youtube': { video: yt('a7zIE1N_Prg', 'Arnel Pineda and Zoo cover "Faithfully," uploaded 2007', 'naitx09'), photos: [P.arnel] },
  '02/click-upload-watch/photos-online': { video: yt('6WwSh2Pqdxs', 'Friendster Capital: the Philippines and its Friendster record, 2007', 'Vince Rodriguez') },

  /* CH 03 */
  '03/western-waves': { video: yt('5NPBIwQyPWE', 'Avril Lavigne, "Complicated" music video, 2002', 'Avril Lavigne (VEVO)'), photos: [P.avril1] },
  '03/western-waves/live-in-manila': { video: yt('iNDt-RxDtjI', 'Linkin Park in Manila on ASAP Mania, June 2004', 'qwir34'), photos: [P.avril2] },
  '03/western-waves/box-office-magic': { video: yt('LLAaW1EgyY8', 'Harry Potter and the Order of the Phoenix trailer, 2007', 'Harry Potter') },
  '03/dubbed-and-delivered': { video: yt('Yw-QjQME6eE', 'Meteor Garden, Tagalog-dubbed episode 4', 'Meteor Garden Marathon') },
  '03/dubbed-and-delivered/meteor-fever': { video: yt('hOqLnJ6pHOY', 'F4 sing "Liu Xing Yu" in the Philippines, 2003', 'F4 Original-2001') },
  '03/dubbed-and-delivered/koreanovela-nights': { video: yt('dAbnwBeugHY', 'Endless Love: Autumn in My Heart opening on GMA, 2003', 'Frauleinpinky02') },
  '03/dubbed-and-delivered/the-filipino-voice': { video: yt('4EM0qR9lhS4', 'Hero TV station ID, summer 2007', 'ARCHIVE Pilipinas') },
  '03/hallyu-rising': { video: yt('x6QA3m58DQw', 'Super Junior, "Sorry, Sorry" music video, 2009', 'SMTOWN'), photos: [P.suju, P.twone] },
  '03/hallyu-rising/krung-krung-to-2ne1': { video: yt('QvlrtvuIKC8', 'Sandara Park on Star Circle Quest, 2004', 'Nn Nani'), photos: [P.dara, P.twone] },
  '03/hallyu-rising/sorry-sorry-on-myx': { video: yt('BA7fdSkp8ds', 'Wonder Girls, "Nobody" music video, 2009', 'Wonder Girls'), photos: [P.suju2, P.wg] },
  '03/hallyu-rising/fan-clubs-and-dance-covers': { video: yt('_43TO_OPj-8', 'CPDRC inmates dance to "Sorry, Sorry," Cebu, June 2009', 'byronfgarcia') },
  '03/courtside-and-counter': { video: yt('d7gPbo8qmTc', 'Kobe Bryant visits Manila, July 2009', 'SN+1 Archives'), photos: [P.kobe1, P.jolhk] },
  '03/courtside-and-counter/mamba-in-manila': { video: yt('2QSHXojL39g', "Kobe Bryant's grand entrance at the Ultra, July 21, 2009", 'sports37productions'), photos: [P.kobe2, P.kobe1] },
  '03/courtside-and-counter/chickenjoy-vs-the-burger': { video: yt('G-r0piA5KYo', 'Jollibee Chickenjoy TV ad, 2005', "My Philippine TVC's") },
  '03/courtside-and-counter/jollibee-goes-global': { video: yt('XhKABuDMGEY', 'Jollibee Super Meal TV ad, 2005', 'Matt Virtudazo'), photos: [P.jolhk, P.mang] },

  /* CH 04 */
  '04/maputi-at-unat': { video: yt('1KK_VP-N-eQ', 'Sunsilk shampoo TV ad, early 2000s', 'Chai H.') },
  '04/maputi-at-unat/whitening-boom': { video: yt('7aheTQ686zs', 'Silka Papaya whitening soap TV ad with Iya Villania, 2008', "Alden Richards's Commercial") },
  '04/maputi-at-unat/the-rebond-era': { video: yt('0c7F5trRXg8', 'Sunsilk TV ad with Marian Rivera, Nikki Gil, and Maja Salvador, 2008', 'xxRedGalaxyxx') },
};

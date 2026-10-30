// The channel line-up. Order here is the order P+ and P- flip through.
// A channel with `data` has pages; without it, viewers see the "Please stand by" screen.
import ch01 from './ch01.js';
import ch02 from './ch02.js';
import ch03 from './ch03.js';
import ch04 from './ch04.js';

export const CHANNELS = [
  { num: '01', title: 'Heartstrings', aspect: 'Affect, Senses, and Feelings', slot: '7:00 PM', data: ch01 },
  { num: '02', title: 'Tech Talk 2000', aspect: 'Technology', slot: '7:30 PM', data: ch02 },
  { num: '03', title: 'Global Mix', aspect: 'Globalization', slot: '8:00 PM', data: ch03 },
  { num: '04', title: 'Style File', aspect: 'Body and Self-Image', slot: '8:30 PM', data: ch04 },
  { num: '05', title: 'Starstruck!', aspect: 'Performance', slot: '9:00 PM' },
  { num: '06', title: 'Place To Be', aspect: 'Space', slot: '9:30 PM' },
  { num: '07', title: 'Then vs. Now', aspect: 'Time', slot: '10:00 PM' },
  { num: '08', title: 'Behind the Broadcast', aspect: 'About the museum', slot: '10:30 PM' },
  { num: '09', title: 'Credits Roll', aspect: 'Credits and references', slot: '11:00 PM' },
];

export function findChannel(num) {
  return CHANNELS.find((c) => c.num === num);
}

// Stops the remote cycles through: home (CH 00), the guide, then each channel.
export const DIAL = ['/', '/guide', ...CHANNELS.map((c) => `/ch/${c.num}`)];

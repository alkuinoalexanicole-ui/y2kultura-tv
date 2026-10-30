# Y2Kultura TV Network

A digital museum of Philippine pop culture from 2000 to 2010, presented as a 2000s TV network. Viewers flip channels with an on-screen remote instead of scrolling.

## How it works

- Plain HTML, CSS, and JavaScript. There is no build step, so Vercel serves the files as they are.
- Every page appears inside the TV screen. Changing pages plays a burst of static and shows the channel number, like a real set.
- Each page has its own address (for example `/ch/01/filipino-pride/hatton`), so links can be shared and the browser's back button works. `vercel.json` sends every address to `index.html`, and `js/app.js` decides what to show.

## Remote and keyboard

| Remote | Keyboard | What it does |
|---|---|---|
| P+ / P− | Page Up / Page Down, + / − | Next or previous channel |
| Number keys | 0–9 | Tune in to a channel (type 1, or 0 then 1, for CH 01) |
| GUIDE | G | Channel guide |
| BACK | Esc or Backspace | Up one level |
| Power | | Back to the start (CH 00) |
| Speaker | | Turns the static sound on or off (off by default) |

## Editing content

All words, dates, and media live in `js/data/`:

- `channels.js` lists every channel in remote order. A channel without `data` shows the "Please stand by" color bars.
- `ch01.js` holds CH 01 (Heartstrings) and its four episodes.

To add media to any page:

- **Video:** set `"youtube"` to the video ID, the part after `v=` in the YouTube link. Use official uploads.
- **Photo:** set `"src"` to the image's web address, for example a Supabase Storage public URL.

Empty slots show "Coming soon" with static, so the site always looks finished.

## Folder map

```
index.html        TV, screen, and remote
css/style.css     All styling
js/app.js         Page routing, remote, and keyboard
js/tv.js          Static, channel number, and sound
js/views.js       The screens: home, guide, channels, episodes, stand-by
js/data/          Content
vercel.json       Sends every address to index.html
```

## Run it on your computer

Any static file server that falls back to `index.html` works. With the Vercel CLI: `npx vercel dev`.

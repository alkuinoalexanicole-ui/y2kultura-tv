/**
 * Y2Kultura TV · Station Break answers collector
 *
 * Paste this into the Google Sheet's Extensions > Apps Script editor, run setupTabs() once,
 * then Deploy > New deployment > Web app (Execute as: Me, Who has access: Anyone).
 * Put the web app URL in js/config.js (SHEET_URL).
 *
 * Every answer becomes one row in the tab named after its channel.
 */
const TABS = [
  'CH 01 Heartstrings',
  'CH 02 Tech Talk 2000',
  'CH 03 Global Mix',
  'CH 04 Style File',
  'CH 05 Starstruck',
  'CH 06 Place To Be',
  'CH 07 Then vs Now',
  'CH 08 Behind the Broadcast',
];
const HEADERS = ['Timestamp', 'Question', 'Answer', 'Correct?', 'Nostalgia (1-5)', 'Memory', 'First name', 'City'];

function tab_(name) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.appendRow(HEADERS);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold').setBackground('#FFD21F');
    sh.setColumnWidth(2, 320);
    sh.setColumnWidth(6, 360);
  }
  return sh;
}

// Run once from the editor to create all the channel tabs.
function setupTabs() {
  TABS.forEach(tab_);
}

// Text is cut to a safe length, and a leading = + - @ is escaped so nothing runs as a formula.
function clip_(v, n) {
  return String(v == null ? '' : v).slice(0, n).replace(/^[=+\-@]/, "'$&");
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const d = JSON.parse(e.postData.contents);
    if (d.website) return json_({ ok: true }); // a hidden field only bots fill in
    const name = TABS.indexOf(d.channel) >= 0 ? d.channel : 'Other';
    const correct = d.correct === true ? 'Yes' : d.correct === false ? 'No' : '';
    tab_(name).appendRow([
      new Date(),
      clip_(d.question, 300),
      clip_(d.answer, 120),
      correct,
      clip_(d.nostalgia, 1),
      clip_(d.memory, 400),
      clip_(d.name, 30),
      clip_(d.city, 40),
    ]);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false });
  } finally {
    lock.releaseLock();
  }
}

function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

const fs = require('fs');
const js = fs.readFileSync('bundle.js', 'utf8');

// Search for keywords
const keywords = [
  'AcceleratorX',
  'Skill',
  'certificate',
  'course',
  'assessed',
  'path',
  'base44'
];

keywords.forEach(kw => {
  let idx = 0;
  let matches = [];
  while ((idx = js.indexOf(kw, idx)) !== -1) {
    matches.push(idx);
    idx += kw.length;
    if (matches.length > 20) break;
  }
  console.log(`Keyword "${kw}": ${matches.length} occurrences`);
  if (matches.length > 0) {
    matches.slice(0, 3).forEach(pos => {
      const start = Math.max(0, pos - 100);
      const end = Math.min(js.length, pos + 200);
      console.log(`  Context at ${pos}: \n  ${JSON.stringify(js.slice(start, end))}\n`);
    });
  }
});

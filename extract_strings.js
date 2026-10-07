const fs = require('fs');
const js = fs.readFileSync('bundle.js', 'utf8');

// Let's find large strings or data objects
const strings = js.match(/"([^"\\]|\\.)*"/g) || [];
console.log('Total string literals:', strings.length);

// Let's search for distinctive keywords from the page title:
// "Skill Certificates", "Get certified without another course", etc.
const relevant = strings
  .map(s => {
    try { return JSON.parse(s); } catch(e) { return s; }
  })
  .filter(s => s.length > 25);

console.log('Strings > 25 chars:', relevant.length);
fs.writeFileSync('extracted_strings.json', JSON.stringify(relevant, null, 2));

console.log('Sample extracted strings:');
console.log(relevant.slice(0, 40));

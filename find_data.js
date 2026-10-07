const fs = require('fs');

// Read app_code.js
const code = fs.readFileSync('app_code.js', 'utf8');

// Let's search for data arrays: programs, skills, faqs, certificates, testimonials, etc.
// Look for variable assignments with arrays or objects
const lines = code.split(';');

console.log('Total segments:', lines.length);

// Let's search for key data structures
// Look for program list
const programMatches = code.match(/\[\{[^{}]*name:[^{}]*slug:[^{}]*\}\]/g);
console.log('Program matches count:', programMatches ? programMatches.length : 0);

// Let's write a script to find and dump all JSON-like objects and array literals in app_code.js

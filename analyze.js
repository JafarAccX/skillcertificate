const fs = require('fs');

const js = fs.readFileSync('bundle.js', 'utf8');
console.log('Bundle length:', js.length);

// Look for .js chunks
const chunks = js.match(/\/assets\/[a-zA-Z0-9_\-\.]+\.js/g) || [];
console.log('Chunks:', Array.from(new Set(chunks)));

// Look for route patterns
const routes = js.match(/["']\/[a-zA-Z0-9_\-\/:*]+["']/g) || [];
const routeCandidates = Array.from(new Set(routes)).filter(r => 
  !r.includes('/assets/') && 
  !r.includes('http') && 
  !r.includes('svg') && 
  !r.includes('xml') && 
  r.length > 3 && 
  r.length < 50
);
console.log('Route candidates count:', routeCandidates.length);
console.log('Sample route candidates:', routeCandidates.slice(0, 30));

// Check if there are source maps or mentions of pages
const pages = js.match(/pages\/[a-zA-Z0-9_\-\/]+/g) || [];
console.log('Pages mentioned:', Array.from(new Set(pages)));

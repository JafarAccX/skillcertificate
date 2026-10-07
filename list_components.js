const fs = require('fs');
const lines = fs.readFileSync('app_code_pretty.js', 'utf8').split('\n');

const components = [];
lines.forEach((line, i) => {
  const fnMatch = line.match(/^function\s+([a-zA-Z0-9_]+)\s*\(/);
  if (fnMatch) {
    components.push({ name: fnMatch[1], line: i });
  }
});

console.log('Found functions:', components.length);
components.forEach(c => {
  // Read a few lines of the function
  const preview = lines.slice(c.line, c.line + 4).join(' ').slice(0, 100);
  console.log(`L${c.line}: ${c.name} -> ${preview}`);
});

const fs = require('fs');
const lines = fs.readFileSync('app_code_pretty.js', 'utf8').split('\n');

console.log('Searching for main data definitions...');
lines.forEach((line, i) => {
  if (line.includes('slug:') || line.includes('role:') || line.includes('skills:') || line.includes('passScore:')) {
    if (i < 2000) {
      console.log(`Line ${i}: ${line.slice(0, 120)}`);
    }
  }
});

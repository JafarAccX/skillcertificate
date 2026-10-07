const fs = require('fs');
const js = fs.readFileSync('bundle.js', 'utf8');

// The application custom code starts where React / vendor libs end
const appCode = js.slice(500000);
fs.writeFileSync('app_code.js', appCode);
console.log('App code length:', appCode.length);

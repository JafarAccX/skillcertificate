const fs = require('fs');

const js = fs.readFileSync('bundle.js', 'utf8');

// Let's find all routes and pages defined in the base44 app
// Look for Route paths or router definitions
const routerMatches = js.match(/path:\s*['"`]([^'"`]+)['"`]/g) || [];
console.log('Path matches:');
console.log(Array.from(new Set(routerMatches)));

// Look for component names or exported pages
const createBrowserRouter = js.indexOf('createBrowserRouter');
console.log('createBrowserRouter pos:', createBrowserRouter);

// Let's search for navigation links and pages
const navMatches = js.match(/to:\s*[`'"]\/([^`'"]*)[`'"]/g) || [];
console.log('Nav links:');
console.log(Array.from(new Set(navMatches)));

// Let's extract the full app router/structure

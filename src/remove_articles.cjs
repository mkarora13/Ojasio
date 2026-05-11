const fs = require('fs');

let content = fs.readFileSync('src/pages/Blog.tsx', 'utf8');
const lines = content.split('\n');

const startIndex = 1980; // lines are 0-indexed, so line 1981 is index 1980
const endIndex = 2175; // line 2176 is index 2175

// Wait, let's verify if index 1980 is `  },` and index 1981 is `  {` with `id: "thyroid..."`.
// line 1981 in output: 1981:   {
// line 2175 in output: 2175:   }

lines.splice(startIndex, endIndex - startIndex + 1, '  }');

let newContent = lines.join('\n');
fs.writeFileSync('src/pages/Blog.tsx', newContent, 'utf8');
console.log("Articles removed.");

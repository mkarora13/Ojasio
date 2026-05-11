const fs = require('fs');

let content = fs.readFileSync('src/pages/Blog.tsx', 'utf8');
const lines = content.split('\n');

const idLine = lines.findIndex(l => l.includes('id: "ultimate-gut-health-guide-india"'));
if (idLine !== -1) {
    let startIndex = idLine;
    while(startIndex >= 0 && !lines[startIndex].includes('{')) {
        startIndex--;
    }
    let endIndex = idLine;
    let openBraces = 1;
    while(endIndex < lines.length && openBraces > 0) {
        endIndex++;
        if (lines[endIndex].includes('{')) openBraces++;
        if (lines[endIndex].includes('}')) openBraces--;
    }
    // endIndex is at the closing '  }'
    // if the previous line was `  },`, then startIndex-1 might be `  },` ... wait, startIndex is `  {`.
    // Let's just remove startIndex-1 to endIndex if startIndex-1 is `  },`
    if (startIndex > 0 && lines[startIndex - 1].trim() === '},') {
        lines.splice(startIndex - 1, endIndex - startIndex + 2, '  }');
    } else if (endIndex + 1 < lines.length && lines[endIndex].trim() === '},') {
        lines.splice(startIndex, endIndex - startIndex + 1);
    } else {
        lines.splice(startIndex, endIndex - startIndex + 1);
        // remove the comma from previous object if needed? nah, if it's the last element, the previous one might have a trailing comma, which is valid in TS/JS.
    }
    
    fs.writeFileSync('src/pages/Blog.tsx', lines.join('\n'), 'utf8');
    console.log("Article removed.");
} else {
    console.log("Article not found.");
}

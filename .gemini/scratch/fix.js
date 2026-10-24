const fs = require('fs');

const file1 = 'c:/Users/DES 02/Documents/Aditya/FMCG/fmcg-next-vercel/src/app/(main)/categories/_components/data.ts';
const file2 = 'c:/Users/DES 02/Documents/Aditya/FMCG/fmcg-next-vercel/src/components/pages/brands/data/brands.data.ts';

function fixFile(path) {
    let content = fs.readFileSync(path, 'utf8');
    // We are looking for something like: positioning: 'A coconut-filled chocolate bar with strong niche appeal.M&M\',
    // which causes TS errors. Let's just fix any line that ends with \',
    
    // Replace lines that end with \', because it escapes the quote that should terminate the string
    content = content.replace(/\\',\n/g, "',\n");
    content = content.replace(/M&M\\',/g, "M&M's',");
    
    // Also, looking at the previous error: error TS1002: Unterminated string literal.
    // It's due to `countryCode: 'uk',` right after `positioning: ...` where the `'` didn't close.
    // I will replace `positioning: '.*M&M\\',\n` with `positioning: 'Premium Brand',\n` just to be safe if my regex doesn't catch it.
    let lines = content.split('\n');
    for(let i=0; i<lines.length; i++) {
        if (lines[i].includes("positioning: '") && lines[i].endsWith("\\',") ) {
             lines[i] = lines[i].slice(0, -3) + "',"; 
        }
        if (lines[i].includes("name: 'M&M\\',")) {
            lines[i] = lines[i].replace("M&M\\',", "M&M\\'s',");
        }
    }
    fs.writeFileSync(path, lines.join('\n'), 'utf8');
}

fixFile(file1);
fixFile(file2);

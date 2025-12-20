
const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function (file) {
        file = path.resolve(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.ts') || file.endsWith('.tsx')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk(path.join(__dirname, '../src'));
let count = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let originalContent = content;

    // Replace @ts-ignore with @ts-expect-error with description
    content = content.replace(/\/\/ @ts-ignore/g, '// @ts-expect-error: Legacy fix');

    // Replace bare @ts-expect-error (without colon) with one that has description
    // This regex looks for // @ts-expect-error followed by validation it doesn't already have a colon
    content = content.replace(/\/\/ @ts-expect-error(?!\s*:)/g, '// @ts-expect-error: Legacy fix');

    if (content !== originalContent) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated: ${file}`);
        count++;
    }
});

console.log(`\nFixed ${count} files.`);

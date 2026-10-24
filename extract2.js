const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./lighthouse-report.json'));
const lcpAudit = data.audits['largest-contentful-paint-element'];
console.log('LCP Element:', lcpAudit?.details?.items[0]?.node?.snippet);

console.log('\nMain Thread Work Breakdown:');
const mainThread = data.audits['mainthread-work-breakdown'];
mainThread?.details?.items?.forEach(item => console.log(`${item.groupLabel}: ${item.duration}ms`));

console.log('\nBootup Time (JS):');
const bootup = data.audits['bootup-time'];
bootup?.details?.items?.forEach(item => console.log(`${item.url}: ${item.total}ms`));

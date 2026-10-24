const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./lighthouse-report.json'));
console.log('Scores:');
console.log('Performance:', data.categories.performance?.score);
console.log('Accessibility:', data.categories.accessibility?.score);
console.log('Best Practices:', data.categories['best-practices']?.score);
console.log('SEO:', data.categories.seo?.score);
console.log('\nTop Opportunities:');
if (data.categories.performance?.auditRefs) {
    data.categories.performance.auditRefs.filter(ref => ref.weight > 0 && data.audits[ref.id]?.score !== 1).forEach(ref => {
        const audit = data.audits[ref.id];
        console.log(`- ${audit.title}: ${audit.displayValue || audit.score}`);
    });
}
console.log('\nDiagnostics:');
Object.values(data.audits).filter(a => a.details && a.details.type === 'opportunity' && a.score !== 1).forEach(a => console.log(`- ${a.title}: ${a.displayValue}`));

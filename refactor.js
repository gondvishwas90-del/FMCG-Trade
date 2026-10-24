const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src', 'components', 'pages', 'home', 'components');

const files = [
    'WhoWeWorkWith.tsx',
    'TradeOpportunities.tsx',
    'StrategicImpactShowcase.tsx',
    'RelationshipsSection.tsx',
    'ProcessWorkflow.tsx',
    'ExpertiseAccordion.tsx',
    'ConversationCTA.tsx',
    'CinematicPackageShowcase.tsx',
    'InteractiveCarousel.tsx' // Note: this file already has some m.div replacements but needs cleanup if any motion imports remain
];

files.forEach(file => {
    const filePath = path.join(directoryPath, file);
    if (!fs.existsSync(filePath)) {
        console.log(`File not found: ${filePath}`);
        return;
    }

    let content = fs.readFileSync(filePath, 'utf8');

    // Remove LazyMotion imports and wrappers if they were added inside components
    // Replace import { motion ... } with import { m ... }
    // Only target imports from "motion/react" or 'motion/react'
    const importRegex = /import\s+{[^}]*}\s+from\s+['"]motion\/react['"];?/g;
    content = content.replace(importRegex, (match) => {
        // Remove motion, keep other imports, add m
        let inner = match.substring(match.indexOf('{') + 1, match.indexOf('}')).trim();
        
        let parts = inner.split(',').map(p => p.trim()).filter(p => p !== '');
        
        // Remove motion
        parts = parts.filter(p => p !== 'motion' && p !== 'LazyMotion' && p !== 'domAnimation');
        
        // Add m if not present
        if (!parts.includes('m')) {
            parts.unshift('m');
        }

        const newInner = parts.join(', ');
        return `import { ${newInner} } from "motion/react";`;
    });

    // Replace <motion. and </motion. with <m. and </m.
    content = content.replace(/<motion\./g, '<m.');
    content = content.replace(/<\/motion\./g, '</m.');

    // Replace motion(Component) with m(Component)
    // Careful with this, usually it's motion(
    content = content.replace(/motion\(/g, 'm(');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
});

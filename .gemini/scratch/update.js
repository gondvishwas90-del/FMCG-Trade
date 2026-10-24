const fs = require('fs');

const categoryPath = 'c:/Users/DES 02/Documents/Aditya/FMCG/fmcg-next-vercel/src/app/(main)/categories/_components/data.ts';
const brandsPath = 'c:/Users/DES 02/Documents/Aditya/FMCG/fmcg-next-vercel/src/components/pages/brands/data/brands.data.ts';

let categoryContent = fs.readFileSync(categoryPath, 'utf8');
let brandsContent = fs.readFileSync(brandsPath, 'utf8');

const mapping = {
    'baby-food': { name: 'Baby Food & Infant Nutrition', items: ['Aptamil', 'Cow & Gate', 'SMA', 'Kendamil', 'Organix', "Ella's Kitchen", 'Heinz Baby', 'HiPP Organic'] },
    'confectionery': { name: 'Confectionery & Chocolates', items: ['KitKat', 'Aero', 'Yorkie', 'Twix', 'Snickers', 'Galaxy', 'Bounty', "M&M's", 'Skittles', 'Cadbury', 'Dairy Milk', 'Twirl', 'Wispa', 'Flake', 'McVities', 'Digestives', 'Hobnobs', 'Rich Tea', 'Penguin', 'Club', 'Jaffa Cakes', "Jacob's", "Kellogg's", 'Coco Pops', 'Rice Krispies', 'Special K', 'Crunchy Nut', 'Cheerios', 'Quaker', 'Quaker Oats', 'Walkers', 'Doritos', 'Sensations', 'Pringles'] },
    'soft-drinks': { name: 'Soft Drinks & Water', items: ['Alpro', 'Evian', 'Volvic', 'Coca cola', 'Red bull', 'Monster', 'Prime', 'Pepsi', 'Fanta', 'Sprite', 'Dr Pepper', '7UP', 'San Pellegrino', 'Perrier'] },
    'grocery': { name: 'Grocery', items: ['Nesquik', 'Starbucks', 'Nescafe', 'Dolce Gusto', 'Nido', 'Heinz', 'HP Sauce', 'Amoy', 'Lee & Perrins', 'Ambrosia', "Hellmann's", 'Knorr', 'Pot Noodle', 'Batchelors', 'Heinz Soup', 'Heinz Beans', 'Heinz Pasta', 'Bisto', 'Oxo', 'Birds Custard', 'Marmite', 'Bovril'] },
    'seasonal': { name: 'Seasonal', items: ['Celebrations', 'Quality Street', 'Milk Tray', 'Roses', 'Creme Egg', 'Heros'] }
};

function genId(name) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// 1. Update Tier 2 names and structure in categories
categoryContent = categoryContent.replace(/\{\s*id:\s*'baby-food',[\s\S]*?name:\s*'Baby Food',/g, 
    `{
                id: 'baby-food',
                name: 'Baby Food & Infant Nutrition',`);
categoryContent = categoryContent.replace(/\{\s*id:\s*'confectionery',[\s\S]*?name:\s*'Confectionery',/g, 
    `{
                id: 'confectionery',
                name: 'Confectionery & Chocolates',`);
categoryContent = categoryContent.replace(/\{\s*id:\s*'soft-drinks',[\s\S]*?name:\s*'Soft Drinks',/g, 
    `{
                id: 'soft-drinks',
                name: 'Soft Drinks & Water',`);
categoryContent = categoryContent.replace(/\{\s*id:\s*'grocery-essentials',[\s\S]*?name:\s*'Grocery Essentials',[\s\S]*?tier3: \[[\s\S]*?\]\s*\},/g, 
    `{
                id: 'grocery',
                name: 'Grocery',
                image: 'https://images.unsplash.com/photo-1636563725471-a472cba2e061?auto=format&fit=crop&q=80&w=400',
                description: 'Daily staples for every household.',
                tier3: []
            },`);
categoryContent = categoryContent.replace(/\{\s*id:\s*'snacks-crisps',[\s\S]*?name:\s*'Snacks & Crisps',[\s\S]*?tier3: \[[\s\S]*?\]\s*\}/g, 
    `{
                id: 'seasonal',
                name: 'Seasonal',
                image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1080',
                description: 'Seasonal gifting and treats.',
                tier3: []
            }`);

// Extract existing brand blocks to preserve data if possible
let newBrandsTextCat = ``;
let newBrandsTextFull = ``;

for (let tier2Id of Object.keys(mapping)) {
    let group = mapping[tier2Id];
    for (let brandName of group.items) {
        let brandId = genId(brandName);
        let existingFull = brandsContent.match(new RegExp(`{\\s*id:\\s*'${brandId}'[\\s\\S]*?tradeIntents:\\s*\\[.*?\\]\\s*}`, 'm'));
        
        let c_country = 'Global'; let c_cc = 'uk'; let c_pos = 'Premium Brand'; let c_img = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1080';
        
        if (existingFull) {
            let mt = existingFull[0].match(/country:\s*'([^']+)'/); if (mt) c_country = mt[1];
            mt = existingFull[0].match(/countryCode:\s*'([^']+)'/); if (mt) c_cc = mt[1];
            mt = existingFull[0].match(/positioning:\s*'([^']+)'/); if (mt) c_pos = mt[1];
            mt = existingFull[0].match(/image:\s*'([^']+)'/); if (mt) c_img = mt[1];
        }
        
        newBrandsTextCat += `    {
        id: '${brandId}',
        name: '${brandName.replace(/'/g, "\\'")}',
        tier1Id: 'food-grocery',
        tier2Id: '${tier2Id}',
        tier3Ids: [],
        country: '${c_country}',
        countryCode: '${c_cc}',
        positioning: '${c_pos.replace(/'/g, "\\'")}',
        image: '${c_img}',
        description: '',
        tradeCapabilities: { exportAvailable: true, privateLabel: false, ukDistribution: true, euDistribution: true, onTradeFocused: false, offTradeFocused: true },
        products: []
    },\n`;

        if (!existingFull) {
            newBrandsTextFull += `    {
        id: '${brandId}',
        name: '${brandName.replace(/'/g, "\\'")}',
        country: '${c_country}',
        countryCode: '${c_cc}',
        positioning: '${c_pos.replace(/'/g, "\\'")}',
        category: 'Food & Grocery',
        image: '${c_img}',
        description: '',
        categoryFit: ['Food & Grocery', '${group.name.replace(/'/g, "\\'")}', '${tier2Id}'],
        tradeCapabilities: { exportAvailable: true, privateLabel: false, ukDistribution: true, euDistribution: true, onTradeFocused: false, offTradeFocused: true },
        products: [],
        portfolioRanges: [],
        marketConsiderations: [],
        tradeIntents: ['volume-strategic']
    },\n`;
        } else {
            // Modify existing categoryFit in full brands
            let replaced = existingFull[0].replace(/categoryFit:\s*\[.*?\]/, `categoryFit: ['Food & Grocery', '${group.name.replace(/'/g, "\\'")}', '${tier2Id}']`);
            brandsContent = brandsContent.replace(existingFull[0], replaced);
        }
    }
}

// Overwrite the category brands that are 'food-grocery'
// Wait, I will just append the new brands or overwrite.
// It's safer to remove all food-grocery brands from categories.ts and append newBrandsTextCat
categoryContent = categoryContent.replace(/\s*\{\s*id:\s*'[^']+',\s*name:\s*'[^']+',\s*tier1Id:\s*'food-grocery'[\s\S]*?products:\s*\[[\s\S]*?\]\s*\}(,?)/g, "");

// find end of brands array
categoryContent = categoryContent.replace(/];\s*$/, `    // --- FOOD & GROCERY ---\n${newBrandsTextCat}\n];\n`);

brandsContent = brandsContent.replace(/];\s*$/, `    // --- NEW FOOD & GROCERY ---\n${newBrandsTextFull}\n];\n`);

fs.writeFileSync(categoryPath, categoryContent, 'utf8');
fs.writeFileSync(brandsPath, brandsContent, 'utf8');
console.log('Update completed');

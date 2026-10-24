import fs from 'fs';
import path from 'path';

const darkDir = path.join(process.cwd(), 'Brand Owners Logos', 'Brand_Logos_1_Dark_Mode_2_Light_Mode', '1_Dark_Mode');
const lightDir = path.join(process.cwd(), 'Brand Owners Logos');

const targetDark = path.join(process.cwd(), 'public', 'brand-owners-themed', 'dark');
const targetLight = path.join(process.cwd(), 'public', 'brand-owners-themed', 'light');

fs.mkdirSync(targetDark, { recursive: true });
fs.mkdirSync(targetLight, { recursive: true });

const mappings = [
    {
        slug: 'proximo-spirits',
        darkFile: '01_Proximo_Spirits.png',
        lightFile: 'Proximo Spirits.png'
    },
    {
        slug: 'edrington',
        darkFile: '02_Edrington.png',
        lightFile: 'Edrington.png'
    },
    {
        slug: 'william-grant-sons',
        darkFile: '03_William_Grant_and_Sons.png',
        lightFile: 'William Grant & Sons.png'
    },
    {
        slug: 'constellation-brands',
        darkFile: '04_Constellation_Brands.png',
        lightFile: 'Constellation Brands.png'
    },
    {
        slug: 'lvmh-moet-hennessy',
        darkFile: '05_LVMH_Moet_Hennessy.png',
        lightFile: 'LVMH (Moet Hennessy).png'
    },
    {
        slug: 'asahi-uk',
        darkFile: '06_Asahi_UK.png',
        lightFile: 'Asahi UK.png'
    },
    {
        slug: 'carlsberg-marstons-brewing-company',
        darkFile: '07_Carlsberg_Marstons_Brewing_Company.png',
        lightFile: 'Carlsberg Marston’s Brewing Company.png'
    },
    {
        slug: 'molson-coors',
        darkFile: '08_Molson_Coors.png',
        lightFile: 'Molson Coors UK.png'
    },
    {
        slug: 'fever-tree',
        darkFile: '10_Fever_Tree.png',
        lightFile: 'Fever-Tree.png'
    }
];

for (const item of mappings) {
    const srcDark = path.join(darkDir, item.darkFile);
    const dstDark = path.join(targetDark, `${item.slug}.png`);
    if (fs.existsSync(srcDark)) {
        fs.copyFileSync(srcDark, dstDark);
        console.log(`Copied DARK: ${item.darkFile} -> ${dstDark}`);
    } else {
        console.warn(`Dark file not found: ${srcDark}`);
    }

    const srcLight = path.join(lightDir, item.lightFile);
    const dstLight = path.join(targetLight, `${item.slug}.png`);
    if (fs.existsSync(srcLight)) {
        fs.copyFileSync(srcLight, dstLight);
        console.log(`Copied LIGHT: ${item.lightFile} -> ${dstLight}`);
    } else {
        console.warn(`Light file not found: ${srcLight}`);
    }
}
console.log('All files successfully copied.');

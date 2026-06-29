const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'resources/js/pages');

const pagesToUpdate = [
    'seller/products/index.tsx',
    'seller/products/create.tsx',
    'seller/products/edit.tsx',
    'seller/store/create.tsx',
    'seller/orders/index.tsx',
    'buyer/wallet/index.tsx',
    'buyer/addresses/index.tsx',
    'buyer/cart/index.tsx',
    'buyer/checkout/index.tsx',
    'driver/jobs/index.tsx',
    'driver/dashboard.tsx',
    'admin/dashboard.tsx',
    'admin/vouchers/index.tsx',
];

pagesToUpdate.forEach((pagePath) => {
    const fullPath = path.join(pagesDir, pagePath);
    if (fs.existsSync(fullPath)) {
        let content = fs.readFileSync(fullPath, 'utf8');
        // Regex to match the div block
        const regex = /<div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">\s*<h1 className="text-2xl font-bold">(.*?)<\/h1>\s*<p>(.*?)<\/p>\s*<\/div>/;
        
        content = content.replace(regex, (match, title, pText) => {
            return `<div className="flex h-full flex-1 flex-col gap-8 bg-secondary p-12 lg:p-20">
                <div className="max-w-5xl mx-auto w-full">
                    <h1 className="text-[40px] font-semibold tracking-[-0.01em] leading-[1.1] text-foreground mb-4">
                        ${title}
                    </h1>
                    <p className="text-[21px] font-semibold tracking-[0.231px] text-muted-foreground mb-12">
                        ${pText}
                    </p>
                    <div className="bg-background border border-border rounded-[18px] p-12 min-h-[40vh] flex flex-col items-center justify-center">
                        <p className="text-[17px] text-muted-foreground tracking-[-0.374px]">More details coming soon.</p>
                    </div>
                </div>
            </div>`;
        });

        fs.writeFileSync(fullPath, content);
        console.log(`Updated ${pagePath}`);
    }
});

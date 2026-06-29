const fs = require('fs');
const path = require('path');

const baseDir = 'D:/Work/Projects/Seapedia/resources/js/pages';

const pages = [
  { path: 'catalog/index.tsx', name: 'Catalog', title: 'Product Catalog' },
  { path: 'auth/role-selection.tsx', name: 'RoleSelection', title: 'Select Role' },
  { path: 'seller/store/create.tsx', name: 'CreateStore', title: 'Create Store' },
  { path: 'seller/products/index.tsx', name: 'SellerProducts', title: 'My Products' },
  { path: 'seller/products/create.tsx', name: 'CreateProduct', title: 'Create Product' },
  { path: 'seller/products/edit.tsx', name: 'EditProduct', title: 'Edit Product' },
  { path: 'seller/orders/index.tsx', name: 'SellerOrders', title: 'Manage Orders' },
  { path: 'buyer/wallet/index.tsx', name: 'BuyerWallet', title: 'My Wallet' },
  { path: 'buyer/addresses/index.tsx', name: 'BuyerAddresses', title: 'My Addresses' },
  { path: 'buyer/cart/index.tsx', name: 'BuyerCart', title: 'Shopping Cart' },
  { path: 'buyer/checkout/index.tsx', name: 'BuyerCheckout', title: 'Checkout' },
  { path: 'driver/jobs/index.tsx', name: 'DriverJobs', title: 'Job Board' },
  { path: 'driver/dashboard.tsx', name: 'DriverDashboard', title: 'Driver Dashboard' },
  { path: 'admin/dashboard.tsx', name: 'AdminDashboard', title: 'Admin Dashboard' },
  { path: 'admin/vouchers/index.tsx', name: 'AdminVouchers', title: 'Manage Vouchers' }
];

const template = (name, title) => `import { Head } from '@inertiajs/react';

export default function ${name}() {
    return (
        <>
            <Head title="${title}" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h1 className="text-2xl font-bold">${title}</h1>
                <p>Content for ${title} goes here.</p>
            </div>
        </>
    );
}

${name}.layout = {
    breadcrumbs: [
        {
            title: '${title}',
            href: '#',
        },
    ],
};
`;

pages.forEach(page => {
    const fullPath = path.join(baseDir, page.path);
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(fullPath, template(page.name, page.title));
    console.log('Created:', fullPath);
});

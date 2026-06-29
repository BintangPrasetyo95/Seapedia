import { Head } from '@inertiajs/react';

export default function Catalog() {
    return (
        <>
            <Head title="Product Catalog" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h1 className="text-2xl font-bold">Product Catalog</h1>
                <p>Content for Product Catalog goes here.</p>
            </div>
        </>
    );
}

Catalog.layout = {
    breadcrumbs: [
        {
            title: 'Product Catalog',
            href: '#',
        },
    ],
};

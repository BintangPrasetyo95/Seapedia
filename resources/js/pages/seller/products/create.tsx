import { Head } from '@inertiajs/react';

export default function CreateProduct() {
    return (
        <>
            <Head title="Create Product" />
            <div className="flex h-full flex-1 flex-col gap-8 bg-secondary p-12 lg:p-20">
                <div className="max-w-5xl mx-auto w-full">
                    <h1 className="text-[40px] font-semibold tracking-[-0.01em] leading-[1.1] text-foreground mb-4">
                        Create Product
                    </h1>
                    <p className="text-[21px] font-semibold tracking-[0.231px] text-muted-foreground mb-12">
                        Content for Create Product goes here.
                    </p>
                    <div className="bg-background border border-border rounded-[18px] p-12 min-h-[40vh] flex flex-col items-center justify-center">
                        <p className="text-[17px] text-muted-foreground tracking-[-0.374px]">More details coming soon.</p>
                    </div>
                </div>
            </div>
        </>
    );
}

CreateProduct.layout = {
    breadcrumbs: [
        {
            title: 'Create Product',
            href: '#',
        },
    ],
};

import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function CreateStore() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/seller/store');
    };

    return (
        <>
            <Head title="Create Your Store" />
            <div className="flex h-full flex-1 flex-col gap-8 bg-secondary p-12 lg:p-20">
                <div className="max-w-3xl mx-auto w-full">
                    <h1 className="text-[40px] font-semibold tracking-[-0.01em] leading-[1.1] text-foreground mb-4">
                        Set up your store.
                    </h1>
                    <p className="text-[21px] font-semibold tracking-[0.231px] text-muted-foreground mb-12">
                        Give your brand an identity to start selling on SEAPEDIA.
                    </p>
                    <div className="bg-background border border-border rounded-[18px] p-8">
                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name" className="text-[14px]">Store Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="rounded-lg h-12 px-4"
                                    placeholder="e.g. My Awesome Tech Store"
                                    required
                                />
                                {errors.name && <p className="text-[13px] text-destructive">{errors.name}</p>}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="description" className="text-[14px]">Description (Optional)</Label>
                                <textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="flex w-full rounded-lg border border-input bg-transparent px-4 py-3 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 min-h-[120px]"
                                    placeholder="Tell buyers what you sell..."
                                />
                                {errors.description && <p className="text-[13px] text-destructive">{errors.description}</p>}
                            </div>

                            <div className="pt-4 flex justify-end">
                                <Button type="submit" disabled={processing} className="rounded-full h-10 px-8">
                                    Create Store
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

CreateStore.layout = {
    breadcrumbs: [
        {
            title: 'Create Store',
            href: '#',
        },
    ],
};

import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function CreateProduct() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        price: '',
        stock: '',
        category: '',
        image: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/seller/products');
    };

    return (
        <>
            <Head title="Create Product" />
            <div className="flex h-full flex-1 flex-col gap-8 bg-secondary p-12 lg:p-20">
                <div className="max-w-3xl mx-auto w-full">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-[40px] font-semibold tracking-[-0.01em] leading-[1.1] text-foreground mb-2">
                                Add a New Product
                            </h1>
                            <p className="text-[17px] text-muted-foreground">
                                List a new item in your store.
                            </p>
                        </div>
                        <Button variant="outline" asChild>
                            <Link href="/seller/products">Cancel</Link>
                        </Button>
                    </div>
                    
                    <div className="bg-background border border-border rounded-[18px] p-8">
                        <form onSubmit={submit} className="space-y-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name" className="text-[14px]">Product Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="rounded-lg h-12 px-4"
                                    placeholder="e.g. Vintage Leather Jacket"
                                    required
                                />
                                {errors.name && <p className="text-[13px] text-destructive">{errors.name}</p>}
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="description" className="text-[14px]">Description</Label>
                                <textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="flex w-full rounded-lg border border-input bg-transparent px-4 py-3 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 min-h-[120px]"
                                    placeholder="Detail what makes your product great..."
                                    required
                                />
                                {errors.description && <p className="text-[13px] text-destructive">{errors.description}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="price" className="text-[14px]">Price ($)</Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={data.price}
                                        onChange={(e) => setData('price', e.target.value)}
                                        className="rounded-lg h-12 px-4"
                                        placeholder="0.00"
                                        required
                                    />
                                    {errors.price && <p className="text-[13px] text-destructive">{errors.price}</p>}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="stock" className="text-[14px]">Stock Quantity</Label>
                                    <Input
                                        id="stock"
                                        type="number"
                                        min="0"
                                        value={data.stock}
                                        onChange={(e) => setData('stock', e.target.value)}
                                        className="rounded-lg h-12 px-4"
                                        placeholder="0"
                                        required
                                    />
                                    {errors.stock && <p className="text-[13px] text-destructive">{errors.stock}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="category" className="text-[14px]">Category (Optional)</Label>
                                    <Input
                                        id="category"
                                        type="text"
                                        value={data.category}
                                        onChange={(e) => setData('category', e.target.value)}
                                        className="rounded-lg h-12 px-4"
                                        placeholder="e.g. Clothing"
                                    />
                                    {errors.category && <p className="text-[13px] text-destructive">{errors.category}</p>}
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="image" className="text-[14px]">Image URL (Optional)</Label>
                                    <Input
                                        id="image"
                                        type="url"
                                        value={data.image}
                                        onChange={(e) => setData('image', e.target.value)}
                                        className="rounded-lg h-12 px-4"
                                        placeholder="https://example.com/image.jpg"
                                    />
                                    {errors.image && <p className="text-[13px] text-destructive">{errors.image}</p>}
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end">
                                <Button type="submit" disabled={processing} className="rounded-full h-10 px-8">
                                    List Product
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

CreateProduct.layout = {
    breadcrumbs: [
        {
            title: 'My Products',
            href: '/seller/products',
        },
        {
            title: 'Create Product',
            href: '/seller/products/create',
        },
    ],
};

import { Head, useForm } from '@inertiajs/react';
import { ShieldAlert, Store, ShoppingBag, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { useState } from 'react';

type Props = {
    availableRoles: string[];
};

const ROLE_CONFIG: Record<string, { icon: any; title: string; description: string; color: string }> = {
    Admin: {
        icon: ShieldAlert,
        title: 'Administrator',
        description: 'Manage the entire Seapedia platform.',
        color: 'text-red-500 bg-red-500/10',
    },
    Seller: {
        icon: Store,
        title: 'Seller',
        description: 'Manage your store, products, and orders.',
        color: 'text-blue-500 bg-blue-500/10',
    },
    Buyer: {
        icon: ShoppingBag,
        title: 'Buyer',
        description: 'Shop for products and manage your cart.',
        color: 'text-green-500 bg-green-500/10',
    },
    Driver: {
        icon: Truck,
        title: 'Driver',
        description: 'Deliver orders and manage your trips.',
        color: 'text-orange-500 bg-orange-500/10',
    },
};

export default function RoleSelection({ availableRoles = [] }: Props) {
    const { data, setData, post, processing } = useForm({
        role: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (data.role) {
            post('/role-selection');
        }
    };

    const handleSelectRole = (role: string) => {
        setData('role', role);
    };

    return (
        <>
            <Head title="Select Your Role" />

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {availableRoles.map((roleName) => {
                        const config = ROLE_CONFIG[roleName] || {
                            icon: Store,
                            title: roleName,
                            description: 'Access your ' + roleName + ' dashboard.',
                            color: 'text-gray-500 bg-gray-500/10',
                        };
                        const Icon = config.icon;
                        const isSelected = data.role === roleName;

                        return (
                            <div
                                key={roleName}
                                onClick={() => handleSelectRole(roleName)}
                                className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all duration-300 hover:shadow-md ${
                                    isSelected
                                        ? 'border-primary bg-primary/5'
                                        : 'border-border/50 bg-card hover:border-primary/50 hover:bg-accent/50'
                                }`}
                            >
                                <div className="flex flex-col items-center justify-center gap-4 text-center">
                                    <div className={`rounded-full p-4 ${config.color}`}>
                                        <Icon className="h-8 w-8" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold leading-none tracking-tight">{config.title}</h3>
                                        <p className="text-sm text-muted-foreground mt-2">{config.description}</p>
                                    </div>
                                </div>
                                {isSelected && (
                                    <div className="absolute top-3 right-3 h-3 w-3 rounded-full bg-primary animate-pulse" />
                                )}
                            </div>
                        );
                    })}
                </div>

                <Button
                    type="submit"
                    className="w-full h-12 text-lg mt-4"
                    disabled={!data.role || processing}
                >
                    {processing && <Spinner className="mr-2" />}
                    Continue as {data.role || '...'}
                </Button>
            </form>
        </>
    );
}

RoleSelection.layout = {
    title: 'Choose Your Workspace',
    description: 'Select how you want to interact with Seapedia today.',
};

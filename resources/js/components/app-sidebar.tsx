import { Link, usePage } from '@inertiajs/react';
import { BookOpen, FolderGit2, LayoutGrid, Store, Package, ShoppingCart, MapPin, Truck, ShieldAlert, Ticket } from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: FolderGit2,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const { auth } = usePage().props as any;
    const role = auth?.active_role;

    const mainNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: dashboard(),
            icon: LayoutGrid,
        },
    ];

    if (role === 'Seller') {
        mainNavItems.push({ title: 'My Store', href: '/seller/store/create', icon: Store });
        mainNavItems.push({ title: 'Products', href: '/seller/products', icon: Package });
        mainNavItems.push({ title: 'Orders', href: '/seller/orders', icon: ShoppingCart });
    }
    
    if (role === 'Buyer') {
        mainNavItems.push({ title: 'Marketplace', href: '/buyer/shop', icon: Store });
        mainNavItems.push({ title: 'My Cart', href: '/buyer/cart', icon: ShoppingCart });
        mainNavItems.push({ title: 'Orders', href: '/buyer/orders', icon: Package });
        mainNavItems.push({ title: 'Wallet', href: '/buyer/wallet', icon: Package });
        mainNavItems.push({ title: 'Addresses', href: '/buyer/addresses', icon: MapPin });
    }

    if (role === 'Driver') {
        mainNavItems.push({ title: 'Driver Dashboard', href: '/driver/dashboard', icon: Truck });
        mainNavItems.push({ title: 'Job Board', href: '/driver/jobs', icon: Package });
    }

    if (role === 'Admin') {
        mainNavItems.push({ title: 'Admin Panel', href: '/admin/dashboard', icon: ShieldAlert });
        mainNavItems.push({ title: 'Manage Vouchers', href: '/admin/vouchers', icon: Ticket });
    }

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}

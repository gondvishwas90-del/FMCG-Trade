import {
    LayoutDashboard,
    ShoppingCart,
    Image,
    Layers,
    Tags,
    MessageSquare,
} from "lucide-react";

export type NavItem = {
    id: string;
    label: string;
    icon?: any;
    path?: string;
    roles?: ('admin' | 'super-admin')[];
    submenu?: NavItem[];
};

export const NAV_ITEMS: NavItem[] = [
    {
        id: "categories",
        label: "Categories",
        icon: Layers,
        path: "/admin/categories",
        roles: ["super-admin"],
    },
    {
        id: "brands",
        label: "Brands",
        icon: Tags,
        path: "/admin/brands",
        roles: ["super-admin"],
    },
    {
        id: "brand-owners",
        label: "Brand Owners",
        icon: LayoutDashboard, // Will use LayoutDashboard as it's already imported
        path: "/admin/brand-owners",
        roles: ["super-admin"],
    },
    {
        id: "trade-offers",
        label: "Trade Offers",
        icon: ShoppingCart, // Using ShoppingCart as placeholder, similar to original config
        path: "/admin/trade-offers",
        roles: ["admin", "super-admin"],
    },
    {
        id: "uk-domestic-trade-offers",
        label: "UK Domestic Trade",
        icon: ShoppingCart,
        path: "/admin/uk-domestic-trade-offers",
        roles: ["admin", "super-admin"],
    },
    {
        id: "hero-banners",
        label: "Hero Banners",
        icon: Image,
        path: "/admin/hero-banners",
        roles: ["admin", "super-admin"],
    },
    {
        id: "whatsapp-leads",
        label: "WhatsApp Leads",
        icon: MessageSquare,
        path: "/admin/whatsapp-leads",
        roles: ["admin", "super-admin"],
    },
    {
        id: "media",
        label: "Media Library",
        icon: Image,
        path: "/admin/media",
        roles: ["super-admin"],
    },
];

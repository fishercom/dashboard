import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    url: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    [key: string]: unknown;
}

export interface Pagination {
    current_page: number,
    data: [],
    first_page_url: string,
    from: number,
    last_page: number,
    last_page_url: string,
    links: [{active: boolean,
        label: string,
        url: string}
    ],
    next_page_url?: string,
    path: string,
    per_page: number,
    prev_page_url?: string,
    to: number,
    total: number
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface UserForm {
    id: number,
    name: string,
    email: string,
    avatar?: string,
    active: boolean,
}

export interface Profile {
    id: number,
    name: string,
    sa: boolean,
    active: boolean,
    //permissions : [],
    updated_at: Date,
    created_at: Date
}

export type ProfileForm = {
    id: number,
    name: string,
    active: boolean,
};

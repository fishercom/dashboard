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
    icon?: string | null;
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
    avatar: string;
    profile_id: number;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface UserForm {
    id: number,
    name: string,
    email: string,
    password: string,
    avatar: string,
    profile_id: number;
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
}

export interface Lang {
    id: number,
    name: string,
    iso: string,
    active: boolean,
    updated_at: Date,
    created_at: Date
}

export interface LangForm {
    id: number,
    name: string,
    iso: string,
    active: boolean,
}

export interface Log {
    id: number,
    event_id: number,
    user_id: number,
    comment: string,
    updated_at: Date,
    created_at: Date
}

export interface LogForm {
    id: number,
    event_id: number,
    user_id: number,
    comment: string,
}

export interface Config {
    id: number,
    event_id: number,
    user_id: number,
    alias: string,
    updated_at: Date,
    created_at: Date
}

export interface ConfigForm {
    id: number,
    event_id: number,
    user_id: number,
    alias: string,
}

export interface Site {
    id: number,
    event_id: number,
    user_id: number,
    name: string,
    updated_at: Date,
    created_at: Date
}

export interface SiteForm {
    id: number,
    event_id: number,
    user_id: number,
    name: string,
}

export interface SchemaGroup {
    id: number,
    name: string,
    layout: boolean,
    default: boolean,
    active: boolean,
    updated_at: Date,
    created_at: Date
}

export interface Schema {
    id: number,
    name: string,
    active: boolean,
    updated_at: Date,
    created_at: Date
}

export type SchemaForm = {
    id: number,
    name: string,
    active: boolean,
}

import type { NavItem } from './nav-item';

export interface NavGroup {
    id: number;
    title: string;
    items: NavItem[];
}

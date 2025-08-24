export interface NavItem {
    id: number;
    title: string;
    description: string | null;
    url: string;
    icon?: string | null;
    isActive?: boolean;
}

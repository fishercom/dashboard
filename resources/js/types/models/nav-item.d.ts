import { dynamicIconImports } from 'lucide-react/dynamic';

export interface NavItem {
    id: number;
    title: string;
    description: string | null;
    url: string;
    icon?: keyof typeof dynamicIconImports | null;
    isActive?: boolean;
}

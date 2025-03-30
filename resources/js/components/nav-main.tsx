import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { NavGroup } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { DynamicIcon } from 'lucide-react/dynamic';

export function NavMain({ items = [] }: { items: NavGroup[] }) {
    const page = usePage();
    return (
        <SidebarGroup className="px-2 py-0">
        {items.map((menu) => (
            <div key={menu.title}>
            <SidebarGroupLabel>{menu.title}</SidebarGroupLabel>
            {menu.items &&
            <SidebarMenu>
                {menu.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild isActive={item.url === page.url}>
                            <Link href={item.url} prefetch>
                                {item.icon && <DynamicIcon name={item.icon} />}
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
            }
            </div>
        ))}
        </SidebarGroup>
    );
}

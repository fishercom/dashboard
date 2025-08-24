import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { NavGroup } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { DynamicIcon, IconName } from 'lucide-react/dynamic';

export function NavMain({ items = [] }: { items: NavGroup[] }) {
    const page = usePage();
    const url = page.url;
    return (
        <SidebarGroup className="px-2 py-0">
        {items.map((menu) => (
            <div key={menu.id} className="mb-1 last:mb-0">
            <SidebarGroupLabel>{menu.title}</SidebarGroupLabel>
            {menu.items &&
            <SidebarMenu>
                {menu.items.map((item) => {
                    return <SidebarMenuItem key={item.id}>
                        <SidebarMenuButton asChild isActive={url.includes(item.url)}>
                            <Link href={item.url} prefetch>
                                {item.icon && <DynamicIcon name={item.icon as IconName} />}
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                }
                )}
            </SidebarMenu>
            }
            </div>
        ))}
        </SidebarGroup>
    );
}

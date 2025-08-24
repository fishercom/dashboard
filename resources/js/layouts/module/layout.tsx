import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { NavItem, type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';
import { generateBreadcrumb } from '@/lib/breadcrumbs';
import { usePage } from '@inertiajs/react';
import { NavGroup } from '@/types';

export default function ModuleLayout({ children, view=''}: PropsWithChildren<{view?: string | null}>) {

    const { adm_menu } = usePage<{ adm_menu: NavGroup[] }>().props
    const page = usePage();
    const url = page.url;
    const module: NavItem = { id: 0, title: '', description: '', url: '', icon: '' };
    adm_menu.map((group) => {
        group.items.map((item) => {
            console.log(item.url, url, 'check');
            if (url.includes(item.url)) {
                module.id = item.id;
                module.title = item.title;
                module.description = item.description;
                module.icon = item.icon;
                module.url = item.url;
            }
        })
    })

    console.log(url, module, 'module');

    const breadcrumbs: BreadcrumbItem[] = generateBreadcrumb(module.title, view, module.url);
    const title = view ? `${view} ${module.title}` : module.title;

    // When server-side rendering, we only render the layout on the client...
    if (typeof window === 'undefined') {
        return null;
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
        <Head/>
            <section className="p-3 sm:p-5 antialiased">
                <Heading title={title} description={module.description} />
                <div className="mx-auto overflow-hidden">
                    {children}
                </div>
            </section>
        </AppLayout>
    )
}

import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';
import { generateBreadcrumb } from '@/lib/breadcrumbs';

export default function ModuleLayout({ children, route, module='', action='', description }: PropsWithChildren<{route: string, module: string, action?:string, description: string}>) {

    const breadcrumbs: BreadcrumbItem[] = generateBreadcrumb(module, action, route);
    const title = action ? `${action} ${module}` : module;

    // When server-side rendering, we only render the layout on the client...
    if (typeof window === 'undefined') {
        return null;
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
        <Head/>
            <section className="p-3 sm:p-5 antialiased">
                <Heading title={title} description={description} />
                <div className="mx-auto overflow-hidden">
                    {children}
                </div>
            </section>
        </AppLayout>
    )
}

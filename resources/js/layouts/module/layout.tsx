import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';

export default function ModuleLayout({ children, breadcrumbs, title, description }: PropsWithChildren<{breadcrumbs: BreadcrumbItem[], title: string, description: string}>) {


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

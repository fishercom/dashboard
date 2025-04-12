import Heading from '@/components/heading';
import { type PropsWithChildren } from 'react';

export default function ModuleLayout({ children, title, description }: PropsWithChildren<{title: string, description: string}>) {
    // When server-side rendering, we only render the layout on the client...
    if (typeof window === 'undefined') {
        return null;
    }

    return (
            <section className="p-3 sm:p-5 antialiased">
                <Heading title={title} description={description} />
                <div className="mx-auto overflow-hidden">
                    {children}
                </div>
            </section>
    )
}

import Heading from '@/components/heading';
import { type PropsWithChildren } from 'react';

export default function ModuleLayout({ children, title, description }: PropsWithChildren<{title: string, description: string}>) {
    // When server-side rendering, we only render the layout on the client...
    if (typeof window === 'undefined') {
        return null;
    }

    return (
            <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased">
                <Heading title={title} description={description} />
                <div className="mx-auto max-w-lg overflow-hidden rounded-xl bg-white shadow-md md:max-w-6xl">
                    <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                        {children}
                    </div>
                </div>
            </section>
    )
}

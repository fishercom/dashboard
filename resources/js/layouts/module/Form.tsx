import { type PropsWithChildren } from 'react';

export default function FormLayout({ children }: PropsWithChildren) {
    // When server-side rendering, we only render the layout on the client...
    if (typeof window === 'undefined') {
        return null;
    }

    return (
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="overflow-x-auto items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                {children}
            </div>
        </div>
    )
}

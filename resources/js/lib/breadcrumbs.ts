import { type BreadcrumbItem } from '@/types';

export function generateBreadcrumb(module: string, view: string, path: string): BreadcrumbItem[] {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard' + (module?(' / ' + module): '') + (view?(' / ' + view): ''),
            href: path,
        },
    ];

    return breadcrumbs;
}

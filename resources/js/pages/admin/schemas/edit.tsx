import ModuleLayout from '@/layouts/module/layout';
import FormLayout from '@/layouts/module/Form';
import { type BreadcrumbItem } from '@/types';
import SchemaFields from './partials/fields';

export default function Create() {

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard / Esquemas / Editar',
            href: '/admin/schemas/index',
        },
    ];

    return (
        <ModuleLayout breadcrumbs={breadcrumbs} title="Editar Esquema" description="Administrar los esquemas del sistema">
            <FormLayout>
                <SchemaFields />
            </FormLayout>
        </ModuleLayout>
    );
}

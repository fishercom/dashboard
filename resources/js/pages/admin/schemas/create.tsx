import ModuleLayout from '@/layouts/module/layout';
import FormLayout from '@/layouts/module/Form';
import { type BreadcrumbItem } from '@/types';
import { generateBreadcrumb } from '@/lib/breadcrumbs';
import SchemaFields from './partials/fields';

export default function Create() {

    const breadcrumbs: BreadcrumbItem[] = generateBreadcrumb('Esquemas', 'Crear', route('schemas.index'));

    return (
        <ModuleLayout breadcrumbs={breadcrumbs} title="Crear Esquema" description="Administrar los esquemas del sistema">
            <FormLayout>
                <SchemaFields />
            </FormLayout>
        </ModuleLayout>
    );
}

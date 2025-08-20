import ModuleLayout from '@/layouts/module/layout';
import FormLayout from '@/layouts/module/Form';
import SchemaFields from './partials/fields';

export default function Create() {

    return (
        <ModuleLayout route={route('schemas.index')} module="Esquemas" action="Editar" description="Administrar los esquemas del sistema">
            <FormLayout>
                <SchemaFields />
            </FormLayout>
        </ModuleLayout>
    );
}

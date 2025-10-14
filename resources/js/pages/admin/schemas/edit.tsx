import ModuleLayout from '@/layouts/module/layout';
import FormLayout from '@/layouts/module/Form';
import SchemaFields from './partials/fields';

export default function Edit() {

    return (
        <ModuleLayout view="Editar">
            <FormLayout>
                <SchemaFields />
            </FormLayout>
        </ModuleLayout>
    );
}

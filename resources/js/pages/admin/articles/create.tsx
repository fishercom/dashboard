import ModuleLayout from '@/layouts/module/layout';
import FormLayout from '@/layouts/module/Form';
import ArticleFields from './partials/fields';

export default function Create() {

    return (
        <ModuleLayout view="Crear">
            <FormLayout>
                <ArticleFields/>
            </FormLayout>
        </ModuleLayout>
    );
}

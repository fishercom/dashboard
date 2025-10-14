import ModuleLayout from '@/layouts/module/layout';
import FormLayout from '@/layouts/module/Form';
import ArticleFields from './partials/fields';

export default function Edit() {

    return (
        <ModuleLayout view="Editar">
            <FormLayout>
                <ArticleFields/>
            </FormLayout>
        </ModuleLayout>
    );
}

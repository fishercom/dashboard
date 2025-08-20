import ModuleLayout from '@/layouts/module/layout';
import FormLayout from '@/layouts/module/Form';
import ArticleFields from './partials/fields';

export default function Create() {

    return (
        <ModuleLayout route={route('articles.index')} module="Artículos" action='Crear' description="Administrar los artículos del sistema">
            <FormLayout>
                <ArticleFields/>
            </FormLayout>
        </ModuleLayout>
    );
}

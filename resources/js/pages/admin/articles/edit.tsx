import ModuleLayout from '@/layouts/module/layout';
import FormLayout from '@/layouts/module/Form';
import { type BreadcrumbItem } from '@/types';
import { generateBreadcrumb } from '@/lib/breadcrumbs';
import ArticleFields from './partials/fields';

export default function Create() {
    const breadcrumbs: BreadcrumbItem[] = generateBreadcrumb('Artículos', 'Editar', route('articles.index'));

    return (
        <ModuleLayout breadcrumbs={breadcrumbs} title="Editar Artículo" description="Administrar los artículos del sistema">
            <FormLayout>
                <ArticleFields/>
            </FormLayout>
        </ModuleLayout>
    );
}

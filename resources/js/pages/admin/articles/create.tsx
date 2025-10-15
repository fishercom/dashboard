import ModuleLayout from '@/layouts/module/layout';
import FormLayout from '@/layouts/module/Form';
import ArticleFields from './partials/fields';
import { Link, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { Button } from '@/components/ui/button';
import { createArticle } from '@/services/articles';
import { ArticleForm } from '@/types/models/article';
import { Schema } from '@/types';

export default function Create() {
    const { schema } = usePage<{ schema?: Schema }>().props;

    const initial: ArticleForm = {
        id: null,
        parent_id: null,
        schema_id: Number(schema?.id || 1),
        lang_id: 1, // Assuming default lang_id
        title: '',
        metadata: {},
        slug: '',
        active: true,
    };
    const [data, setData] = useState<ArticleForm>(initial);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [processing, setProcessing] = useState(false);

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        createArticle(data, {
            onSuccess: () => {
                setProcessing(false);
                setData(initial);
            },
            onError: (err: Record<string, string>) => {
                setErrors(err);
                setProcessing(false);
            },
        });
    };

    return (
        <ModuleLayout view="Crear">
            <FormLayout>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <ArticleFields
                        data={data}
                        setData={setData}
                        errors={errors}
                        processing={processing}
                        schema={schema}
                    />
                    <div className="flex items-center gap-4">
                        <Button disabled={processing}>Guardar</Button>
                        <Link href='/admin/articles'>Cancelar</Link>
                    </div>
                </form>
            </FormLayout>
        </ModuleLayout>
    );
}

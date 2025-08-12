import InputError from '@/components/input-error';
import { Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Article, ArticleForm, Schema } from '@/types';
import CustomFieldRenderer from '@/components/custom-field-renderer';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
//import CustomFieldManager from '@/components/custom-field-manager';

export default function ArticleFields() {

    type FormDataConvertible = string | number | boolean | null | File | Blob | Date | FormDataConvertible[] | { [key: string]: FormDataConvertible };
    type ArticleFormData = Required<Omit<ArticleForm, 'metadata'>> & { metadata: { [key: string]: FormDataConvertible } };

    const { item, schema } = usePage<{ item?: Partial<Article>, schema?: Schema }>().props;
    const initial: ArticleFormData = {
        id: item?.id || null,
        parent_id: item?.parent_id || null,
        schema_id: Number(item?.schema_id || 1),
        lang_id: Number(item?.lang_id || 1),
        title: String(item?.title || ''),
        metadata: (item?.metadata as { [key: string]: FormDataConvertible }) || {},
        slug: String(item?.slug || ''),
        active: Boolean(item?.active ?? true),
    };
    const form = useForm<ArticleFormData>(initial);
    const {data, setData, errors, processing} = form;
    data.schema_id = data?.schema_id || 1;
    data.lang_id = data?.lang_id || 1;

    const createArticle: FormEventHandler = (e) => {
        e.preventDefault();
        const { post, reset } = form;

        post('/admin/articles', {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.title) {
                    reset('title');
                }

                if (errors.active) {
                    reset('active');
                }
            },
        });
    };

    const updateArticle: FormEventHandler = (e) => {
        e.preventDefault();
        const { put, reset } = form;

        put('/admin/articles/'+data.id, {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.title) {
                    reset('title');
                }

                if (errors.active) {
                    reset('active');
                }
            },
        });
    };

    return (
        <form onSubmit={data.id? updateArticle: createArticle} className="space-y-6">
            <div className="grid gap-2">
                <Label htmlFor="title">Nombre</Label>
                <Input
                    id="title"
                    type="text"
                    required
                    autoFocus
                    tabIndex={1}
                    autoComplete="title"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    disabled={processing}
                />

                <InputError message={errors.title} />
            </div>

            {schema?.fields?.length ? (
                <div className="space-y-4">
                    <Label>Campos personalizados</Label>
                    <CustomFieldRenderer
                        fields={schema.fields}
                        values={(data.metadata as any) || {}}
                        onChange={(key: string, value: any) => {
                            const next = { ...(data.metadata as any), [key]: value } as ArticleFormData['metadata'];
                            setData('metadata', next);
                        }}
                    />
                </div>
            ) : null}

            <div className="flex items-center space-x-3">
                <Checkbox
                    id="active"
                    name="active"
                    checked={data.active}
                    onClick={() => setData('active', !data.active)}
                    tabIndex={3}
                />
                <Label htmlFor="active">Activo</Label>
            </div>

            <div className="flex items-center gap-4">
                <Button disabled={processing}>Guardar</Button>
                <Link href='/admin/articles'>Cancelar</Link>
            </div>
        </form>
    )
}

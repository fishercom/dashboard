import InputError from '@/components/input-error';
import { Link, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Article, ArticleForm, Schema } from '@/types';
import CustomFieldRenderer from '@/components/custom-field-renderer';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createArticle, updateArticle } from '@/services/articles';

type JsonValue = string | number | boolean | null | JsonObject | JsonArray;
interface JsonObject { [key: string]: JsonValue }
type JsonArray = JsonValue[];

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
    const [data, setData] = useState<ArticleFormData>(initial);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [processing, setProcessing] = useState(false);

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        if (data.id) {
            updateArticle(data.id, data, {
                onSuccess: () => setProcessing(false),
                onError: (err: Record<string, string>) => {
                    setErrors(err);
                    setProcessing(false);
                },
            });
        } else {
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
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
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
                    onChange={(e) => setData({ ...data, title: e.target.value })}
                    disabled={processing}
                />

                <InputError message={errors.title} />
            </div>

            {schema?.fields?.length ? (
                <div className="space-y-4">
                    <Label>Campos personalizados</Label>
                    <CustomFieldRenderer
                        fields={schema.fields}
                        values={data.metadata as Record<string, JsonValue>}
                        onChange={(key: string, value: JsonValue) => {
                            const next = { ...data.metadata, [key]: value };
                            setData({ ...data, metadata: next as ArticleFormData['metadata'] });
                        }}
                    />
                </div>
            ) : null}

            <div className="flex items-center space-x-3">
                <Checkbox
                    id="active"
                    name="active"
                    checked={data.active}
                    onClick={() => setData({ ...data, active: !data.active })}
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

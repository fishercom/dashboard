import InputError from '@/components/input-error';
import { Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Article, ArticleForm } from '@/types';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
//import CustomFieldManager from '@/components/custom-field-manager';

export default function ArticleFields() {

    const { item } = usePage<{ item: Article }>().props;
    const form = useForm<Required<ArticleForm>>(item);
    const {data, setData, errors, processing} = form;
    //console.log(data);
    data.schema_id = item?.schema_id || 1;
    data.lang_id = item?.lang_id || 1;

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

import InputError from '@/components/input-error';
import { Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Schema, SchemaForm } from '@/types';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import CustomFieldManager from '@/components/custom-field-manager';

export default function SchemaFields() {

    const { item } = usePage<{ item: Schema }>().props;
    const form = useForm<Required<SchemaForm>>(item);
    const {data, setData, errors, processing} = form;
    //console.log(data);

    const fields: [] = data.fields;
    //console.log(fields);

    const createSchema: FormEventHandler = (e) => {
        e.preventDefault();
        const { post, reset } = form;

        post('/admin/schemas', {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.name) {
                    reset('name');
                }

                if (errors.active) {
                    reset('active');
                }
            },
        });
    };

    const updateSchema: FormEventHandler = (e) => {
        e.preventDefault();
        const { put, reset } = form;

        put('/admin/schemas/'+data.id, {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.name) {
                    reset('name');
                }

                if (errors.active) {
                    reset('active');
                }
            },
        });
    };

    return (
        <form onSubmit={data.id? updateSchema: createSchema} className="space-y-6">
            <div className="grid gap-2">
                <Label htmlFor="name">Nombre</Label>
                <Input
                    id="name"
                    type="text"
                    required
                    autoFocus
                    autoComplete="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    disabled={processing}
                />
                <InputError message={errors.name} />
            </div>

            <CustomFieldManager
                fields={data.fields || []}
                setFields={(newFields) => setData('fields', newFields)}
            />

            <div className="grid gap-2">
                <Label htmlFor="iterations">Iteraciones</Label>
                <Input
                    id="iterations"
                    type="numeric"
                    autoComplete="iterations"
                    value={data.iterations}
                    onChange={(e) => setData('iterations', parseInt(e.target.value))}
                    disabled={processing}
                />
                <InputError message={errors.iterations} />
            </div>

            <div className="flex items-center space-x-3">
                <Checkbox
                    id="active"
                    name="active"
                    checked={Boolean(data.active)}
                    onClick={() => setData('active', !data.active)}
                />
                <Label htmlFor="active">Activo</Label>
            </div>

            <div className="flex items-center gap-4">
                <Button disabled={processing}>Guardar</Button>
                <Link href='/admin/schemas'>Cancelar</Link>
            </div>
        </form>
    )
}

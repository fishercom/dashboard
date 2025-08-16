import InputError from '@/components/input-error';
import { Link, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Schema, SchemaForm, CustomField } from '@/types';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import CustomFieldManager from '@/components/custom-field-manager';
import { createSchema, updateSchema } from '@/services/schemas';

export default function SchemaFields() {

    type SchemaFormData = Required<Omit<SchemaForm, 'fields'>> & { fields: CustomField[] };

    const { item } = usePage<{ item: Schema }>().props;
    const initial: SchemaFormData = {
        id: item?.id || null,
        parent_id: item?.parent_id || null,
        group_id: Number(item?.group_id || 1),
        name: String(item?.name || ''),
        fields: item?.fields || [],
        iterations: Number(item?.iterations || 1),
        type: String(item?.type || ''),
        active: Boolean(item?.active ?? true),
    };
    const [data, setData] = useState<SchemaFormData>(initial);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [processing, setProcessing] = useState(false);

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        if (data.id) {
            updateSchema(data.id, data, {
                onSuccess: () => setProcessing(false),
                onError: (err: Record<string, string>) => {
                    setErrors(err);
                    setProcessing(false);
                },
            });
        } else {
            createSchema(data, {
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
                <Label htmlFor="name">Nombre</Label>
                <Input
                    id="name"
                    type="text"
                    required
                    autoFocus
                    autoComplete="name"
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    disabled={processing}
                />
                <InputError message={errors.name} />
            </div>

            <CustomFieldManager
                fields={data.fields || []}
                setFields={(newFields) => setData({ ...data, fields: newFields })}
            />

            <div className="grid gap-2">
                <Label htmlFor="iterations">Iteraciones</Label>
                <Input
                    id="iterations"
                    type="numeric"
                    autoComplete="iterations"
                    value={data.iterations}
                    onChange={(e) => setData({ ...data, iterations: parseInt(e.target.value) })}
                    disabled={processing}
                />
                <InputError message={errors.iterations} />
            </div>

            <div className="flex items-center space-x-3">
                <Checkbox
                    id="active"
                    name="active"
                    checked={Boolean(data.active)}
                    onClick={() => setData({ ...data, active: !data.active })}
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

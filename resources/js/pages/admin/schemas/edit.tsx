import InputError from '@/components/input-error';
import ModuleLayout from '@/layouts/module/layout';
import FormLayout from '@/layouts/module/Form';
import { type BreadcrumbItem } from '@/types';
import { Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Schema, SchemaForm } from '@/types';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Create() {

    const { item } = usePage<{ item: Schema }>().props;
    const { data, setData, errors, put, reset, processing } = useForm<Required<SchemaForm>>(item);
    //console.log(data);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard / Esquemas / Editar',
            href: '/admin/schemas/index',
        },
    ];

    const updateSchema: FormEventHandler = (e) => {
        e.preventDefault();

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
        <ModuleLayout breadcrumbs={breadcrumbs} title="Editar Esquema" description="Administrar los esquemas del sistema">
            <FormLayout>
            <form onSubmit={updateSchema} className="space-y-6">
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

                <div className="grid gap-2">
                    <Label htmlFor="admin_view">Admin View</Label>
                    <Input
                        id="admin_view"
                        type="text"
                        required
                        autoComplete="admin_view"
                        value={data.admin_view}
                        onChange={(e) => setData('admin_view', e.target.value)}
                        disabled={processing}
                    />
                    <InputError message={errors.admin_view} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="front_view">Front View</Label>
                    <Input
                        id="front_view"
                        type="text"
                        required
                        autoComplete="front_view"
                        value={data.front_view}
                        onChange={(e) => setData('front_view', e.target.value)}
                        disabled={processing}
                    />
                    <InputError message={errors.front_view} />
                </div>

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
                        id="is_page"
                        name="is_page"
                        checked={Boolean(data.is_page)}
                        onClick={() => setData('is_page', !data.is_page)}
                    />
                    <Label htmlFor="is_page">Es Página</Label>
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
            </FormLayout>
        </ModuleLayout>
    );
}

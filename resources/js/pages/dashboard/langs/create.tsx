import InputError from '@/components/input-error';
import AppLayout from '@/layouts/app-layout';
import ModuleLayout from '@/layouts/module/layout';
import FormLayout from '@/layouts/module/Form';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, Link } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { LangForm } from '@/types';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard / Idiomas / Crear',
        href: '/admin/langs/index',
    },
];

export default function Create() {

    const item: LangForm = {
        id: 0,
        name: '',
        iso: '',
        active: false,
    }
    const { data, setData, errors, post, reset, processing } = useForm<Required<LangForm>>(item);

    const createLang: FormEventHandler = (e) => {
        e.preventDefault();

        post('/dashboard/langs', {
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
    <AppLayout breadcrumbs={breadcrumbs}>
        <Head/>
        <ModuleLayout title="Crear Idioma" description="Administrar los idiomas del sistema">
            <FormLayout>
            <form onSubmit={createLang} className="space-y-6">
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
                    <Label htmlFor="iso">ISO</Label>
                    <Input
                        id="iso"
                        type="text"
                        required
                        autoComplete="iso"
                        value={data.iso}
                        onChange={(e) => setData('iso', e.target.value)}
                        disabled={processing}
                    />
                    <InputError message={errors.name} />
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
                    <Link href='/dashboard/langs'>Cancelar</Link>
                </div>
            </form>
            </FormLayout>
        </ModuleLayout>
    </AppLayout>
    );
}

import InputError from '@/components/input-error';
import AppLayout from '@/layouts/app-layout';
import ModuleLayout from '@/layouts/module/layout';
import FormLayout from '@/layouts/module/Form';
import { type BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, useForm, Link } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { ProfileForm } from '@/types';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard / Perfiles / Crear',
        href: '/admin/profiles/index',
    },
];

export default function Create() {

    const item: ProfileForm = {
        id: 0,
        name: '',
        active: false,
    }
    const { data, setData, errors, post, reset, processing, recentlySuccessful } = useForm<Required<ProfileForm>>(item);

    const createProfile: FormEventHandler = (e) => {
        e.preventDefault();

        post('/dashboard/profiles', {
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
        <ModuleLayout title="Crear Perfil" description="Administrar los perfiles del sistema">
            <FormLayout>
            <form onSubmit={createProfile} className="space-y-6">
                <div className="grid gap-2">
                    <Label htmlFor="name">Nombre</Label>

                    <Input
                        id="name"
                        type="text"
                        required
                        autoFocus
                        tabIndex={1}
                        autoComplete="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        disabled={processing}
                        placeholder="Nombre"
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
                    <Link href='/dashboard/profiles'>Cancelar</Link>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-neutral-600">Datos guardados con éxito!</p>
                    </Transition>
                </div>
            </form>
            </FormLayout>
        </ModuleLayout>
    </AppLayout>
    );
}

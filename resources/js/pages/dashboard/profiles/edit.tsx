import InputError from '@/components/input-error';
import AppLayout from '@/layouts/app-layout';
import ModuleLayout from '@/layouts/module/layout';
import { type BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useRef } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Profile, ProfileForm } from '@/types';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard / Perfiles / Editar',
        href: '/admin/profiles/index',
    },
];

export default function Create() {

    const { item } = usePage<{ item: Profile }>().props;
    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm<Required<ProfileForm>>(item);

    console.log(data);

    const updateProfile: FormEventHandler = (e) => {
        e.preventDefault();

        put('/dashboard/profiles/'+data.id, {
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
        <ModuleLayout title="Editar Perfil" description="Administrar los perfiles del sistema">

            <form onSubmit={updateProfile} className="space-y-6">
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
                        checked={Boolean(data.active)}
                        onClick={() => setData('active', !data.active)}
                        tabIndex={3}
                    />
                    <Label htmlFor="active">Activo</Label>
                </div>

                <div className="flex items-center gap-4">
                    <Button disabled={processing}>Guardar</Button>
                    <a href='/dashboard/profiles'>Cancelar</a>

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

        </ModuleLayout>
    </AppLayout>
    );
}

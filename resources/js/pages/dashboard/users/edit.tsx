import InputError from '@/components/input-error';
import AppLayout from '@/layouts/app-layout';
import ModuleLayout from '@/layouts/module/layout';
import FormLayout from '@/layouts/module/Form';
import { type BreadcrumbItem } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Profile, UserForm } from '@/types';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard / Usuarios / Editar',
        href: '/admin/users/index',
    },
];

export default function Create() {

    const { item, profiles } = usePage<{ item: UserForm, profiles: Profile[] }>().props;
    const { data, setData, errors, put, reset, processing, recentlySuccessful } = useForm<Required<UserForm>>(item);

    console.log(data);

    const updateUser: FormEventHandler = (e) => {
        e.preventDefault();

        put('/dashboard/users/'+data.id, {
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
        <ModuleLayout title="Editar Usuario" description="Administrar los usuarios del sistema">
            <FormLayout>
            <form onSubmit={updateUser} className="space-y-6">
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

                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        required
                        autoFocus
                        tabIndex={1}
                        autoComplete="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        disabled={processing}
                        placeholder="Email"
                    />
                    <InputError message={errors.name} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="profile">Perfil</Label>
                    <select
                        id="profile_id"
                        name="profile_id"
                        value={data.profile_id} //added
                        required={true}
                        disabled={processing}
                        onChange={(e) => setData('profile_id', parseInt(e.target.value))}>
                        <option></option>
                        {profiles.map((option, index) => {
                            return (
                                <option key={index} value={option.id}>
                                    {option.name}
                                </option>
                            );
                        })}
                    </select>
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
                    <Link href='/dashboard/users'>Cancelar</Link>

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

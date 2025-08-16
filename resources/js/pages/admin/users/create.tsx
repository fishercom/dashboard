import InputError from '@/components/input-error';
import ModuleLayout from '@/layouts/module/layout';
import FormLayout from '@/layouts/module/Form';
import { type BreadcrumbItem } from '@/types';
import { usePage, Link } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Profile, UserForm } from '@/types';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createUser } from '@/services/users';

export default function Create() {

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard / Usuarios / Crear',
            href: '/admin/users/index',
        },
    ];

    const item: UserForm = {
        id: 0,
        name: '',
        email: '',
        password: '',
        avatar: '',
        profile_id: 0,
        active: false,
    }
    const { profiles } = usePage<{ profiles: Profile[] }>().props;
    const [data, setData] = useState<Required<UserForm>>(item);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [processing, setProcessing] = useState(false);

    const createUserHandler: FormEventHandler = (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        createUser(data, {
            onSuccess: () => {
                setProcessing(false);
                setData(item);
            },
            onError: (err: Record<string, string>) => {
                setErrors(err);
                setProcessing(false);
            },
        });
    };

    return (
        <ModuleLayout breadcrumbs={breadcrumbs} title="Crear Usuario" description="Administrar los usuarios del sistema">
            <FormLayout>
            <form onSubmit={createUserHandler} className="space-y-6">
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
                        onChange={(e) => setData({ ...data, name: e.target.value })}
                        disabled={processing}
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
                        onChange={(e) => setData({ ...data, email: e.target.value })}
                        disabled={processing}
                    />
                    <InputError message={errors.name} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input
                        id="password"
                        type="password"
                        required
                        autoFocus
                        tabIndex={1}
                        autoComplete="password"
                        value={data.password}
                        onChange={(e) => setData({ ...data, password: e.target.value })}
                        disabled={processing}
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
                        onChange={(e) => setData({ ...data, profile_id: parseInt(e.target.value) })}>
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
                        checked={data.active}
                        onClick={() => setData({ ...data, active: !data.active })}
                        tabIndex={3}
                    />
                    <Label htmlFor="active">Activo</Label>
                </div>

                <div className="flex items-center gap-4">
                    <Button disabled={processing}>Guardar</Button>
                    <Link href='/admin/users'>Cancelar</Link>
                </div>
            </form>
            </FormLayout>
        </ModuleLayout>
    );
}

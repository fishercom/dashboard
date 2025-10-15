import ModuleLayout from '@/layouts/module/layout';
import FormLayout from '@/layouts/module/Form';
import { usePage, Link } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

import { Button } from '@/components/ui/button';
import { createUser } from '@/services/users';
import UserFormFields, { UserForm } from './partials/fields';
import { Profile } from '@/types/models/profile';

export default function Create() {
    const { profiles } = usePage<{ profiles: Profile[] }>().props;

    const item: UserForm = {
        username: '',
        email: '',
        password: '',
        name: '',
        lastname: '',
        profile_id: profiles[0]?.id || 0,
        metadata: {},
        active: false,
        default: false,
    }
    const [data, setData] = useState<UserForm>(item);
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
        <ModuleLayout view="Crear">
            <FormLayout>
            <form onSubmit={createUserHandler} className="space-y-6">
                <UserFormFields
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    profiles={profiles}
                />

                <div className="flex items-center gap-4">
                    <Button disabled={processing}>Guardar</Button>
                    <Link href='/admin/users'>Cancelar</Link>
                </div>
            </form>
            </FormLayout>
        </ModuleLayout>
    );
}

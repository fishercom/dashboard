import ModuleLayout from '@/layouts/module/layout';
import FormLayout from '@/layouts/module/Form';
import { usePage, Link } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

import { Button } from '@/components/ui/button';
import { updateUser } from '@/services/users';
import UserFormFields, { UserForm } from './partials/fields';
import { User } from '@/types/models/user';
import { Profile } from '@/types/models/profile';


export default function Edit() {
    const { item, profiles } = usePage<{ item: User, profiles: Profile[] }>().props;

    const [data, setData] = useState<UserForm>({
        id: item.id,
        username: item.username || '',
        email: item.email,
        name: item.name,
        lastname: item.lastname || '',
        profile_id: item.profile_id || 0,
        metadata: item.metadata || {},
        active: Boolean(item.active),
        default: Boolean(item.default),
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [processing, setProcessing] = useState(false);

    const updateUserHandler: FormEventHandler = (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        updateUser(item.id, data, {
            onSuccess: () => {
                setProcessing(false);
            },
            onError: (err: Record<string, string>) => {
                setErrors(err);
                setProcessing(false);
            },
        });
    };

    return (
        <ModuleLayout view="Editar">
            <FormLayout>
            <form onSubmit={updateUserHandler} className="space-y-6">
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

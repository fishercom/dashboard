import ModuleLayout from '@/layouts/module/layout';
import FormLayout from '@/layouts/module/Form';
import { Link, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

import { Button } from '@/components/ui/button';
import { createNotify } from '@/services/notifies';
import NotifyFormFields from './partials/fields';
import { CmsNotifyForm } from '@/types/models/cms-notify';
import { CmsForm } from '@/types/models/cms-form';
import { User } from '@/types/models/user';

export default function Create() {
    const { forms, users } = usePage<{ forms: CmsForm[], users: User[] }>().props;

    const item: CmsNotifyForm = {
        form_id: forms[0]?.id || 0,
        user_id: users[0]?.id || 0,
        recipients: '',
        active: false,
    }
    const [data, setData] = useState<CmsNotifyForm>(item);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [processing, setProcessing] = useState(false);

    const createNotifyHandler: FormEventHandler = (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        createNotify(data, {
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
            <form onSubmit={createNotifyHandler} className="space-y-6">
                <NotifyFormFields
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    forms={forms}
                    users={users}
                />

                <div className="flex items-center gap-4">
                    <Button disabled={processing}>Guardar</Button>
                    <Link href='/admin/notifies'>Cancelar</Link>
                </div>
            </form>
            </FormLayout>
        </ModuleLayout>
    );
}

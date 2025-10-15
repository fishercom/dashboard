import ModuleLayout from '@/layouts/module/layout';
import FormLayout from '@/layouts/module/Form';
import { Link, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

import { Button } from '@/components/ui/button';
import { createLog } from '@/services/logs';
import LogFormFields from './partials/fields';
import { AdmLogForm } from '@/types/models/adm-log';
import { AdmEvent } from '@/types/models/adm-event';
import { User } from '@/types/models/user';

export default function Create() {
    const { events, users } = usePage<{ events: AdmEvent[], users: User[] }>().props;

    const item: AdmLogForm = {
        event_id: events[0]?.id || 0,
        user_id: users[0]?.id || 0,
        comment: '',
    }
    const [data, setData] = useState<AdmLogForm>(item);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [processing, setProcessing] = useState(false);

    const createLogHandler: FormEventHandler = (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        createLog(data, {
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
            <form onSubmit={createLogHandler} className="space-y-6">
                <LogFormFields
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    events={events}
                    users={users}
                />

                <div className="flex items-center gap-4">
                    <Button disabled={processing}>Guardar</Button>
                    <Link href='/admin/logs'>Cancelar</Link>
                </div>
            </form>
            </FormLayout>
        </ModuleLayout>
    );
}

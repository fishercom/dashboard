import ModuleLayout from '@/layouts/module/layout';
import FormLayout from '@/layouts/module/Form';
import { Link, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

import { Button } from '@/components/ui/button';
import { updateLog } from '@/services/logs';
import LogFormFields from './partials/fields';
import { AdmLog, AdmLogForm } from '@/types/models/adm-log';
import { AdmEvent } from '@/types/models/adm-event';
import { User } from '@/types/models/user';

export default function Edit() {
    const { item, events, users } = usePage<{ item: AdmLog, events: AdmEvent[], users: User[] }>().props;

    const [data, setData] = useState<AdmLogForm>({
        id: item.id,
        event_id: item.event_id,
        user_id: item.user_id,
        comment: item.comment || '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [processing, setProcessing] = useState(false);

    const updateLogHandler: FormEventHandler = (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        updateLog(data.id!, data, {
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
            <form onSubmit={updateLogHandler} className="space-y-6">
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

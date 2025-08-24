import InputError from '@/components/input-error';
import ModuleLayout from '@/layouts/module/layout';
import FormLayout from '@/layouts/module/Form';
import { Link, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { Log, LogForm } from '@/types';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { updateLog } from '@/services/logs';

export default function Create() {

    const { item } = usePage<{ item: Log }>().props;
    const [data, setData] = useState<Required<LogForm>>(item);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [processing, setProcessing] = useState(false);

    const updateLogHandler: FormEventHandler = (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        updateLog(data.id, data, {
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
                <div className="grid gap-2">
                    <Label htmlFor="name">Evento</Label>
                    <Input
                        id="event_id"
                        type="text"
                        required
                        autoFocus
                        value={data.event_id}
                        onChange={(e) => setData({ ...data, event_id: parseInt(e.target.value) })}
                        disabled={processing}
                    />
                    <InputError message={errors.event_id} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="name">Usuario</Label>
                    <Input
                        id="user_id"
                        type="text"
                        required
                        autoFocus
                        value={data.user_id}
                        onChange={(e) => setData({ ...data, user_id: parseInt(e.target.value) })}
                        disabled={processing}
                    />
                    <InputError message={errors.user_id} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="name">Comentario</Label>
                    <Input
                        id="comment"
                        type="text"
                        required
                        autoFocus
                        value={data.comment}
                        onChange={(e) => setData({ ...data, comment: e.target.value })}
                        disabled={processing}
                    />
                    <InputError message={errors.comment} />
                </div>

                <div className="flex items-center gap-4">
                    <Button disabled={processing}>Guardar</Button>
                    <Link href='/admin/logs'>Cancelar</Link>
                </div>
            </form>
            </FormLayout>
        </ModuleLayout>
    );
}

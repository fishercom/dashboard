import InputError from '@/components/input-error';
import ModuleLayout from '@/layouts/module/layout';
import FormLayout from '@/layouts/module/Form';
import { Link, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Notify, NotifyForm } from '@/types';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { updateNotify } from '@/services/notifies';

export default function Edit() {

    const { item } = usePage<{ item: Notify }>().props;
    const [data, setData] = useState<Required<NotifyForm>>(item);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [processing, setProcessing] = useState(false);

    const updateNotifyHandler: FormEventHandler = (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        updateNotify(data.id, data, {
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
            <form onSubmit={updateNotifyHandler} className="space-y-6">
                <div className="grid gap-2">
                    <Label htmlFor="form_id">Form</Label>

                    <Input
                        id="form_id"
                        type="text"
                        required
                        autoFocus
                        tabIndex={1}
                        autoComplete="form_id"
                        value={data.form_id}
                        onChange={(e) => setData({ ...data, form_id: parseInt(e.target.value) })}
                        disabled={processing}
                    />

                    <InputError message={errors.form_id} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="user_id">User</Label>

                    <Input
                        id="user_id"
                        type="text"
                        required
                        autoFocus
                        tabIndex={2}
                        autoComplete="user_id"
                        value={data.user_id}
                        onChange={(e) => setData({ ...data, user_id: parseInt(e.target.value) })}
                        disabled={processing}
                    />

                    <InputError message={errors.user_id} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="recipients">Recipients</Label>
                    <Textarea
                        id="recipients"
                        required
                        autoFocus
                        tabIndex={3}
                        autoComplete="recipients"
                        value={data.recipients}
                        onChange={(e) => setData({ ...data, recipients: e.target.value })}
                        disabled={processing}
                    />
                    <InputError message={errors.recipients} />
                </div>

                <div className="flex items-center space-x-3">
                    <Checkbox
                        id="active"
                        name="active"
                        checked={Boolean(data.active)}
                        onClick={() => setData({ ...data, active: !data.active })}
                        tabIndex={3}
                    />
                    <Label htmlFor="active">Activo</Label>
                </div>

                <div className="flex items-center gap-4">
                    <Button disabled={processing}>Guardar</Button>
                    <Link href='/admin/notifies'>Cancelar</Link>
                </div>
            </form>
            </FormLayout>
        </ModuleLayout>
    );
}

import InputError from '@/components/input-error';
import ModuleLayout from '@/layouts/module/layout';
import FormLayout from '@/layouts/module/Form';
import { type BreadcrumbItem } from '@/types';
import { Link } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
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

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard / Logs / Editar',
            href: '/admin/logs/index',
        },
    ];

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
        <ModuleLayout breadcrumbs={breadcrumbs} title="Editar Log" description="Administrar los logs del sistema">
            <FormLayout>
            <form onSubmit={updateLogHandler} className="space-y-6">
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
                    <Label htmlFor="iso">ISO</Label>
                    <Input
                        id="iso"
                        type="text"
                        required
                        autoFocus
                        autoComplete="iso"
                        value={data.iso}
                        onChange={(e) => setData({ ...data, iso: e.target.value })}
                        disabled={processing}
                    />
                    <InputError message={errors.name} />
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
                    <Link href='/admin/logs'>Cancelar</Link>
                </div>
            </form>
            </FormLayout>
        </ModuleLayout>
    );
}

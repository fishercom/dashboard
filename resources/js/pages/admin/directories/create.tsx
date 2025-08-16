import InputError from '@/components/input-error';
import ModuleLayout from '@/layouts/module/layout';
import FormLayout from '@/layouts/module/Form';
import { type BreadcrumbItem } from '@/types';
import { Link } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { ProfileForm } from '@/types';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createDirectory } from '@/services/directories';

export default function Create() {

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard / Directorios / Crear',
            href: '/admin/directories/index',
        },
    ];

    const item: ProfileForm = {
        id: 0,
        name: '',
        active: false,
    }
    const [data, setData] = useState<Required<ProfileForm>>(item);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [processing, setProcessing] = useState(false);

    const createDirectoryHandler: FormEventHandler = (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        createDirectory(data, {
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
        <ModuleLayout breadcrumbs={breadcrumbs} title="Crear Directorio" description="Administrar los directorios del sistema">
            <FormLayout>
            <form onSubmit={createDirectoryHandler} className="space-y-6">
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
                    <Link href='/admin/directories'>Cancelar</Link>
                </div>
            </form>
            </FormLayout>
        </ModuleLayout>
    );
}

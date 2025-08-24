import InputError from '@/components/input-error';
import ModuleLayout from '@/layouts/module/layout';
import FormLayout from '@/layouts/module/Form';
import { Link, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Site, SiteForm } from '@/types';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { updateSite } from '@/services/sites';

export default function Create() {

    const { item } = usePage<{ item: Site }>().props;
    const [data, setData] = useState<Required<SiteForm>>(item);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [processing, setProcessing] = useState(false);

    const updateSiteHandler: FormEventHandler = (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        updateSite(data.id, data, {
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
            <form onSubmit={updateSiteHandler} className="space-y-6">
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
                    <Label htmlFor="segment">Segment</Label>
                    <Input
                        id="segment"
                        type="text"
                        required
                        autoFocus
                        autoComplete="segment"
                        value={data.segment}
                        onChange={(e) => setData({ ...data, segment: e.target.value })}
                        disabled={processing}
                    />
                    <InputError message={errors.segment} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="site_url">Site URL</Label>
                    <Input
                        id="site_url"
                        type="text"
                        required
                        autoFocus
                        autoComplete="site_url"
                        value={data.site_url}
                        onChange={(e) => setData({ ...data, site_url: e.target.value })}
                        disabled={processing}
                    />
                    <InputError message={errors.site_url} />
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
                    <Link href='/admin/sites'>Cancelar</Link>
                </div>
            </form>
            </FormLayout>
        </ModuleLayout>
    );
}

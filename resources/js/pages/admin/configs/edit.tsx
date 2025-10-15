import ModuleLayout from '@/layouts/module/layout';
import FormLayout from '@/layouts/module/Form';
import { Link, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

import { Button } from '@/components/ui/button';
import { updateConfig } from '@/services/configs';
import ConfigFormFields from './partials/fields';
import { CmsConfig, CmsConfigForm } from '@/types/models/cms-config';

export default function Edit() {

    const { item } = usePage<{ item: CmsConfig }>().props;
    const [data, setData] = useState<CmsConfigForm>({
        id: item.id,
        name: item.name,
        type: item.type,
        alias: item.alias,
        value: item.value || '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [processing, setProcessing] = useState(false);

    const updateConfigHandler: FormEventHandler = (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        updateConfig(data.id!, data, {
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
            <form onSubmit={updateConfigHandler} className="space-y-6">
                <ConfigFormFields
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                />

                <div className="flex items-center gap-4">
                    <Button disabled={processing}>Guardar</Button>
                    <Link href='/admin/configs'>Cancelar</Link>
                </div>
            </form>
            </FormLayout>
        </ModuleLayout>
    );
}

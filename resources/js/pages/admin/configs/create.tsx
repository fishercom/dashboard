import ModuleLayout from '@/layouts/module/layout';
import FormLayout from '@/layouts/module/Form';
import { Link } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

import { Button } from '@/components/ui/button';
import { createConfig } from '@/services/configs';
import ConfigFormFields from './partials/fields';
import { CmsConfigForm } from '@/types/models/cms-config';

export default function Create() {

    const item: CmsConfigForm = {
        name: '',
        type: 'string',
        alias: '',
        value: '',
    }
    const [data, setData] = useState<CmsConfigForm>(item);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [processing, setProcessing] = useState(false);

    const createConfigHandler: FormEventHandler = (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        createConfig(data, {
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
            <form onSubmit={createConfigHandler} className="space-y-6">
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

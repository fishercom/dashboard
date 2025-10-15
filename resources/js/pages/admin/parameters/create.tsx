import ModuleLayout from '@/layouts/module/layout';
import FormLayout from '@/layouts/module/Form';
import { Link, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

import { Button } from '@/components/ui/button';
import { createParameter } from '@/services/parameters';
import ParameterFormFields from './partials/fields';
import { CmsParameterForm, CmsParameter } from '@/types/models/cms-parameter';
import { CmsParameterGroup } from '@/types/models/cms-parameter-group';

export default function Create() {
    const { groups, parents } = usePage<{ groups: CmsParameterGroup[], parents: CmsParameter[] }>().props;

    const item: CmsParameterForm = {
        group_id: groups[0]?.id || 0,
        parent_id: undefined,
        name: '',
        value: '',
        metadata: {},
        active: false,
    }
    const [data, setData] = useState<CmsParameterForm>(item);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [processing, setProcessing] = useState(false);

    const createParameterHandler: FormEventHandler = (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        createParameter(data, {
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
            <form onSubmit={createParameterHandler} className="space-y-6">
                <ParameterFormFields
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    groups={groups}
                    parents={parents}
                />

                <div className="flex items-center gap-4">
                    <Button disabled={processing}>Guardar</Button>
                    <Link href='/admin/parameters'>Cancelar</Link>
                </div>
            </form>
            </FormLayout>
        </ModuleLayout>
    );
}

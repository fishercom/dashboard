import ModuleLayout from '@/layouts/module/layout';
import FormLayout from '@/layouts/module/Form';
import { Link, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

import { Button } from '@/components/ui/button';
import { updateParameter } from '@/services/parameters';
import ParameterFormFields from './partials/fields';
import { CmsParameter, CmsParameterForm } from '@/types/models/cms-parameter';
import { CmsParameterGroup } from '@/types/models/cms-parameter-group';

export default function Edit() {
    const { item, groups, parents } = usePage<{ item: CmsParameter, groups: CmsParameterGroup[], parents: CmsParameter[] }>().props;

    const [data, setData] = useState<CmsParameterForm>({
        id: item.id,
        group_id: item.group_id,
        parent_id: item.parent_id,
        name: item.name,
        value: item.value || '',
        metadata: item.metadata || {},
        active: Boolean(item.active),
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [processing, setProcessing] = useState(false);

    const updateParameterHandler: FormEventHandler = (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        updateParameter(data.id, data, {
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
            <form onSubmit={updateParameterHandler} className="space-y-6">
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

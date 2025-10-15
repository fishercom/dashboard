import ModuleLayout from '@/layouts/module/layout';
import FormLayout from '@/layouts/module/Form';
import SchemaFields from './partials/fields';
import { Link, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { Button } from '@/components/ui/button';
import { createSchema } from '@/services/schemas';
import { CmsSchemaForm, CmsSchema } from '@/types/models/cms-schema';
import { CmsSchemaGroup } from '@/types/models/cms-schema-group';

export default function Create() {
    const { groups, parents } = usePage<{ groups: CmsSchemaGroup[], parents: CmsSchema[] }>().props;

    const initial: CmsSchemaForm = {
        id: null,
        parent_id: undefined,
        group_id: groups[0]?.id || 0,
        name: '',
        fields: [],
        iterations: 1,
        type: 'PAGE',
        active: false,
    };
    const [data, setData] = useState<CmsSchemaForm>(initial);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [processing, setProcessing] = useState(false);

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        createSchema(data, {
            onSuccess: () => {
                setProcessing(false);
                setData(initial);
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
                <form onSubmit={handleSubmit} className="space-y-6">
                    <SchemaFields
                        data={data}
                        setData={setData}
                        errors={errors}
                        processing={processing}
                        groups={groups}
                        parents={parents}
                    />
                    <div className="flex items-center gap-4">
                        <Button disabled={processing}>Guardar</Button>
                        <Link href='/admin/schemas'>Cancelar</Link>
                    </div>
                </form>
            </FormLayout>
        </ModuleLayout>
    );
}

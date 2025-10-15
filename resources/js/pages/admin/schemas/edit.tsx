import ModuleLayout from '@/layouts/module/layout';
import FormLayout from '@/layouts/module/Form';
import SchemaFields from './partials/fields';
import { Link, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { Button } from '@/components/ui/button';
import { updateSchema } from '@/services/schemas';
import { CmsSchemaForm, CmsSchema } from '@/types/models/cms-schema';
import { CmsSchemaGroup } from '@/types/models/cms-schema-group';

export default function Edit() {
    const { item, groups, parents } = usePage<{ item: CmsSchema, groups: CmsSchemaGroup[], parents: CmsSchema[] }>().props;

    const initial: CmsSchemaForm = {
        id: item.id,
        parent_id: item.parent_id,
        group_id: item.group_id,
        name: item.name,
        fields: item.fields,
        iterations: item.iterations || 1,
        type: item.type || 'PAGE',
        active: Boolean(item.active),
    };
    const [data, setData] = useState<CmsSchemaForm>(initial);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [processing, setProcessing] = useState(false);

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        updateSchema(data.id!, data, {
            onSuccess: () => setProcessing(false),
            onError: (err: Record<string, string>) => {
                setErrors(err);
                setProcessing(false);
            },
        });
    };

    return (
        <ModuleLayout view="Editar">
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

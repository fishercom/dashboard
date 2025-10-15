import ModuleLayout from '@/layouts/module/layout';
import FormLayout from '@/layouts/module/Form';
import { Link, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

import { Button } from '@/components/ui/button';
import { updateSite } from '@/services/sites';
import SiteFormFields from './partials/fields';
import { CmsSite, CmsSiteForm } from '@/types/models/cms-site';
import { CmsSchemaGroup } from '@/types/models/cms-schema-group';

export default function Edit() {
    const { item, schemaGroups } = usePage<{ item: CmsSite, schemaGroups: CmsSchemaGroup[] }>().props;

    const [data, setData] = useState<CmsSiteForm>({
        id: item.id,
        name: item.name,
        segment: item.segment || '',
        site_url: item.site_url,
        schema_group_id: item.schema_group_id,
        metadata: item.metadata || {},
        default: Boolean(item.default),
        active: Boolean(item.active),
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [processing, setProcessing] = useState(false);

    const updateSiteHandler: FormEventHandler = (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        updateSite(data.id!, data, {
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
                <SiteFormFields
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    schemaGroups={schemaGroups}
                />

                <div className="flex items-center gap-4">
                    <Button disabled={processing}>Guardar</Button>
                    <Link href='/admin/sites'>Cancelar</Link>
                </div>
            </form>
            </FormLayout>
        </ModuleLayout>
    );
}

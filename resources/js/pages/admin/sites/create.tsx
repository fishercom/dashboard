
import ModuleLayout from '@/layouts/module/layout';
import FormLayout from '@/layouts/module/Form';
import { Link, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

import { Button } from '@/components/ui/button';
import { createSite } from '@/services/sites';
import SiteFormFields from './partials/fields';
import { CmsSiteForm } from '@/types/models/cms-site';
import { CmsSchemaGroup } from '@/types/models/cms-schema-group';

export default function Create() {
    const { schemaGroups } = usePage<{ schemaGroups: CmsSchemaGroup[] }>().props;

    const item: CmsSiteForm = {
        name: '',
        segment: '',
        site_url: '',
        schema_group_id: schemaGroups[0]?.id || 0,
        metadata: {},
        default: false,
        active: false,
    }
    const [data, setData] = useState<CmsSiteForm>(item);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [processing, setProcessing] = useState(false);

    const createSiteHandler: FormEventHandler = (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        createSite(data, {
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
            <form onSubmit={createSiteHandler} className="space-y-6">
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


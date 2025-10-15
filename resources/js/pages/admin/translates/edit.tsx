import ModuleLayout from '@/layouts/module/layout';
import FormLayout from '@/layouts/module/Form';
import { Link, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

import { Button } from '@/components/ui/button';
import { updateTranslate } from '@/services/translates';
import TranslateFormFields from './partials/fields';
import { CmsTranslate, CmsTranslateForm } from '@/types/models/cms-translate';

export default function Edit() {

    const { item } = usePage<{ item: CmsTranslate }>().props;
    const [data, setData] = useState<CmsTranslateForm>({
        id: item.id,
        alias: item.alias,
        input_type: item.input_type,
        metadata: item.metadata || {},
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [processing, setProcessing] = useState(false);

    const updateTranslateHandler: FormEventHandler = (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        updateTranslate(data.id, data, {
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
            <form onSubmit={updateTranslateHandler} className="space-y-6">
                <TranslateFormFields
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                />

                <div className="flex items-center gap-4">
                    <Button disabled={processing}>Guardar</Button>
                    <Link href='/admin/translates'>Cancelar</Link>
                </div>
            </form>
            </FormLayout>
        </ModuleLayout>
    );
}

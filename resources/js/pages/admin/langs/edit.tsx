import ModuleLayout from '@/layouts/module/layout';
import FormLayout from '@/layouts/module/Form';
import { Link, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

import { Button } from '@/components/ui/button';
import { updateLang } from '@/services/langs';
import LangFormFields from './partials/fields';
import { CmsLang, CmsLangForm } from '@/types/models/cms-lang';

export default function Edit() {

    const { item } = usePage<{ item: CmsLang }>().props;
    const [data, setData] = useState<CmsLangForm>({
        id: item.id,
        name: item.name,
        iso: item.iso || '',
        active: Boolean(item.active),
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [processing, setProcessing] = useState(false);

    const updateLangHandler: FormEventHandler = (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        updateLang(data.id!, data, {
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
            <form onSubmit={updateLangHandler} className="space-y-6">
                <LangFormFields
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                />

                <div className="flex items-center gap-4">
                    <Button disabled={processing}>Guardar</Button>
                    <Link href='/admin/langs'>Cancelar</Link>
                </div>
            </form>
            </FormLayout>
        </ModuleLayout>
    );
}

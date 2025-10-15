import ModuleLayout from '@/layouts/module/layout';
import FormLayout from '@/layouts/module/Form';
import { Link, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

import { Button } from '@/components/ui/button';
import { updateDirectory } from '@/services/directories';
import DirectoryFormFields from './partials/fields';
import { CmsDirectory, CmsDirectoryForm } from '@/types/models/cms-directory';
import { CmsFileType } from '@/types/models/cms-filetype';

export default function Edit() {
    const { item, fileTypes } = usePage<{ item: CmsDirectory, fileTypes: CmsFileType[] }>().props;
    const [data, setData] = useState<CmsDirectoryForm>({
        name: item.name,
        type_id: item.type_id,
        alias: item.alias,
        path: item.path,
        active: Boolean(item.active),
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [processing, setProcessing] = useState(false);

    const updateDirectoryHandler: FormEventHandler = (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        updateDirectory(item.id!, data, {
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
            <form onSubmit={updateDirectoryHandler} className="space-y-6">
                <DirectoryFormFields
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    fileTypes={fileTypes}
                />

                <div className="flex items-center gap-4">
                    <Button disabled={processing}>Guardar</Button>
                    <Link href='/admin/directories'>Cancelar</Link>
                </div>
            </form>
            </FormLayout>
        </ModuleLayout>
    );
}

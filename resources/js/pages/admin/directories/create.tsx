import ModuleLayout from '@/layouts/module/layout';
import FormLayout from '@/layouts/module/Form';
import { Link, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

import { Button } from '@/components/ui/button';
import { createDirectory } from '@/services/directories';
import DirectoryFormFields from './partials/fields';
import { CmsDirectoryForm } from '@/types/models/cms-directory';
import { CmsFileType } from '@/types/models/cms-filetype';

export default function Create() {
    const { fileTypes } = usePage<{ fileTypes: CmsFileType[] }>().props;

    const item: CmsDirectoryForm = {
        name: '',
        type_id: fileTypes[0]?.id || 0,
        alias: '',
        path: '',
        active: false,
    }
    const [data, setData] = useState<CmsDirectoryForm>(item);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [processing, setProcessing] = useState(false);

    const createDirectoryHandler: FormEventHandler = (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        createDirectory(data, {
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
            <form onSubmit={createDirectoryHandler} className="space-y-6">
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

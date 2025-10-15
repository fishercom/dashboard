import ModuleLayout from '@/layouts/module/layout';
import FormLayout from '@/layouts/module/Form';
import { Link } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { ProfileForm } from '@/types';

import { Button } from '@/components/ui/button';
import { createProfile } from '@/services/profiles';


import ProfileFormFields from '@/pages/admin/profiles/partials/fields';
import { usePage } from '@inertiajs/react';
import { AdmModule } from '@/types/models/adm-module';

export default function Create() {
    const { modules } = usePage<{ modules: AdmModule[] }>().props;

    const item: ProfileForm = {
        id: 0,
        name: '',
        active: false,
        permissions: [],
    }
    const [data, setData] = useState<Required<ProfileForm>>(item);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [processing, setProcessing] = useState(false);

    const createProfileHandler: FormEventHandler = (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        createProfile(data, {
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
            <form onSubmit={createProfileHandler} className="space-y-6">
                <ProfileFormFields
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    modules={modules}
                />

                <div className="flex items-center gap-4">
                    <Button disabled={processing}>Guardar</Button>
                    <Link href='/admin/profiles'>Cancelar</Link>
                </div>
            </form>
            </FormLayout>
        </ModuleLayout>
    );
}

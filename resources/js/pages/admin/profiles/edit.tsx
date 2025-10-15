import ModuleLayout from '@/layouts/module/layout';
import FormLayout from '@/layouts/module/Form';
import { Link, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { Profile, ProfileForm } from '@/types';
import { updateProfile } from '@/services/profiles';
import { Button } from '@/components/ui/button';
import ProfileFormFields from './partials/fields_';
import { AdmModule } from '@/types/models/adm-module';

export default function Edit() {

    const { item, modules } = usePage<{ item: Profile, modules: AdmModule[] }>().props;
    const [data, setData] = useState<Required<ProfileForm>>({
        id: item.id,
        name: item.name,
        active: item.active ?? false,
        permissions: item.permissions ?? [],
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [processing, setProcessing] = useState(false);

    const updateProfileHandler: FormEventHandler = (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        updateProfile(data.id!, data, {
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
            <form onSubmit={updateProfileHandler} className="space-y-6">
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

import InputError from '@/components/input-error';
import ModuleLayout from '@/layouts/module/layout';
import FormLayout from '@/layouts/module/Form';
import { type BreadcrumbItem } from '@/types';
import { generateBreadcrumb } from '@/lib/breadcrumbs';
import { Link } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { LangForm } from '@/types';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Create() {

    const breadcrumbs: BreadcrumbItem[] = generateBreadcrumb('Idiomas', 'Crear', route('langs.index'));

    const item: LangForm = {
        id: 0,
        name: '',
        iso: '',
        active: false,
    }
    const [data, setData] = useState<Required<LangForm>>(item);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [processing, setProcessing] = useState(false);

    const createLangHandler: FormEventHandler = (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        createLang(data, {
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
        <ModuleLayout breadcrumbs={breadcrumbs} title="Crear Idioma" description="Administrar los idiomas del sistema">
            <FormLayout>
            <form onSubmit={createLangHandler} className="space-y-6">
                <div className="grid gap-2">
                    <Label htmlFor="name">Nombre</Label>
                    <Input
                        id="name"
                        type="text"
                        required
                        autoFocus
                        autoComplete="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        disabled={processing}
                    />
                    <InputError message={errors.name} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="iso">ISO</Label>
                    <Input
                        id="iso"
                        type="text"
                        required
                        autoComplete="iso"
                        value={data.iso}
                        onChange={(e) => setData('iso', e.target.value)}
                        disabled={processing}
                    />
                    <InputError message={errors.name} />
                </div>

                <div className="flex items-center space-x-3">
                    <Checkbox
                        id="active"
                        name="active"
                        checked={data.active}
                        onClick={() => setData('active', !data.active)}
                        tabIndex={3}
                    />
                    <Label htmlFor="active">Activo</Label>
                </div>

                <div className="flex items-center gap-4">
                    <Button disabled={processing}>Guardar</Button>
                    <Link href='/admin/langs'>Cancelar</Link>
                </div>
            </form>
            </FormLayout>
        </ModuleLayout>
    );
}


import InputError from '@/components/input-error';
import ModuleLayout from '@/layouts/module/layout';
import FormLayout from '@/layouts/module/Form';
import { Link } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { TranslateForm } from '@/types';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createTranslate } from '@/services/translates';

export default function Create() {

    const item: TranslateForm = {
        id: 0,
        alias: '',
        input_type: 0,
        metadata: [{ iso: 'EN', value: '' }],
    }
    const [data, setData] = useState<Required<TranslateForm>>(item);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [processing, setProcessing] = useState(false);

    const createTranslateHandler: FormEventHandler = (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        createTranslate(data, {
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
            <form onSubmit={createTranslateHandler} className="space-y-6">
                <div className="grid gap-2">
                    <Label htmlFor="alias">Alias</Label>
                    <Input
                        id="alias"
                        type="text"
                        required
                        autoFocus
                        tabIndex={1}
                        autoComplete="alias"
                        value={data.alias}
                        onChange={(e) => setData({ ...data, alias: e.target.value })}
                        disabled={processing}
                    />
                    <InputError message={errors.alias} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="metadata">Traducción</Label>
                    <Input
                        id="metadata"
                        type="text"
                        required
                        autoFocus
                        autoComplete="metadata"
                        value={data.metadata[0]?.value || ''}
                        onChange={(e) => setData({ ...data, metadata: [{iso: '', value: e.target.value}] })}
                        disabled={processing}
                    />
                    <InputError message={errors.name} />
                </div>

                <div className="flex items-center gap-4">
                    <Button disabled={processing}>Guardar</Button>
                    <Link href='/admin/translates'>Cancelar</Link>
                </div>
            </form>
            </FormLayout>
        </ModuleLayout>
    );
}


import ModuleLayout from '@/layouts/module/layout';
import FormLayout from '@/layouts/module/Form';
import { Link, usePage } from '@inertiajs/react';
import { Register, RegisterForm } from '@/types';

import { Label } from '@/components/ui/label';
import { useState } from 'react';

export default function Create() {

    const { item } = usePage<{ item: Register }>().props;
    const [data] = useState<Required<RegisterForm>>(item);

    return (
        <ModuleLayout view="Visualizar Mensaje">
            <FormLayout>
            <form className="space-y-6">
                <div className="grid gap-2">
                    <Label htmlFor="name">Nombre</Label>
                    {data.name}
                </div>

                <div className="flex items-center gap-4">
                    <Link href='/admin/registers'>Cancelar</Link>
                </div>
            </form>
            </FormLayout>
        </ModuleLayout>
    );
}

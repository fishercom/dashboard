
import { router } from '@inertiajs/react';
import { Page } from '@inertiajs/core';

interface Callbacks {
    onSuccess?: (page: Page) => void;
    onError?: (errors: Record<string, string>) => void;
    onBefore?: () => boolean;
    onFinish?: () => void;
}

export const getRegisters = (query: Record<string, unknown>) => {
    router.get(route('registers.index'), query, {
        preserveState: true,
        replace: true,
    });
};

export const deleteRegister = (id: number) => {
    router.delete(route('registers.destroy', id), {
        preserveScroll: true,
        onBefore: () => {
            return window.confirm('Esta seguro que desea eliminar este registro?');
        },
        onError: () => {
            alert('Ocurrió un error al eliminar el registro.');
        },
    });
};

export const updateRegister = (id: number, data: Record<string, unknown>, callbacks: Callbacks) => {
    router.put(route('registers.update', id), data, callbacks);
};

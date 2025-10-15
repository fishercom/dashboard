
import { router } from '@inertiajs/react';
import { Page } from '@inertiajs/core';

interface Callbacks {
    onSuccess?: (page: Page) => void;
    onError?: (errors: Record<string, string>) => void;
    onBefore?: () => boolean;
    onFinish?: () => void;
}

export const getParameters = (query: Record<string, unknown>) => {
    router.get(route('parameters.index'), query, {
        preserveState: true,
        replace: true,
    });
};

export const deleteParameter = (id: number) => {
    router.delete(route('parameters.destroy', id), {
        preserveScroll: true,
        onBefore: () => {
            return window.confirm('Esta seguro que desea eliminar este registro?');
        },
        onError: () => {
            alert('Ocurrió un error al eliminar el registro.');
        },
    });
};

export const createParameter = (data: Record<string, unknown>, callbacks: Callbacks) => {
    router.post(route('parameters.store'), data, callbacks);
};

export const updateParameter = (id: number, data: Record<string, unknown>, callbacks: Callbacks) => {
    router.put(route('parameters.update', id), data, callbacks);
};

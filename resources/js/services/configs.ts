
import { router } from '@inertiajs/react';
import { Page } from '@inertiajs/core';

interface Callbacks {
    onSuccess?: (page: Page) => void;
    onError?: (errors: Record<string, string>) => void;
    onBefore?: () => boolean;
    onFinish?: () => void;
}

export const getConfigs = (query: Record<string, unknown>) => {
    router.get(route('configs.index'), query, {
        preserveState: true,
        replace: true,
    });
};

export const deleteConfig = (id: number) => {
    router.delete(route('configs.destroy', id), {
        preserveScroll: true,
        onBefore: () => {
            return window.confirm('Esta seguro que desea eliminar este registro?');
        },
        onError: () => {
            alert('Ocurrió un error al eliminar el registro.');
        },
    });
};

export const createConfig = (data: Record<string, unknown>, callbacks: Callbacks) => {
    router.post(route('configs.store'), data, callbacks);
};

export const updateConfig = (id: number, data: Record<string, unknown>, callbacks: Callbacks) => {
    router.put(route('configs.update', id), data, callbacks);
};

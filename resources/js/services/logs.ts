
import { router } from '@inertiajs/react';
import { Page } from '@inertiajs/core';

interface Callbacks {
    onSuccess?: (page: Page) => void;
    onError?: (errors: Record<string, string>) => void;
    onBefore?: () => boolean;
    onFinish?: () => void;
}

export const getLogs = (query: Record<string, unknown>) => {
    router.get(route('logs.index'), query, {
        preserveState: true,
        replace: true,
    });
};

export const deleteLog = (id: number) => {
    router.delete(route('logs.destroy', id), {
        preserveScroll: true,
        onBefore: () => {
            return window.confirm('Esta seguro que desea eliminar este registro?');
        },
        onError: () => {
            alert('Ocurrió un error al eliminar el registro.');
        },
    });
};

export const createLog = (data: Record<string, unknown>, callbacks: Callbacks) => {
    router.post(route('logs.store'), data, callbacks);
};

export const updateLog = (id: number, data: Record<string, unknown>, callbacks: Callbacks) => {
    router.put(route('logs.update', id), data, callbacks);
};

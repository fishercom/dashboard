
import { router } from '@inertiajs/react';
import { Page } from '@inertiajs/core';

interface Callbacks {
    onSuccess?: (page: Page) => void;
    onError?: (errors: Record<string, string>) => void;
    onBefore?: () => boolean;
    onFinish?: () => void;
}

export const getNotifies = (query: Record<string, unknown>) => {
    router.get(route('notifies.index'), query, {
        preserveState: true,
        replace: true,
    });
};

export const deleteNotify = (id: number) => {
    router.delete(route('notifies.destroy', id), {
        preserveScroll: true,
        onBefore: () => {
            return window.confirm('Esta seguro que desea eliminar este registro?');
        },
        onError: () => {
            alert('Ocurrió un error al eliminar el registro.');
        },
    });
};

export const createNotify = (data: Record<string, unknown>, callbacks: Callbacks) => {
    router.post(route('notifies.store'), data, callbacks);
};

export const updateNotify = (id: number, data: Record<string, unknown>, callbacks: Callbacks) => {
    router.put(route('notifies.update', id), data, callbacks);
};

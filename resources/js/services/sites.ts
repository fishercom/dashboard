
import { router } from '@inertiajs/react';
import { Page } from '@inertiajs/core';

interface Callbacks {
    onSuccess?: (page: Page) => void;
    onError?: (errors: Record<string, string>) => void;
    onBefore?: () => boolean;
    onFinish?: () => void;
}

export const getSites = (query: Record<string, unknown>) => {
    router.get(route('sites.index'), query, {
        preserveState: true,
        replace: true,
    });
};

export const deleteSite = (id: number) => {
    router.delete(route('sites.destroy', id), {
        preserveScroll: true,
        onBefore: () => {
            return window.confirm('Esta seguro que desea eliminar este registro?');
        },
        onError: () => {
            alert('Ocurrió un error al eliminar el registro.');
        },
    });
};

export const createSite = (data: Record<string, unknown>, callbacks: Callbacks) => {
    router.post(route('sites.store'), data, callbacks);
};

export const updateSite = (id: number, data: Record<string, unknown>, callbacks: Callbacks) => {
    router.put(route('sites.update', id), data, callbacks);
};

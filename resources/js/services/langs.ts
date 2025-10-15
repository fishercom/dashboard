
import { router } from '@inertiajs/react';
import { Page } from '@inertiajs/core';

interface Callbacks {
    onSuccess?: (page: Page) => void;
    onError?: (errors: Record<string, string>) => void;
    onBefore?: () => boolean;
    onFinish?: () => void;
}

export const getLangs = (query: Record<string, unknown>) => {
    router.get(route('langs.index'), query, {
        preserveState: true,
        replace: true,
    });
};

export const deleteLang = (id: number) => {
    router.delete(route('langs.destroy', id), {
        preserveScroll: true,
        onBefore: () => {
            return window.confirm('Esta seguro que desea eliminar este registro?');
        },
        onError: () => {
            alert('Ocurrió un error al eliminar el registro.');
        },
    });
};

export const createLang = (data: Record<string, unknown>, callbacks: Callbacks) => {
    router.post(route('langs.store'), data, callbacks);
};

export const updateLang = (id: number, data: Record<string, unknown>, callbacks: Callbacks) => {
    router.put(route('langs.update', id), data, callbacks);
};

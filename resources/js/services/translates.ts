
import { router } from '@inertiajs/react';
import { Page } from '@inertiajs/core';

interface Callbacks {
    onSuccess?: (page: Page) => void;
    onError?: (errors: Record<string, string>) => void;
    onBefore?: () => boolean;
    onFinish?: () => void;
}

export const getTranslates = (query: Record<string, unknown>) => {
    router.get(route('translates.index'), query, {
        preserveState: true,
        replace: true,
    });
};

export const deleteTranslate = (id: number) => {
    router.delete(route('translates.destroy', id), {
        preserveScroll: true,
        onBefore: () => {
            return window.confirm('Esta seguro que desea eliminar este registro?');
        },
        onError: () => {
            alert('Ocurrió un error al eliminar el registro.');
        },
    });
};

export const createTranslate = (data: Record<string, unknown>, callbacks: Callbacks) => {
    router.post(route('translates.store'), data, callbacks);
};

export const updateTranslate = (id: number, data: Record<string, unknown>, callbacks: Callbacks) => {
    router.put(route('translates.update', id), data, callbacks);
};

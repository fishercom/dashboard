
import { router } from '@inertiajs/react';
import { Page } from '@inertiajs/core';

interface Callbacks {
    onSuccess?: (page: Page) => void;
    onError?: (errors: Record<string, string>) => void;
    onBefore?: () => boolean;
    onFinish?: () => void;
}

export const getArticles = (query: Record<string, unknown>) => {
    router.get(route('articles.index'), query, {
        preserveState: true,
        replace: true,
    });
};

export const deleteArticle = (id: number) => {
    router.delete(route('articles.destroy', id), {
        preserveScroll: true,
        onBefore: () => {
            return window.confirm('Esta seguro que desea eliminar este registro?');
        },
        onError: () => {
            alert('Ocurrió un error al eliminar el registro.');
        },
    });
};

export const createArticle = (data: Record<string, unknown>, callbacks: Callbacks) => {
    router.post(route('articles.store'), data, callbacks);
};

export const updateArticle = (id: number, data: Record<string, unknown>, callbacks: Callbacks) => {
    router.put(route('articles.update', id), data, callbacks);
};

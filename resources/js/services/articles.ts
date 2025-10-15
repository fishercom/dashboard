
import { router } from '@inertiajs/react';

export const getArticles = (query: Record<string, any>) => {
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

export const createArticle = (data: Record<string, any>, callbacks: object) => {
    router.post(route('articles.store'), data, callbacks);
};

export const updateArticle = (id: number, data: Record<string, any>, callbacks: object) => {
    router.put(route('articles.update', id), data, callbacks);
};

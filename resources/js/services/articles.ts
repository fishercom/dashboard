
import { router } from '@inertiajs/react';

export const getArticles = (query: object) => {
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

export const createArticle = (data: object, callbacks: object) => {
    router.post(route('articles.store'), data, callbacks);
};

export const updateArticle = (id: number, data: object, callbacks: object) => {
    router.put(route('articles.update', id), data, callbacks);
};

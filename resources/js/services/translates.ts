
import { router } from '@inertiajs/react';

export const getTranslates = (query: object) => {
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

export const createTranslate = (data: object, callbacks: object) => {
    router.post(route('translates.store'), data, callbacks);
};

export const updateTranslate = (id: number, data: object, callbacks: object) => {
    router.put(route('translates.update', id), data, callbacks);
};


import { router } from '@inertiajs/react';

export const getLangs = (query: object) => {
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

export const createLang = (data: object, callbacks: object) => {
    router.post(route('langs.store'), data, callbacks);
};

export const updateLang = (id: number, data: object, callbacks: object) => {
    router.put(route('langs.update', id), data, callbacks);
};

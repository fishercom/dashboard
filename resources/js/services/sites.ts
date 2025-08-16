
import { router } from '@inertiajs/react';

export const getSites = (query: object) => {
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

export const createSite = (data: object, callbacks: object) => {
    router.post(route('sites.store'), data, callbacks);
};

export const updateSite = (id: number, data: object, callbacks: object) => {
    router.put(route('sites.update', id), data, callbacks);
};

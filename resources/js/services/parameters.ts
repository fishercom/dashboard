
import { router } from '@inertiajs/react';

export const getParameters = (query: object) => {
    router.get(route('parameters.index'), query, {
        preserveState: true,
        replace: true,
    });
};

export const deleteParameter = (id: number) => {
    router.delete(route('parameters.destroy', id), {
        preserveScroll: true,
        onBefore: () => {
            return window.confirm('Esta seguro que desea eliminar este registro?');
        },
        onError: () => {
            alert('Ocurrió un error al eliminar el registro.');
        },
    });
};

export const createParameter = (data: object, callbacks: object) => {
    router.post(route('parameters.store'), data, callbacks);
};

export const updateParameter = (id: number, data: object, callbacks: object) => {
    router.put(route('parameters.update', id), data, callbacks);
};

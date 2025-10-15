
import { router } from '@inertiajs/react';

export const getParameters = (query: Record<string, any>) => {
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

export const createParameter = (data: Record<string, any>, callbacks: object) => {
    router.post(route('parameters.store'), data, callbacks);
};

export const updateParameter = (id: number, data: Record<string, any>, callbacks: object) => {
    router.put(route('parameters.update', id), data, callbacks);
};

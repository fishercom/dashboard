
import { router } from '@inertiajs/react';

export const getLogs = (query: object) => {
    router.get(route('logs.index'), query, {
        preserveState: true,
        replace: true,
    });
};

export const deleteLog = (id: number) => {
    router.delete(route('logs.destroy', id), {
        preserveScroll: true,
        onBefore: () => {
            return window.confirm('Esta seguro que desea eliminar este registro?');
        },
        onError: () => {
            alert('Ocurrió un error al eliminar el registro.');
        },
    });
};

export const createLog = (data: object, callbacks: object) => {
    router.post(route('logs.store'), data, callbacks);
};

export const updateLog = (id: number, data: object, callbacks: object) => {
    router.put(route('logs.update', id), data, callbacks);
};

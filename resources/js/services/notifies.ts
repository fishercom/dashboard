
import { router } from '@inertiajs/react';

export const getNotifies = (query: Record<string, any>) => {
    router.get(route('notifies.index'), query, {
        preserveState: true,
        replace: true,
    });
};

export const deleteNotify = (id: number) => {
    router.delete(route('notifies.destroy', id), {
        preserveScroll: true,
        onBefore: () => {
            return window.confirm('Esta seguro que desea eliminar este registro?');
        },
        onError: () => {
            alert('Ocurrió un error al eliminar el registro.');
        },
    });
};

export const createNotify = (data: Record<string, any>, callbacks: object) => {
    router.post(route('notifies.store'), data, callbacks);
};

export const updateNotify = (id: number, data: Record<string, any>, callbacks: object) => {
    router.put(route('notifies.update', id), data, callbacks);
};

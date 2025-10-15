
import { router } from '@inertiajs/react';

export const getDirectories = (query: Record<string, any>) => {
    router.get(route('directories.index'), query, {
        preserveState: true,
        replace: true,
    });
};

export const deleteDirectory = (id: number) => {
    router.delete(route('directories.destroy', id), {
        preserveScroll: true,
        onBefore: () => {
            return window.confirm('Esta seguro que desea eliminar este registro?');
        },
        onError: () => {
            alert('Ocurrió un error al eliminar el registro.');
        },
    });
};

export const createDirectory = (data: Record<string, any>, callbacks: object) => {
    router.post(route('directories.store'), data, callbacks);
};

export const updateDirectory = (id: number, data: Record<string, any>, callbacks: object) => {
    router.put(route('directories.update', id), data, callbacks);
};

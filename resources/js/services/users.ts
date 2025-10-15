
import { router } from '@inertiajs/react';

export const getUsers = (query: Record<string, any>) => {
    router.get(route('users.index'), query, {
        preserveState: true,
        replace: true,
    });
};

export const deleteUser = (id: number) => {
    router.delete(route('users.destroy', id), {
        preserveScroll: true,
        onBefore: () => {
            return window.confirm('Esta seguro que desea eliminar este registro?');
        },
        onError: () => {
            alert('Ocurrió un error al eliminar el registro.');
        },
    });
};

export const createUser = (data: Record<string, any>, callbacks: object) => {
    router.post(route('users.store'), data, callbacks);
};

export const updateUser = (id: number, data: Record<string, any>, callbacks: object) => {
    router.put(route('users.update', id), data, callbacks);
};


import { router } from '@inertiajs/react';
import { Page } from '@inertiajs/core';

interface Callbacks {
    onSuccess?: (page: Page) => void;
    onError?: (errors: Record<string, string>) => void;
    onBefore?: () => boolean;
    onFinish?: () => void;
}

export const getUsers = (query: Record<string, unknown>) => {
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

export const createUser = (data: Record<string, unknown>, callbacks: Callbacks) => {
    router.post(route('users.store'), data, callbacks);
};

export const updateUser = (id: number, data: Record<string, unknown>, callbacks: Callbacks) => {
    router.put(route('users.update', id), data, callbacks);
};

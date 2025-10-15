
import { router } from '@inertiajs/react';
import { Page } from '@inertiajs/core';

interface Callbacks {
    onSuccess?: (page: Page) => void;
    onError?: (errors: Record<string, string>) => void;
    onBefore?: () => boolean;
    onFinish?: () => void;
}

export const getProfiles = (query: Record<string, unknown>) => {
    router.get(route('profiles.index'), query, {
        preserveState: true,
        replace: true,
    });
};

export const deleteProfile = (id: number) => {
    router.delete(route('profiles.destroy', id), {
        preserveScroll: true,
        onBefore: () => {
            return window.confirm('Esta seguro que desea eliminar este registro?');
        },
        onError: () => {
            alert('Ocurrió un error al eliminar el registro.');
        },
    });
};

export const createProfile = (data: Record<string, unknown>, callbacks: Callbacks) => {
    router.post(route('profiles.store'), data, callbacks);
};

export const updateProfile = (id: number, data: Record<string, unknown>, callbacks: Callbacks) => {
    router.put(route('profiles.update', id), data, callbacks);
};

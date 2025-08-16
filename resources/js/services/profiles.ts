
import { router } from '@inertiajs/react';

export const getProfiles = (query: object) => {
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

export const createProfile = (data: object, callbacks: object) => {
    router.post(route('profiles.store'), data, callbacks);
};

export const updateProfile = (id: number, data: object, callbacks: object) => {
    router.put(route('profiles.update', id), data, callbacks);
};

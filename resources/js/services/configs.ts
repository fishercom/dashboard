
import { router } from '@inertiajs/react';

export const getConfigs = (query: Record<string, any>) => {
    router.get(route('configs.index'), query, {
        preserveState: true,
        replace: true,
    });
};

export const deleteConfig = (id: number) => {
    router.delete(route('configs.destroy', id), {
        preserveScroll: true,
        onBefore: () => {
            return window.confirm('Esta seguro que desea eliminar este registro?');
        },
        onError: () => {
            alert('Ocurrió un error al eliminar el registro.');
        },
    });
};

export const createConfig = (data: Record<string, any>, callbacks: object) => {
    router.post(route('configs.store'), data, callbacks);
};

export const updateConfig = (id: number, data: Record<string, any>, callbacks: object) => {
    router.put(route('configs.update', id), data, callbacks);
};

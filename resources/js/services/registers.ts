
import { router } from '@inertiajs/react';

export const getRegisters = (query: object) => {
    router.get(route('registers.index'), query, {
        preserveState: true,
        replace: true,
    });
};

export const deleteRegister = (id: number) => {
    router.delete(route('registers.destroy', id), {
        preserveScroll: true,
        onBefore: () => {
            return window.confirm('Esta seguro que desea eliminar este registro?');
        },
        onError: () => {
            alert('Ocurrió un error al eliminar el registro.');
        },
    });
};

export const updateRegister = (id: number, data: object, callbacks: object) => {
    router.put(route('registers.update', id), data, callbacks);
};

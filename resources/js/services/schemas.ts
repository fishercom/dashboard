
import apiClient from './api';
import { router } from '@inertiajs/react';

export const getSchemas = (parentSchemaId: number | null = null) => {
    const endpoint = parentSchemaId
        ? route('schemas.children', parentSchemaId)
        : route('schemas.root');
    return apiClient.get(endpoint);
};

export const deleteSchema = (id: number) => {
    router.delete(route('schemas.destroy', id), {
        preserveScroll: true,
        onBefore: () => {
            return window.confirm('Esta seguro que desea eliminar este registro?');
        },
        onError: () => {
            alert('Ocurrió un error al eliminar el registro.');
        },
    });
};

export const createSchema = (data: Record<string, any>, callbacks: object) => {
    router.post(route('schemas.store'), data, callbacks);
};

export const updateSchema = (id: number, data: Record<string, any>, callbacks: object) => {
    router.put(route('schemas.update', id), data, callbacks);
};

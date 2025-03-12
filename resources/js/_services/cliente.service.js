import config from 'config'
import { authHeader, handleResponse } from '../_helpers';

export const clienteService = {
    getList,
    getItem,
    getPersona,
    getDetalleList,
    search,
    register,
    documentos,
}

function getList() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }

    return fetch(`${config.apiUrl}/cliente/list`, requestOptions).then(handleResponse)
}

function getItem(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }

    return fetch(`${config.apiUrl}/cliente/${id}`, requestOptions).then(handleResponse)
}

function getPersona(tipoDocumento, nroDocumento) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }

    return fetch(`${config.apiUrl}/cliente/persona?tipo_documento=${tipoDocumento}&nro_documento=${nroDocumento}`, requestOptions).then(handleResponse)
}

function getDetalleList() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }
    return fetch(`${config.apiUrl}/documento/list`, requestOptions).then(handleResponse)
}

function search(args) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }
    const params = new URLSearchParams(args).toString();
    //console.log(params)
    return fetch(`${config.apiUrl}/cliente/search?${params}`, requestOptions).then(handleResponse)
}

function register(args) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(args)
    }
    if(args.cliente_id)
        return fetch(`${config.apiUrl}/cliente/update`, requestOptions).then(handleResponse)
    else
        return fetch(`${config.apiUrl}/cliente/store`, requestOptions).then(handleResponse)
}

function documentos(args) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(args)
    }
    if(args.cliente_id)
        return fetch(`${config.apiUrl}/documento/update`, requestOptions).then(handleResponse)
    else
        return fetch(`${config.apiUrl}/documento/store`, requestOptions).then(handleResponse)
}

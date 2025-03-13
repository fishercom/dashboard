import { env, authHeader, handleResponse } from '../_helpers';

export const parameterService = {
    getList,
    getItem,
}

function getList() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }

    return fetch(`${env('API_URL')}/parameters`, requestOptions).then(handleResponse)
}

function getItem(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }

    return fetch(`${env('API_URL')}/parameter/${id}`, requestOptions).then(handleResponse)
}

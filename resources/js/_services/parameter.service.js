import { config, authHeader, handleResponse } from '../_helpers';

export const parameterService = {
    getList,
    getItem,
}

function getList() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }

    return fetch(`${config().apiUrl}/parameters`, requestOptions).then(handleResponse)
}

function getItem(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }

    return fetch(`${config().apiUrl}/parameter/${id}`, requestOptions).then(handleResponse)
}

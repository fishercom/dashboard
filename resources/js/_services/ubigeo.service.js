import { config, authHeader, handleResponse } from '../_helpers';

export const ubigeoService = {
    getDepartments,
    getProvinces,
    getDistricts,
}

function getDepartments() {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
    }
    return fetch(`${config.API_URL}/ubigeo/departments`, requestOptions).then(handleResponse)
}

function getProvinces(department_id) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({department_id: department_id})
    }

    return fetch(`${config.API_URL}/ubigeo/provinces`, requestOptions).then(handleResponse)
}

function getDistricts(province_id) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({province_id: province_id})
    }

    return fetch(`${config.API_URL}/ubigeo/districts`, requestOptions).then(handleResponse)
}

import config from 'config'
import { authHeader, handleResponse } from '../_helpers';

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
    return fetch(`${config.apiUrl}/ubigeo/departments`, requestOptions).then(handleResponse)
}

function getProvinces(department_id) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({department_id: department_id})
    }

    return fetch(`${config.apiUrl}/ubigeo/provinces`, requestOptions).then(handleResponse)
}

function getDistricts(province_id) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({province_id: province_id})
    }

    return fetch(`${config.apiUrl}/ubigeo/districts`, requestOptions).then(handleResponse)
}

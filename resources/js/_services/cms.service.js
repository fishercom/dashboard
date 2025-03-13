import { config, authHeader, handleResponse, langId } from '../_helpers';

export const cmsService = {
    getHome,
    getHeader,
    getFooter,
    getPages,
    getPage,
}

function getHome() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }

    return fetch(`${config().apiUrl}/article/home?lang_id=${langId()}`, requestOptions).then(handleResponse)
}

function getHeader() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }

    return fetch(`${config().apiUrl}/article/header?lang_id=${langId()}`, requestOptions).then(handleResponse)
}

function getFooter() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }

    return fetch(`${config().apiUrl}/article/footer?lang_id=${langId()}`, requestOptions).then(handleResponse)
}

function getPages() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }

    return fetch(`${config().apiUrl}/article/pages`, requestOptions).then(handleResponse)
}

function getPage(slug) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    }

    return fetch(`${config().apiUrl}/article/${slug}`, requestOptions).then(handleResponse)
}

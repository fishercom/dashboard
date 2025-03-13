import { env, handleResponse } from '../_helpers';

export const accountService = {
    login,
    autologin,
    forgot,
    resetPassword,
    logout,
    getAccount,
}

function clearStorage(){
    localStorage.clear();
    sessionStorage.clear();
}

function login(args) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(args)
    }

    return fetch(`${env('API_URL')}/login`, requestOptions)
        .then(handleResponse)
        .then(response => {
            return loginStorage(response)
        })
}

function forgot(args) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(args)
    }

    return fetch(`${env('API_URL')}/forgot`, requestOptions).then(handleResponse)
}

function resetPassword(args) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(args)
    }

    return fetch(`${env('API_URL')}/reset_password`, requestOptions).then(handleResponse)
}

function autologin(account){
    loginStorage(account)
    return account
}

function logout() {
    clearStorage()
    sessionStorage.removeItem('account')
}

function getAccount(){
    return sessionStorage.getItem('account')
}

function loginStorage(account){
    clearStorage()
    sessionStorage.setItem('account', JSON.stringify(account))
    return account
}

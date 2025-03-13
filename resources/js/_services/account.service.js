import { config, handleResponse } from '../_helpers';

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

    return fetch(`${config().apiUrl}/login`, requestOptions)
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

    return fetch(`${config().apiUrl}/forgot`, requestOptions).then(handleResponse)
}

function resetPassword(args) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(args)
    }

    return fetch(`${config().apiUrl}/reset_password`, requestOptions).then(handleResponse)
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

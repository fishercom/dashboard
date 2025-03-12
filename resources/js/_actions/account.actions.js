import { accountConstants } from '../_constants'
import { clienteConstants } from '../_constants'
import { accountService } from '../_services'
import { alertActions } from './'
import { history } from '../_helpers'

export const accountActions = {
    login,
    autologin,
    logout,
    forgot,
    resetPassword,
    getClientes,
}

function login(args, from) {
    return dispatch => {
        dispatch(request())
        dispatch(alertActions.clear())

        accountService.login(args)
            .then(
                response => {
                    dispatch(success(response))
                    history.push(from)
                },
                error => {
                    dispatch(failure(error.toString()))
                    dispatch(alertActions.error(error.toString()))
                }
            )
    }

    function request() { return { type: accountConstants.LOGIN_REQUEST } }
    function success(response) { return { type: accountConstants.LOGIN_SUCCESS, response } }
    function failure(error) { return { type: accountConstants.LOGIN_FAILURE, error } }
}

function autologin(response) {
    return dispatch => {
        accountService.autologin(response)
        dispatch(success(response))

    }

    function success(response) { return { type: accountConstants.LOGIN_SUCCESS, response } }
}

function logout() {
    accountService.logout()
    return { type: accountConstants.LOGOUT }
}

function forgot(args, from){
    return dispatch => {
        dispatch(request())
        dispatch(alertActions.clear())

        accountService.forgot(args)
            .then(
                response => {
                    dispatch(success(response))
                    history.push(from)
                },
                error => {
                    dispatch(failure(error.toString()))
                    dispatch(alertActions.error(error.toString()))
                }
            )
    }

    function request() { return { type: accountConstants.FORGOT_REQUEST } }
    function success(response) { return { type: accountConstants.FORGOT_SUCCESS, response } }
    function failure(error) { return { type: accountConstants.FORGOT_FAILURE, error } }
}

function resetPassword(args, from){
    return dispatch => {
        dispatch(request())
        dispatch(alertActions.clear())

        accountService.resetPassword(args)
            .then(
                response => {
                    dispatch(success(response))
                    history.push(from)
                },
                error => {
                    dispatch(failure(error.toString()))
                    dispatch(alertActions.error(error.toString()))
                }
            )
    }

    function request() { return { type: accountConstants.FORGOT_REQUEST } }
    function success(response) { return { type: accountConstants.FORGOT_SUCCESS, response } }
    function failure(error) { return { type: accountConstants.FORGOT_FAILURE, error } }
}

function getClientes() {
    return dispatch => {
        dispatch(request())

        const clientes = accountService.getClientesStorage()
        if(clientes){
            dispatch(success(clientes))
        }
        else{
            accountService.getClientes()
                .then(
                    clientes => dispatch(success(clientes)),
                    error => dispatch(failure(error.toString()))
                )
        }
    }

    function request() { return { type: clienteConstants.GETLIST_REQUEST } }
    function success(clientes) { return { type: clienteConstants.GETLIST_SUCCESS, clientes } }
    function failure(error) { return { type: clienteConstants.GETLIST_FAILURE, error } }
}

import { clienteConstants } from '../_constants'
import { clienteService } from '../_services'
import { alertActions } from '.'
import { history } from '../_helpers'

export const clienteActions = {
    getList,
    getNew,
    getItem,
    getPersona,
    getDetalleList,
    search,
    register,
    documentos,
    resetForm,
}

function getList() {
    return dispatch => {
        dispatch(request())

        clienteService.getList()
            .then(
                response => dispatch(success(response)),
                error => dispatch(failure(error.toString()))
            )
    }

    function request() { return { type: clienteConstants.GETLIST_REQUEST } }
    function success(response) { return { type: clienteConstants.GETLIST_SUCCESS, response } }
    function failure(error) { return { type: clienteConstants.GETLIST_FAILURE, error } }
}

function getNew(data){
    return dispatch => {
        dispatch(success(data))
    }

    function success(response) { return { type: clienteConstants.GETITEM_SUCCESS, response } }
}

function getItem(id) {
    return dispatch => {
        dispatch(request())

        clienteService.getItem(id)
            .then(
                response => dispatch(success(response)),
                error => dispatch(failure(error.toString()))
            )
    }

    function request() { return { type: clienteConstants.GETITEM_REQUEST } }
    function success(response) { return { type: clienteConstants.GETITEM_SUCCESS, response } }
    function failure(error) { return { type: clienteConstants.GETITEM_FAILURE, error } }
}


function getPersona(tipoDocumento, nroDocumento) {
    return dispatch => {
        dispatch(request())

        clienteService.getPersona(tipoDocumento, nroDocumento)
            .then(
                response => dispatch(success(response)),
                error => dispatch(failure(error.toString()))
            )
    }

    function request() { return { type: clienteConstants.GETPERSONA_REQUEST } }
    function success(response) { return { type: clienteConstants.GETPERSONA_SUCCESS, response } }
    function failure(error) { return { type: clienteConstants.GETPERSONA_FAILURE, error } }
}

function getDetalleList() {
    return dispatch => {
        dispatch(request())

        clienteService.getDetalleList()
            .then(
                response => dispatch(success(response)),
                error => dispatch(failure(error.toString()))
            )
    }

    function request() { return { type: clienteConstants.GETDETALLE_REQUEST } }
    function success(response) { return { type: clienteConstants.GETDETALLE_SUCCESS, response } }
    function failure(error) { return { type: clienteConstants.GETDETALLE_FAILURE, error } }
}

function search(args) {
    return dispatch => {
        dispatch(request())

        clienteService.search(args)
            .then(
                response => dispatch(success(response)),
                error => dispatch(failure(error.toString()))
            )
    }

    function request() { return { type: clienteConstants.RESULTS_REQUEST } }
    function success(response) { return { type: clienteConstants.RESULTS_SUCCESS, response } }
    function failure(error) { return { type: clienteConstants.RESULTS_FAILURE, error } }
}

function register(args) {
    return dispatch => {
        dispatch(request(args))
        dispatch(alertActions.clear())

        clienteService.register(args)
            .then(
                response => {
                    dispatch(success(response))
                },
                error => {
                    dispatch(failure(error.toString()))
                    dispatch(alertActions.error(error.toString()))
                }
            )
    }

    function request() { return { type: clienteConstants.REGISTER_REQUEST } }
    function success(response) { return { type: clienteConstants.REGISTER_SUCCESS, response } }
    function failure(error) { return { type: clienteConstants.REGISTER_FAILURE, error } }
}

function documentos(args) {
    return dispatch => {
        dispatch(request(args))
        dispatch(alertActions.clear())

        clienteService.documentos(args)
            .then(
                response => {
                    dispatch(success(response))
                },
                error => {
                    dispatch(failure(error.toString()))
                    dispatch(alertActions.error(error.toString()))
                }
            )
    }

    function request() { return { type: clienteConstants.DOCUMENTO_REQUEST } }
    function success(response) { return { type: clienteConstants.DOCUMENTO_SUCCESS, response } }
    function failure(error) { return { type: clienteConstants.DOCUMENTO_FAILURE, error } }
}

function resetForm(from){
    return dispatch => {
        dispatch({ type: clienteConstants.FORM_RESET })
        history.push(from);
    }
}

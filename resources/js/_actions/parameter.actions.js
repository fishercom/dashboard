import { parameterConstants } from '../_constants'
import { parameterService } from '../_services'

export const parameterActions = {
    getList,
    getItem,
}

function getList() {
    return dispatch => {
        dispatch(request())

        parameterService.getList()
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error.toString()))
            )
    }

    function request() { return { type: parameterConstants.GETLIST_REQUEST } }
    function success(response) { return { type: parameterConstants.GETLIST_SUCCESS, response } }
    function failure(error) { return { type: parameterConstants.GETLIST_FAILURE, error } }
}

function getItem(id) {
    return dispatch => {
        dispatch(request())

        parameterService.getItem(id)
            .then(
                response => dispatch(success(response)),
                error => dispatch(failure(error.toString()))
            )
    }

    function request() { return { type: parameterConstants.GETITEM_REQUEST } }
    function success(response) { return { type: parameterConstants.GETITEM_SUCCESS, response } }
    function failure(error) { return { type: parameterConstants.GETITEM_FAILURE, error } }
}

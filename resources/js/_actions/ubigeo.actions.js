import { ubigeoConstants } from '../_constants'
import { ubigeoService } from '../_services'

export const ubigeoActions = {
    getDepartments,
    getProvinces,
    getDistricts
}

function getDepartments() {
    return dispatch => {
        dispatch(request())

        ubigeoService.getDepartments()
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error.toString()))
            )
    }

    function request() { return { type: ubigeoConstants.GETDEPARTMENTS_REQUEST } }
    function success(response) { return { type: ubigeoConstants.GETDEPARTMENTS_SUCCESS, response } }
    function failure(error) { return { type: ubigeoConstants.GETDEPARTMENTS_FAILURE, error } }
}

function getProvinces(department_id) {
    return dispatch => {
        dispatch(request())

        ubigeoService.getProvinces(department_id)
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error.toString()))
            )
    }

    function request() { return { type: ubigeoConstants.GETPROVINCES_REQUEST } }
    function success(response) { return { type: ubigeoConstants.GETPROVINCES_SUCCESS, response } }
    function failure(error) { return { type: ubigeoConstants.GETPROVINCES_FAILURE, error } }
}

function getDistricts(province_id) {
    return dispatch => {
        dispatch(request())

        ubigeoService.getDistricts(province_id)
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error.toString()))
            )
    }

    function request() { return { type: ubigeoConstants.GETDISTRICTS_REQUEST } }
    function success(response) { return { type: ubigeoConstants.GETDISTRICTS_SUCCESS, response } }
    function failure(error) { return { type: ubigeoConstants.GETDISTRICTS_FAILURE, error } }
}

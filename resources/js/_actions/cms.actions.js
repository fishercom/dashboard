import { cmsConstants } from '../_constants'
import { cmsService } from '../_services'
import { alertActions } from '.'
import { history } from '../_helpers'

export const cmsActions = {
    getHome,
    getHeader,
    getFooter,
    getPages,
    getPage,
}

function getHome(args) {
    return dispatch => {
        dispatch(request())

        cmsService.getHome(args)
            .then(
                response => dispatch(success(response)),
                error => dispatch(failure(error.toString()))
            )
    }

    function request() { return { type: cmsConstants.GETHOME_REQUEST } }
    function success(response) { return { type: cmsConstants.GETHOME_SUCCESS, response } }
    function failure(error) { return { type: cmsConstants.GETHOME_FAILURE, error } }
}

function getHeader(args) {
    return dispatch => {
        dispatch(request())

        cmsService.getHeader(args)
            .then(
                response => dispatch(success(response)),
                error => dispatch(failure(error.toString()))
            )
    }

    function request() { return { type: cmsConstants.GETHEADER_REQUEST } }
    function success(response) { return { type: cmsConstants.GETHEADER_SUCCESS, response } }
    function failure(error) { return { type: cmsConstants.GETHEADER_FAILURE, error } }
}

function getFooter(args) {
    return dispatch => {
        dispatch(request())

        cmsService.getFooter(args)
            .then(
                response => dispatch(success(response)),
                error => dispatch(failure(error.toString()))
            )
    }

    function request() { return { type: cmsConstants.GETFOOTER_REQUEST } }
    function success(response) { return { type: cmsConstants.GETFOOTER_SUCCESS, response } }
    function failure(error) { return { type: cmsConstants.GETFOOTER_FAILURE, error } }
}

function getPages(args) {
    return dispatch => {
        dispatch(request())

        cmsService.getPages(args)
            .then(
                response => dispatch(success(response)),
                error => dispatch(failure(error.toString()))
            )
    }

    function request() { return { type: cmsConstants.GETPAGES_REQUEST } }
    function success(response) { return { type: cmsConstants.GETPAGES_SUCCESS, response } }
    function failure(error) { return { type: cmsConstants.GETPAGES_FAILURE, error } }
}

function getPage(slug) {
    return dispatch => {
        dispatch(request())

        cmsService.getPage(slug)
            .then(
                response => dispatch(success(response)),
                error => dispatch(failure(error.toString()))
            )
    }

    function request() { return { type: cmsConstants.GETPAGE_REQUEST } }
    function success(response) { return { type: cmsConstants.GETPAGE_SUCCESS, response } }
    function failure(error) { return { type: cmsConstants.GETPAGE_FAILURE, error } }
}

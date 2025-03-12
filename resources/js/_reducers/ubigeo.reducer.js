import { ubigeoConstants } from '../_constants'

export function ubigeo(state = {}, action) {
    switch (action.type) {
        case ubigeoConstants.GETDEPARTMENTS_REQUEST:
            return {
                loading: true
            }
        case ubigeoConstants.GETDEPARTMENTS_SUCCESS:
            return {
                departments: action.response
            }
        case ubigeoConstants.GETDEPARTMENTS_FAILURE:
            return {
                error: action.error
            }

        case ubigeoConstants.GETPROVINCES_REQUEST:
            return {
                ...state,
                loading: true,
                error: false
            }
        case ubigeoConstants.GETPROVINCES_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                provinces: action.response
            }
        case ubigeoConstants.GETPROVINCES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }

        case ubigeoConstants.GETDISTRICTS_REQUEST:
            return {
                ...state,
                error: false,
                loading: true
            }
        case ubigeoConstants.GETDISTRICTS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                districts: action.response
            }
        case ubigeoConstants.GETDISTRICTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }

        default:
            return state
    }
}

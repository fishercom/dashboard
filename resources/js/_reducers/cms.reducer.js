import { cmsConstants } from '../_constants'

export function cms(state = {}, action) {
    switch (action.type) {
        case cmsConstants.GETHOME_REQUEST:
            return {
                ...state,
                loading: true
            }
        case cmsConstants.GETHOME_SUCCESS:
            return {
                ...state,
                loading: false,
                home: action.response
            }
        case cmsConstants.GETHOME_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }

        case cmsConstants.GETPAGES_REQUEST:
            return {
                ...state,
                loading: true
            }
        case cmsConstants.GETPAGES_SUCCESS:
            return {
                ...state,
                loading: false,
                pages: action.response
            }
        case cmsConstants.GETPAGES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }

        case cmsConstants.GETPAGE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case cmsConstants.GETPAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                page: action.response
            }
        case cmsConstants.GETPAGE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }

        case cmsConstants.GETHEADER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case cmsConstants.GETHEADER_SUCCESS:
            return {
                ...state,
                loading: false,
                header: action.response
            }
        case cmsConstants.GETHEADER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }

        case cmsConstants.GETFOOTER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case cmsConstants.GETFOOTER_SUCCESS:
            return {
                ...state,
                loading: false,
                footer: action.response
            }
        case cmsConstants.GETFOOTER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }

        default:
            return state
    }
}

import { parameterConstants } from '../_constants'

export function parameters(state = {}, action) {
    switch (action.type) {
        case parameterConstants.GETLIST_REQUEST:
            return {
                loading: true
            }
        case parameterConstants.GETLIST_SUCCESS:
            return {
                items: action.response
            }
        case parameterConstants.GETLIST_FAILURE:
            return {
                error: action.error
            }

        case parameterConstants.GETITEM_REQUEST:
            return {
                loading: true
            }
        case parameterConstants.GETITEM_SUCCESS:
            return {
                data: action.response
            }
        case parameterConstants.GETITEM_FAILURE:
            return {
                error: action.error
            }
        default:
            return state
    }
}

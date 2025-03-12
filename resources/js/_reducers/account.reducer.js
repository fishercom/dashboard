import { accountConstants } from '../_constants'

export function account(state = {}, action) {
    switch (action.type) {
        case accountConstants.REGISTER_REQUEST:
            return { registering: true }
        case accountConstants.REGISTER_SUCCESS:
            return {}
        case accountConstants.REGISTER_FAILURE:
            return {}

        case accountConstants.FORGOT_REQUEST:
            return { sending: true }
        case accountConstants.FORGOT_SUCCESS:
            return { response: action.response }
        case accountConstants.FORGOT_FAILURE:
            return { error: action.error }

        default:
            return state
    }
}

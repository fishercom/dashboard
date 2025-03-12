import { accountConstants } from '../_constants'
import { accountService } from '../_services'

let account = JSON.parse(accountService.getAccount())
const initialState = account ? { loggedIn: true, account } : {}

export function authentication(state = initialState, action) {
    switch (action.type) {
        case accountConstants.LOGIN_REQUEST:
            return {
                loggingIn: true
            }
        case accountConstants.LOGIN_SUCCESS:
            return {
                account: action.response
            }
        case accountConstants.LOGIN_FAILURE:
            return {
                error: action.error
            }
        case accountConstants.LOGOUT:
            return {}
        default:
            return state
    }
}

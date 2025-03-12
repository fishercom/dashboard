import { clienteConstants } from '../_constants'

export function clientes(state = {}, action) {
    switch (action.type) {
        case clienteConstants.FORM_RESET:
            return {}

        case clienteConstants.GETLIST_REQUEST:
            return {
                ...state,
                loading: true
            }
        case clienteConstants.GETLIST_SUCCESS:
            return {
                ...state,
                items: action.response
            }
        case clienteConstants.GETLIST_FAILURE:
            return {
                ...state,
                error: action.error
            }

        case clienteConstants.GETITEM_REQUEST:
            return {
                ...state,
                loading: true
            }
        case clienteConstants.GETITEM_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.response
            }
        case clienteConstants.GETITEM_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }

        case clienteConstants.GETPERSONA_REQUEST:
            return {
                ...state,
                loading: true
            }
        case clienteConstants.GETPERSONA_SUCCESS:
            return {
                ...state,
                loading: false,
                persona: action.response
            }
        case clienteConstants.GETPERSONA_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }

        case clienteConstants.GETDETALLE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case clienteConstants.GETDETALLE_SUCCESS:
            return {
                ...state,
                loading: false,
                detalles: action.response
            }
        case clienteConstants.GETDETALLE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }

        case clienteConstants.REGISTER_REQUEST:
            return {
                ...state,
                registering: true
            }
        case clienteConstants.REGISTER_SUCCESS:
            return {
                response: action.response
            }
        case clienteConstants.REGISTER_FAILURE:
            return {
                ...state,
                registering: false,
                error: action.error
            }

        case clienteConstants.DOCUMENTO_REQUEST:
            return {
                ...state,
                registering: true
            }
        case clienteConstants.DOCUMENTO_SUCCESS:
            return {
                response_documentos: action.response
            }
        case clienteConstants.DOCUMENTO_FAILURE:
            return {
                ...state,
                registering: false,
                error: action.error
            }

        default:
            return state
    }
}

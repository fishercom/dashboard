import { combineReducers } from 'redux'

import { authentication } from './authentication.reducer'
import { account } from './account.reducer'
import { cms } from './cms.reducer'
import { parameters } from './parameters.reducer'
import { ubigeo } from './ubigeo.reducer'
import { clientes } from './clientes.reducer'
import { alert } from './alert.reducer'

const rootReducer = combineReducers({
    authentication,
    account,
    cms,
    parameters,
    ubigeo,
    clientes,
    alert
})

export default rootReducer

import { combineReducers } from 'redux'
import { authReducer } from './auth'
//combine multiple reducers - not currently being used
const rootReducer = combineReducers({
  auth: authReducer,
})

export default rootReducer
import { combineReducers } from 'redux'
import { authReducer } from './auth/authReducer'
import { loaderReducer, pulseLoader } from './loader/loaderReducer'

// create root reducer
export const rootReducer = combineReducers({
  auth: authReducer,
  loader: loaderReducer,
  pulseLoader: pulseLoader,
})

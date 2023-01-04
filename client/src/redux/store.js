import { applyMiddleware, createStore } from "redux";
import {composeWithDevTools } from 'redux-devtools-extension'
import { rootReducer } from "./rootReducer";
import thunk from 'redux-thunk'

const middaleware = [thunk]


// create a store
const store = createStore( rootReducer, composeWithDevTools(applyMiddleware(...middaleware)) )

export default store

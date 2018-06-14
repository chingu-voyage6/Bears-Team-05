import { combineReducers } from 'redux'

//import sub reducers below
import { testReducer } from './testReducer'

export default combineReducers({
    test: testReducer
})
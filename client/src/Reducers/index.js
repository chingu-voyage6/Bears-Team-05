import { combineReducers } from 'redux';

// import sub reducers below
import testReducer from './testReducer';
import authReducer from './authReducer';

export default combineReducers({
  user: authReducer,
  test: testReducer,
});

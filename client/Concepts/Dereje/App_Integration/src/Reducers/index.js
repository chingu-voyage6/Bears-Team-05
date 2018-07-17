import { combineReducers } from 'redux';

import testReducer from './testReducer';
import authReducer from './authReducer';
import gameReducer from './gameReducer';

export default combineReducers({
  user: authReducer,
  test: testReducer,
  game: gameReducer,
});

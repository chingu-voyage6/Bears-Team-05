/* ================================= SETUP ================================= */

import { createStore } from 'redux';
import rootReducer from '../reducers';

/* ================================= STORE ================================= */

const store = createStore(rootReducer);

export default store;

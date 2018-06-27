import React from 'react';
import ReactDOM from 'react-dom';

import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducers from './Reducers/index';

import AppRouter from './routers/AppRouter';

import { unregister } from './registerServiceWorker';

import './index.css';

// apply middleware amd create store
const middleware = applyMiddleware(thunk, logger);
const store = createStore(reducers, middleware);

<<<<<<< HEAD
// only for testing redux store see console for logger output
store.dispatch({
  type: 'BEGIN',
});
store.dispatch({
  type: 'END',
});
// end testing

const rootJsx = (
=======
// Wrap components in Provider and assign routes
const Routes = (
>>>>>>> add auth action/reducer, validate client side auth, clean lint errors
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(rootJsx, document.getElementById('root'));
unregister();

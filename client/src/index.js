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

// Wrap components in Provider and assign routes
const rootJsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(rootJsx, document.getElementById('root'));
unregister();

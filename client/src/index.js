import React from 'react';
import ReactDOM from 'react-dom';

import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducers from './Reducers/index';

import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import { unregister } from './registerServiceWorker';

import './index.css';
import App from './App';

import Main from './Components/main';
import Test from './Components/test';

// apply middleware amd create store
const middleware = applyMiddleware(thunk, logger);
const store = createStore(reducers, middleware);

// only for testing redux store see console for logger output
store.dispatch({
  type: 'BEGIN',
});
store.dispatch({
  type: 'END',
});
// end testing

// Wrap components in Provider and assign routes
const Routes = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Main}>
        <IndexRoute component={App} />
        <Route path="/test" component={Test} />
      </Route>
    </Router>
  </Provider>
);

ReactDOM.render(Routes, document.getElementById('root'));
unregister();

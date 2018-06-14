import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//unregistered service workers because of conflict with deployment later
import { unregister } from './registerServiceWorker';

//import redux stuff
import { applyMiddleware,createStore } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
//import router stuff
import { Router, Route, browserHistory, IndexRoute } from 'react-router'


//**apply redux store in root**//
//import combined reducers
import reducers from './Reducers/index'
//import react components used for routing below
import Main from './Components/main'
import Test from './Components/test'

//apply middleware amd create store
const middleware = applyMiddleware(thunk,logger)
const store = createStore(reducers,middleware)

//only for testing redux store see console for logger output
store.dispatch({
    type:'BEGIN'
})
store.dispatch({
    type:'END'
})
//end testing



const Routes =(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path='/' component={Main}>
                <IndexRoute component={App}/>
                <Route path='/test' component={Test}/>
            </Route>
        </Router>
    </Provider>
)
ReactDOM.render(Routes, document.getElementById('root'));
unregister();

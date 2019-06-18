import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import user from './user';

const reducer = combineReducers({user});
const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}));
const store = createStore(reducer, middleware);

export default store;

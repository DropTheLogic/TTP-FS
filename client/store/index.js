import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import user from './user';
import stocks from './stocks';
import transactions from './transactions';

const reducer = combineReducers({ user, stocks, transactions });
const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}));
const store = createStore(reducer, middleware);

export default store;

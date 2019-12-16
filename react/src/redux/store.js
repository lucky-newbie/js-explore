import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import moduleA from './reducer';


const store = createStore(moduleA, applyMiddleware(logger, thunk));
// const store = createStore(moduleA);

export default store;

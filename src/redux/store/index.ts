import reducers from '../reducers';
import { createStore } from 'redux';
declare global {
    interface Window { __REDUX_DEVTOOLS_EXTENSION__: any; }
}

const store = window.__REDUX_DEVTOOLS_EXTENSION__ ? createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) : createStore(reducers);

export default store;

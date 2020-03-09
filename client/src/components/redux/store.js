import { createStore } from 'redux';
import rootReducer from './reducers/index';

/* eslint-disable no-underscore-dangle */
export default createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    /* eslint-enable */
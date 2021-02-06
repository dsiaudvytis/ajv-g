import { createStore, combineReducers } from 'redux';
import sourceDoc from './sourceDoc';

const rootReducer = combineReducers({
  sourceDoc,
})

export default preloadedState => createStore(
  rootReducer,
  preloadedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

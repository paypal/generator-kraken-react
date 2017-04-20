import {
  createStore,
  applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const initStore = preloadedState => {
  const store = createStore(rootReducer, { tasks: preloadedState.tasks }, applyMiddleware(thunk));
  return store;
};

export default initStore;

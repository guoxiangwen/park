import { combineReducers } from 'redux';
import carReducer from './car';
import payReducer from './pay';

const rootReducer = combineReducers({
  carReducer,
  payReducer
});
export default rootReducer;

import { combineReducers } from 'redux';
import base from './base/reducer.jsx';
import opcua from './opcua/reducer.jsx';

const rootReducer = combineReducers({
  base,
  opcua,
});

export default rootReducer;

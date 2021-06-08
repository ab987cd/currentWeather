import {combineReducers} from 'redux';

import userReducer from './userReducer';

const appReducer = combineReducers({
  userReducer,
});
const rootReducer = (state, action) => {
  const result = appReducer(state, action);
  return result;
};
export default rootReducer;

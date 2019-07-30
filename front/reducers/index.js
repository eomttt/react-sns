import { combineReducers } from 'redux';

import post from './post';
import user from './user';

const rootReducer = combineReducers({
  user,
  post,
});

export default rootReducer;
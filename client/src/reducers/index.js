import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import books from './books';
import bookbot from './bookbot';
export default combineReducers({
  alert,
  auth,
  books,
  bookbot,
});
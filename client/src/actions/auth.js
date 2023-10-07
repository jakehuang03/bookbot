import * as api from '../utils/api';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from './types';

// Register User
export const register = (formData) => async (dispatch) => {
  try {
    const res = await api.register('/users', formData);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    // dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

// Login User


export const login = (username, password, navigate) => async (dispatch) => {
  const body = new FormData();
  body.append("username", username);
  body.append("password", password);
  const config = {
      headers: {
        'Content-Type': 'application/form-data'
      }
  }
  try {
    const res = await api.login(body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    navigate('/')
  } catch (err) {
    const errors = err.response.data.detail;
    if (errors) {
      dispatch(setAlert(errors, 'danger'));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

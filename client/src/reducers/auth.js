import {
    AUTH,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
} from '../actions/types';

const initialState = {
    isAuthenticated: false,
    loading: false,
    user: null
}
 
export default function au(state = initialState, action) {
    const {type, payload} = action;
    switch(type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({...action?.data}))
            return {...state,
                isAuthenticated: true}
            ;
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload,
            }
        case REGISTER_SUCCESS: 
            return {
                ...state,
                ...payload,
                loading: false
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            }
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.clear();
            return {
                ...state,
                isAuthenticated: false,
                loading: false
            }
        default:
            return state;
    }
}
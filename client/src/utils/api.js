import axios from 'axios';
// import {LOGOUT} from '../actions/types'

const api = axios.create(
  { baseURL: 'http://localhost:8000' }
);

api.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
      if(JSON.parse(localStorage.getItem('profile'))?.token)
          req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
      else 
          req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).sub}`;
  }

  return req;
});

/*
  NOTE: intercept any error responses from the api
 and check if the token is no longer valid.
 ie. Token has expired or user is no longer
 authenticated.
 logout the user if the token has expired
*/

// api.interceptors.response.use(
//   (res) => res,
//   (err) => {
//     if (err.response.status === 401) {
//       store.dispatch({ type: LOGOUT });
//     }
//     return Promise.reject(err);
//   }
// );

export const loadUser = (formData) => api.post('/api/user/loadUser', formData);
export const register = (formData) => api.post('/api/user/register', formData);
export const login = (body, config) => api.post('/token', body, config);
export const createBook = (formDate, config) => api.post('/books/', formDate, config);
export const askQuestion = (body) => api.get('/ask/', body);
export default api;
import axios from 'axios';

const api = axios.create(
    { baseURL: 'https://localhost:8000' }
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

export const signIn = (formData) => api.post('/api/user/signin', formData);
export const signUp = (formData) => api.post('/api/user/signup', formData);

export default api;
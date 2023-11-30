import axios from "axios";
import config from "./config";
// import {LOGOUT} from '../actions/types'

const api = axios.create({ baseURL: config.baseURL });

api.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    if (JSON.parse(localStorage.getItem("profile"))?.token)
      req.headers.Authorization = `Bearer ${
        JSON.parse(localStorage.getItem("profile")).token
      }`;
    else
      req.headers.Authorization = `Bearer ${
        JSON.parse(localStorage.getItem("profile")).sub
      }`;
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

export const loadUser = (formData) => api.post("/api/user/loadUser", formData);
export const register = (formData) => api.post("/user/signup", formData);
export const login = (body, config) => api.post("/user/token", body, config);
export const googleLogin = (body, config) => api.post("/user/googleSignIn", body, config);

export const auth = () => api.get("/user/me");

export const getAvatar = (userId) => api.get(`/user/s3get/${userId}`);
export const saveAvatar = (formData, config) =>
  api.put("/user/s3upload", formData, config);
export const createProfile = (formData, config) =>
  api.post("/user/createprofile", formData, config);
export const getProfile = (userId) => api.get(`/user/getprofile/${userId}`);

export const createBook = (formData, config) => api.post("/books", formData, config);
export const fetchBook = (bookId, userId) => api.get(`/books/${bookId}${userId !== undefined ? `?userId=${userId}` : ''}`);
export const fetchBooks = () => api.get("/books");
export const fetchMyBooks = (userId) => api.get(`/mybooks?userId=${userId}`);
export const fetchBooksBySearch = (searchQuery) => api.get(`/books/search?searchBook=${searchQuery.searchBook || "none"}&genre=${searchQuery.genre || "none"}`)
export const fetchMyBooksBySearch = (searchQuery, userId) => api.get(`/mybooks/search?searchBook=${searchQuery.searchBook || "none"}&genre=${searchQuery.genre || "none"}&userId=${userId}`);
export const deleteBook = (userId, bookId) => api.delete(`/mybooks?userId=${userId}&bookId=${bookId}`);
export const updateBook = (userId, bookId, published) => api.patch(`/mybooks?userId=${userId}&bookId=${bookId}&published=${published}`);

export const askQuestion = (book, question) =>
  api.get("/bookbot/ask/", { params: { book: book, question: question } });
export const saveAnswer = (formData, config) =>
  api.post("/com/saveques", formData, config);

export const getImageUploadURL = () => api.get("/user/s3url");

export const getQuestionByUser = (userID) =>
  api.get(`/com/getquesbyuser/${userID}`);
export const getQuestionByBook = (bookID) =>
  api.get(`/com/getquesbybook/${bookID}`);

export const getQuestionCount = () => api.get(`/com/getquescount/`);
export const getQuestionByPage = (page) =>
  api.get(`/com/getquesbypage/${page}`);

export const saveComment = (formData, config) =>
  api.post("/com/savecomment", formData, config);
export const getQuestionByQues = (questionID) =>
  api.get(`/com/getquesbyques/${questionID}`);
export const getCommentByQues = (questionID) =>
  api.get(`/com/getcommentbyques/${questionID}`);

export default api;

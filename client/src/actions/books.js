import * as api from '../utils/api';
import { CREATE_BOOK, FETCH_BY_SEARCH, FETCH_BOOK, FETCH_BOOKS} from './types';

export const createBook = (book, userId, navigate) => async (dispatch) => {
    const body = new FormData();
    body.append("title", book.title);
    body.append("author", book.author);
    body.append("summary", book.summary);
    body.append("userid", userId);
    body.append("genre", book.genre);
    body.append("file", book.selectedFile);
    const config = {
        headers: {
          'Content-Type': 'application/form-data'
        }
    }
    try {
      const { data } = await api.createBook(body, config);
      dispatch({type: CREATE_BOOK, payload: data});
      navigate(`/books/${data.bookid}`);
    } catch (error) {
      console.log(error.message);
    }
};

export const getBook = (bookid) => async(dispatch) => {
  try {
    const {data} = await api.fetchBook(bookid);
    dispatch({ type: FETCH_BOOK, payload: { post: data } });
  }
  catch (error) {
    console.log(error.message);
  }
}

export const getBooks = () => async(dispatch) => {
  try {
    const {data} = await api.fetchBooks()
    dispatch({type: FETCH_BOOKS, payload: data});
  }
  catch (error) {
    console.log(error.message);
  }
}
export const getMyBooks = (userId) => async(dispatch) => {
  try {
    const {data} = await api.fetchMyBooks(userId)
    dispatch({type: FETCH_BOOKS, payload: data});
  }
  catch (error) {
    console.log(error.message);
  }
}

export const getBooksBySearch = (searchQuery) => async(dispatch) => {
  try {
    const {data} = await api.fetchBooksBySearch(searchQuery);
    dispatch({ type: FETCH_BY_SEARCH, payload: data });
  }
  catch (error) {
    console.log(error.message);
  }
}


export const getMyBooksBySearch = (searchQuery, userId) => async(dispatch) => {
  try {
    const {data} = await api.fetchMyBooksBySearch(searchQuery, userId);
    dispatch({ type: FETCH_BY_SEARCH, payload: data });
  }
  catch (error) {
    console.log(error.message);
  }
}
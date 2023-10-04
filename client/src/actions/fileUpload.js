import * as api from '../utils/api';
import { CREATE_BOOK } from './types';

export const createBook = (book, navigate) => async (dispatch) => {
    const body = new FormData();
    body.append("title", book.title);
    body.append("author", book.author);
    body.append("summary", book.summary);
    body.append("file", book.selectedFile);
    const config = {
        headers: {
          'Content-Type': 'application/form-data'
        }
    }
    try {
      dispatch({type: CREATE_BOOK});
      const { data } = await api.createBook(body, config);
      dispatch({ type: 'CREATE', payload: data });
      navigate(`/books/${data._id}`);
    } catch (error) {
      console.log(error.message);
    }
};
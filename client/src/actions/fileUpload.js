import * as api from '../utils/api';
import { CREATE_BOOK } from './types';

export const createBook = (post, navigate) => async (dispatch) => {
    try {
      dispatch({type: CREATE_BOOK});
      const { data } = await api.createBook(post);
      dispatch({ type: 'CREATE', payload: data });
      navigate(`/books/${data._id}`);
    } catch (error) {
      console.log(error.message);
    }
};
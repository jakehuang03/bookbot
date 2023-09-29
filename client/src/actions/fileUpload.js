import * as api from '../utils/api';

export const createBook = (post, history) => async (dispatch) => {
    try {
      dispatch({type: 'CREATE'});
      const { data } = await api.createBook(post);
      dispatch({ type: 'CREATE', payload: data });
      history.push(`/books/${data._id}`);
    } catch (error) {
      console.log(error.message);
    }
};
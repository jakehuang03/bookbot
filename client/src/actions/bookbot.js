import { SELECT_BOOK, ASK_QUESTION } from "./types";

export const selectBook = (book) => dispatch => {
  dispatch({ type: SELECT_BOOK, payload: book });
};

export const askQuestion = (question) => async (dispatch) => {
  try {
    // TODO: send the question to backend
    dispatch({ type: ASK_QUESTION, payload: question });
  } catch (error) {
    console.log(error.message);
  }
}
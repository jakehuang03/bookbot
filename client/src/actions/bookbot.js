import { SELECT_BOOK, ASK_QUESTION, ANSWER_SUCCESS } from "./types";
import * as api from '../utils/api';

export const selectBook = (book) => dispatch => {
  dispatch({ type: SELECT_BOOK, payload: book });
};

export const askQuestion = (question) => async (dispatch) => {
  // TODO: send the question to backend
  dispatch({ type: ASK_QUESTION, payload: question });
  try {
    const { answer } = await api.askQuestion(question);
    dispatch({ type: ANSWER_SUCCESS, payload: answer });
  } catch (error) {
    console.log(error.message);
  }
}
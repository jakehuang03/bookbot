import {
  ASK_QUESTION,
  ANSWER_SUCCESS,
  SOURCE_SUCCESS,
  SAVE_ANSWER,
  ASK_QUESTION_FAIL,
  RESET_QUESTION,
} from "./types";
import * as api from "../utils/api";
import { setAlert } from "./alert";

/**
 * Sends a question to the chatbot and retrieves the answer.
 * @param {Object} book - The book object.
 * @param {string} question - The question to ask the chatbot.
 * @param {function} navigate - The function to navigate to a new page.
 */
export const askQuestion = (book, question, navigate) => async (dispatch) => {
  dispatch({type: RESET_QUESTION});
  dispatch({ type: ASK_QUESTION, payload: question });
  try {
    navigate("/bookbot");
    const answer = await api.askQuestion(book, question);
    dispatch({ type: ANSWER_SUCCESS, payload: answer.data.answer });
    dispatch({ type: SOURCE_SUCCESS, payload: answer.data.extractedpar });
  } catch (error) {
    dispatch({ type: ASK_QUESTION_FAIL });
    dispatch(setAlert("Ask Question Fail", "danger"));
  }
};

/**
 * Saves the answer to a question in the database.
 */
export const saveAnswer = (userId) => async (dispatch, getState) => {
  const { auth, bookbot } = getState();
  //bookid and userid must already be in the database
  if (!auth.user) {
    dispatch(setAlert("Please Login", "danger"));
    return;
  }
  const userid = userId;
  const bookid = bookbot.selectedBook.BookId;
  const question = bookbot.question;
  const answer = bookbot.answer[0].answer;
  var body = new URLSearchParams();
  body.append("userid", userid);
  body.append("bookid", bookid);
  body.append("content", question);
  body.append("answer", answer);
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  try {
    const res = await api.saveAnswer(body, config);
    dispatch({ type: SAVE_ANSWER });
  } catch (error) {
    dispatch(setAlert("Save Answer Fail", "danger"));
  }
};
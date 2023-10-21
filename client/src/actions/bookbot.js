import {
  SELECT_BOOK,
  ASK_QUESTION,
  ANSWER_SUCCESS,
  SOURCE_SUCCESS,
  SAVE_ANSWER,
} from "./types";
import * as api from "../utils/api";

export const selectBook = (book) => (dispatch) => {
  dispatch({ type: SELECT_BOOK, payload: book });
};

export const askQuestion = (book, question, navigate) => async (dispatch) => {
  // send the question to backend
  dispatch({ type: ASK_QUESTION, payload: question });
  // const body = new FormData();
  // body.append("book_title", book.title);
  // body.append("book_id", book.id);
  // body.append("question", question);
  // const config = {
  //   headers: {
  //     "Content-Type": "application/form-data",
  //   },
  // };
  try {
    // const answer = await api.askQuestion(body, config);
    const answer = await api.askQuestion(book.title, question);
    console.log(answer.data.answer);
    dispatch({ type: ANSWER_SUCCESS, payload: answer.data.answer });
    dispatch({ type: SOURCE_SUCCESS, payload: answer.data.extractedpar });
    navigate("/bookbot");
  } catch (error) {
    console.log(error.message);
  }
};

export const saveAnswer = (bookid, userid, question, answer) => (dispatch) => {
  const body = new FormData();
  body.append("book_id", bookid);
  body.append("user_id", userid);
  body.append("question", question);
  body.append("answer", answer);
  const config = {
    headers: {
      "Content-Type": "application/form-data",
    },
  };
  try {
    api.saveAnswer(body, config);
    dispatch({ type: SAVE_ANSWER });
  } catch (error) {
    console.log(error.message);
  }
};

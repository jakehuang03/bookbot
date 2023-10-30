import {
  SELECT_BOOK,
  ASK_QUESTION,
  ANSWER_SUCCESS,
  SOURCE_SUCCESS,
  SAVE_ANSWER,
} from "./types";
import * as api from "../utils/api";
import { setAlert } from "./alert";
export const selectBook = (book) => (dispatch) => {
  dispatch({ type: SELECT_BOOK, payload: book });
};

// send the question to chatbot and get the answer
export const askQuestion = (book, question, navigate) => async (dispatch) => {
  dispatch({ type: ASK_QUESTION, payload: question });
  try {
    const answer = await api.askQuestion(book.title, question);
    dispatch({ type: ANSWER_SUCCESS, payload: answer.data.answer });
    dispatch({ type: SOURCE_SUCCESS, payload: answer.data.extractedpar });
    navigate("/bookbot");
  } catch (error) {
    dispatch(setAlert("Ask Question Fail", "danger"));
  }
};

export const saveAnswer = () => async (dispatch, getState) => {
  
  const { auth, bookbot } = getState();
  // console.log(auth);
  // const userid = auth.UserId;
  const userid = 1;
  const bookid = 1;
  const question = "dsfsdkadfks";
  const answer = "sdfsdf";
  if (!auth.user) {
    dispatch(setAlert("Please Login", "danger"));
    return;
  }
  // const userid = auth.user.data.UserId;
  // const bookid = bookbot.selectedBook.id;
  // console.log(typeof bookid);
  // const question = bookbot.question;
  // const answer = bookbot.answer[0].answer;
  // console.log(userid, bookid, question, answer);
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
    const questionID = await api.saveAnswer(body, config);
    console.log(questionID);
    dispatch({ type: SAVE_ANSWER });
  } catch (error) {
    dispatch(setAlert("Save Answer Fail", "danger"));
  }
};
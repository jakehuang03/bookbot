import {
  SELECT_BOOK,
  ASK_QUESTION,
  ANSWER_SUCCESS,
  SOURCE_SUCCESS,
  SAVE_ANSWER,
  GET_QUESTION_BOOK,
  RESET_QUESTION,
} from "../actions/types";

const initialState = {
  selectedBook: {},
  pastQuestion: [],
  question: "",
  answer: [],
  extractedpar: [],
  saved: false,
};

export default function bookbot(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SELECT_BOOK:
      sessionStorage.setItem("selectedBook", JSON.stringify(payload));
      return { ...state, selectedBook: payload };
    case GET_QUESTION_BOOK:
      return { ...state, pastQuestion: payload };
    case ASK_QUESTION:
      sessionStorage.setItem("question", JSON.stringify(payload));
      return {
        ...state,
        question: payload,
      };
    case ANSWER_SUCCESS:
      sessionStorage.setItem("answer", JSON.stringify(payload));
      return {
        ...state,
        answer: payload,
      };
    case SOURCE_SUCCESS:
      sessionStorage.setItem("extractedpar", JSON.stringify(payload));
      return {
        ...state,
        extractedpar: payload,
      };
    case SAVE_ANSWER:
      sessionStorage.setItem("saved", true);
      return { ...state, saved: true };
    case RESET_QUESTION:
      sessionStorage.removeItem("question");
      sessionStorage.removeItem("answer");
      sessionStorage.removeItem("extractedpar");
      sessionStorage.removeItem("saved");
      return {
        ...state,
        question: "",
        answer: [],
        extractedpar: [],
        saved: false,
      };
    default:
      return state;
  }
}

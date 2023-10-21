import { SELECT_BOOK, ASK_QUESTION, ANSWER_SUCCESS, SOURCE_SUCCESS } from "../actions/types";

const initialState = {
  selectedBook: [],
  question: [],
  answer: [],
  extractedpar: []
};

export default function bookbot(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SELECT_BOOK:
      sessionStorage.setItem("selectedBook", JSON.stringify(payload));
      return { ...state, selectedBook: payload };
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
    default:
      return state;
  }
}

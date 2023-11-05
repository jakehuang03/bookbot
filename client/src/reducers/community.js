import {
    SELECT_POST,
    SAVE_COMMENT
  } from "../actions/types";
  
  const initialState = {
    selectedPost: [],
    comment: []
  };
  
  export default function community(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case SELECT_POST:
        sessionStorage.setItem("selectedPost", JSON.stringify(payload));
        return { ...state, selectedPost: payload };
      case SAVE_COMMENT:
        sessionStorage.setItem("comment", JSON.stringify(payload));
        return { ...state, comment: payload };
      default:
        return state;
    }
  }
  
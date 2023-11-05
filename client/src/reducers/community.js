import {
  GET_QUESTION,
    SELECT_POST,
    SAVE_COMMENT,
    GET_COMMENT,
  } from "../actions/types";
  
  const initialState = {
    post_list: [],
    selectedPost: [],
    comment_list: [],
    my_comment: []
  };
  
  export default function community(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case GET_QUESTION:
        sessionStorage.setItem("post_list", JSON.stringify(payload));
        return { ...state, post_list: payload };
      case SELECT_POST:
        sessionStorage.setItem("selectedPost", JSON.stringify(payload));
        return { ...state, selectedPost: payload };
      case SAVE_COMMENT:
        sessionStorage.setItem("my_comment", JSON.stringify(payload));
        return { ...state, my_comment: payload };
      case GET_COMMENT:
        sessionStorage.setItem("comment_list", JSON.stringify(payload));
        return { ...state, comment_list: payload };
      default:
        return state;
    }
  }
  
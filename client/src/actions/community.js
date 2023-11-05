import axios from "axios";
import { setAlert } from "./alert";
import { GET_QUESTION, GET_QUESTION_BOOK, GET_QUESTION_USER, SELECT_POST, SAVE_COMMENT, GET_COMMENT } from "./types";
import * as api from "../utils/api";


// Get history inquiry by userID
export const getQuestionByUser = (userID) => async (dispatch) => {
	try {
		const res = await api.getQuestionByUser(userID);
		dispatch({
			type: GET_QUESTION_USER,
			payload: res.data,
		});
	} catch (err) {
		console.log(err);
	}
};

// Get past question by bookID, stored in bookbot reducer
export const getQuestionByBook = (bookID) => async (dispatch) => {
	try {
		const res = await api.getQuestionByBook(bookID);
		dispatch({
			type: GET_QUESTION_BOOK,
			payload: res.data,
		});
	} catch (err) {
		console.log(err);
	}
};

// Get all questions
export const getQuestion = () => async (dispatch) => {
	try {
		const res = await api.getQuestion();
		dispatch({
			type: GET_QUESTION,
			payload: res.data,
		});
	} catch (err) {
		console.log(err);
	}
};

// export const selectPost = (post, navigate) => async (dispatch) => {
// 	try {
// 		dispatch({
// 			type: SELECT_POST,
// 			payload: post,
// 		});
// 		navigate(`/posts/${post.id}`);
// 	} catch (err) {
// 		console.log(err);
// 	}
// }

// Get all comments by question id
export const getQuesCommentByID = (id) => async (dispatch) => {
	try {
		const comment = await api.getCommentByQues(id);
		const post = await api.getQuestionByQues(id);
		dispatch({
			type: GET_COMMENT,
			payload: comment.data,
		});
		dispatch({
			type: SELECT_POST,
			payload: post.data,
		});
	} catch (err) {
		console.log(err);
	}
};

export const saveComment = (comment) => async (dispatch, getState) => {
	const { auth, community } = getState();
	//bookid and userid must already be in the database
	if (!auth.user) {
	  dispatch(setAlert("Please Login", "danger"));
	  return;
	}
	const userid = auth.user.data.UserId;
	const questionid = community.selectedPost.QuestionId;
	var body = new URLSearchParams();
	body.append("questionid", questionid);
	body.append("userid", userid);
	body.append("content", comment);
	const config = {
	  headers: {
		"Content-Type": "application/x-www-form-urlencoded",
	  },
	};
	try {
	  const res = await api.saveComment(body, config);
	  dispatch({ type: SAVE_COMMENT });
	//   dispatch(getQuesCommentByID(questionid));
	} catch (error) {
	  dispatch(setAlert("Save Answer Fail", "danger"));
	}
  };
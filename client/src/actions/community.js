import { setAlert } from "./alert";
import {
	GET_QUESTION,
	GET_QUESTION_BOOK,
	GET_QUESTION_USER,
	SELECT_POST,
	SAVE_COMMENT,
	GET_COMMENT,
	GET_QUESTION_COUNT,
	CLEAR_QUESTION_USER,
} from "./types";
import * as api from "../utils/api";

/**
 * Retrieves questions posted by a specific user from the server and dispatches the result to the Redux store.
 * @param {string} userID - The ID of the user whose questions will be retrieved.
 * @returns {Function} An async function that dispatches the retrieved questions to the Redux store.
 */
export const getQuestionByUser = (userID) => async (dispatch) => {
	try {
		const res = await api.getQuestionByUser(userID);
		dispatch({
			type: CLEAR_QUESTION_USER,
		});
		dispatch({
			type: GET_QUESTION_USER,
			payload: res.data,
		});
	} catch (err) {
		console.log(err);
	}
};

/**
 * Retrieves questions posted in a specific book from the server and dispatches the result to the Redux store.
 * @param {string} bookID - The ID of the book whose questions will be retrieved.
 * @returns {Function} An async function that dispatches the retrieved questions to the Redux store.
 */
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

/**
 * Retrieves all questions from the server and dispatches the result to the Redux store.
 * @returns {Function} An async function that dispatches the retrieved questions to the Redux store.
 */
export const getQuestion = (page) => async (dispatch) => {
	try {
		const res = await api.getQuestionByPage(page);
		dispatch({
			type: GET_QUESTION,
			payload: res.data,
		});
	} catch (err) {
		console.log(err);
	}
};

export const getQuestionCount = () => async (dispatch) => {
	try {
		const res = await api.getQuestionCount();
		dispatch({
			type: GET_QUESTION_COUNT,
			payload: res.data,
		});
	} catch (err) {
		console.log(err);
	}
};

/**
 * Retrieves comments for a specific question from the server and dispatches the result to the Redux store.
 * @param {string} id - The ID of the question whose comments will be retrieved.
 * @returns {Function} An async function that dispatches the retrieved comments and question to the Redux store.
 */
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

/**
 * Saves a comment for a specific question to the server and dispatches the result to the Redux store.
 * @param {string} comment - The content of the comment to be saved.
 * @returns {Function} An async function that saves the comment to the server and dispatches the result to the Redux store.
 */
export const saveComment = (comment) => async (dispatch, getState) => {
	const { auth, community } = getState();
	//bookid and userid must already be in the database
	if (!auth.user) {
		dispatch(setAlert("Please Login", "danger"));
		return;
	}
	const userid = auth.user.UserId;
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
		dispatch(getQuesCommentByID(questionid));
	} catch (error) {
		dispatch(setAlert("Save Answer Fail", "danger"));
	}
};

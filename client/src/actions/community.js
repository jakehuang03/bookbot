import axios from "axios";
import { setAlert } from "./alert";
import { GET_QUESTION, GET_QUESTION_BOOK, GET_QUESTION_USER } from "./types";
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

// Get past question by bookID
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

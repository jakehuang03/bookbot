import {
	GET_QUESTION,
	SELECT_POST,
	SAVE_COMMENT,
	GET_COMMENT,
	GET_QUESTION_COUNT,
} from "../actions/types";

const initialState = {
	count: 0,
	post_list: [],
	selectedPost: {},
	comment_list: [],
};

export default function community(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case GET_QUESTION:
			return { ...state, post_list: payload };
		case SELECT_POST:
			return { ...state, selectedPost: payload };
		case SAVE_COMMENT:
			return state;
		case GET_COMMENT:
			return { ...state, comment_list: payload };
		case GET_QUESTION_COUNT:
			return { ...state, count: payload };
		default:
			return state;
	}
}

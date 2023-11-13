import {
	GET_PROFILE,
	PROFILE_ERROR,
	CLEAR_PROFILE,
	UPDATE_PROFILE,
	GET_AVATAR,
	GET_QUESTION_USER,
	CLEAR_QUESTION_USER,
} from "../actions/types";

const initialState = {
	profile: null,
	avatar: null,
	loading: true,
	error: {},
	history: [],
};

export default function a(state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case UPDATE_PROFILE:
		case GET_PROFILE:
			return {
				...state,
				profile: payload,
				loading: false,
			};
		case GET_AVATAR:
			return {
				...state,
				avatar: payload,
			};
		case PROFILE_ERROR:
			return {
				...state,
				error: payload,
				loading: false,
			};
		case CLEAR_PROFILE:
			return {
				...state,
				profile: null,
				loading: false,
				avatar: null,
			};
		case GET_QUESTION_USER:
			return {
				...state,
				history: payload,
			};
		case CLEAR_QUESTION_USER:
			return {
				...state,
				history: [],
			};
		default:
			return state;
	}
}

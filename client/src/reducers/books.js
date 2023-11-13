import {
	CREATE_BOOK,
	FETCH_BOOKS,
	FETCH_BOOK,
	FETCH_BY_SEARCH,
	GET_RECOMMEND,
	CLEAR_RECOMMEND,
} from "../actions/types";

export default function books(state = { books: [], recommended: [] }, action) {
	switch (action.type) {
		case CREATE_BOOK:
			return { ...state };
		case FETCH_BOOKS:
			return { ...state, books: action.payload };
		case FETCH_BY_SEARCH:
			return { ...state, books: action.payload };
		case GET_RECOMMEND:
			return {
				...state,
				recommended: [...state.recommended, action.payload],
			};
		case CLEAR_RECOMMEND:
			return {
				...state,
				recommended: [],
			};
		default:
			return state;
	}
}

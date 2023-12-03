import * as api from "../utils/api";
import {
	CREATE_BOOK,
	FETCH_BY_SEARCH,
	FETCH_BOOK,
	FETCH_BOOKS,
	SELECT_BOOK,
	UPDATE_BOOK,
	DELETE_BOOK,
	CLEAR_RECOMMEND,
	GET_RECOMMEND,
} from "./types";

export const createBook = (book, userId, navigate) => async (dispatch) => {
	const body = new FormData();
	body.append("title", book.title);
	body.append("author", book.author);
	body.append("summary", book.summary);
	body.append("userid", userId);
	body.append("genre", book.genre);
	body.append("file", book.selectedFile);
	const config = {
		headers: {
			"Content-Type": "application/form-data",
		},
	};
	try {
		const { data } = await api.createBook(body, config);
		dispatch({ type: CREATE_BOOK, payload: data });
		navigate(`/books/${data.bookid}`);
	} catch (error) {
		console.log(error.message);
	}
};

export const getBook = (bookid, userid) => async (dispatch) => {
	try {
		const { data } = await api.fetchBook(bookid, userid);
		dispatch({ type: FETCH_BOOK, payload: { post: data } });
		dispatch({ type: SELECT_BOOK, payload: data });
	} catch (error) {
		console.log(error.message);
	}
};

export const getRecomBook = (bookid, userid) => async (dispatch) => {
	let data;
	try {
		dispatch({ type: CLEAR_RECOMMEND });
		if(userid !== undefined) {
			({ data } = await api.fetchBook(bookid, userid));
		}
		else {
			({ data } = await api.fetchBook(bookid));
		}

		dispatch({ type: GET_RECOMMEND, payload: data });
	} catch (error) {
		console.log(error.message);
	}
};

export const getBooks = () => async (dispatch) => {
	try {
		const { data } = await api.fetchBooks();
		dispatch({ type: FETCH_BOOKS, payload: data });
	} catch (error) {
		console.log(error.message);
	}
};
export const getMyBooks = (userId) => async (dispatch) => {
	try {
		const { data } = await api.fetchMyBooks(userId);
		dispatch({ type: FETCH_BOOKS, payload: data });
	} catch (error) {
		console.log(error.message);
	}
};

export const getBooksBySearch = (searchQuery) => async (dispatch) => {
	try {
		const { data } = await api.fetchBooksBySearch(searchQuery);
		dispatch({ type: FETCH_BY_SEARCH, payload: data });
	} catch (error) {
		console.log(error.message);
	}
};

export const getMyBooksBySearch = (searchQuery, userId) => async (dispatch) => {
	try {
		const { data } = await api.fetchMyBooksBySearch(searchQuery, userId);
		dispatch({ type: FETCH_BY_SEARCH, payload: data });
	} catch (error) {
		console.log(error.message);
	}
};

export const deleteBook = (userId, bookId) => async (dispatch) => {
	try {
		const { data } = await api.deleteBook(userId, bookId);
	} catch (error) {
		console.log(error.message);
	}
};

export const updateBook = (userId, bookId, published) => async (dispatch) => {
	try {
		const { data } = await api.updateBook(userId, bookId, published);
	} catch (error) {
		console.log(error.message);
	}
};

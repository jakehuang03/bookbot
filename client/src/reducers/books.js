import {CREATE_BOOK, FETCH_BOOKS, FETCH_BOOK, FETCH_BY_SEARCH} from '../actions/types';

export default function books(state = {books: []}, action) {
    switch (action.type) {
        case CREATE_BOOK: 
            return {...state};
        case FETCH_BOOKS:
            return {...state, books: action.payload};
        case FETCH_BY_SEARCH:
            return {...state, books: action.payload};
        default: 
            return state;
    }
};
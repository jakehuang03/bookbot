import {
    SELECT_BOOK,
    ASK_QUESTION,
    ANSWER_SUCCESS,
} from '../actions/types';

const initialState = {
    selectedBook: [],
    question: [],
    answer: []
}

export default function bookbot(state = initialState, action) {
    const {type, payload} = action;
    switch(type) {
        case SELECT_BOOK:
            return {...state,
                selectedBook: payload}
            ;
        case ASK_QUESTION:
            return {
                ...state,
                question: payload,
            }
        case ANSWER_SUCCESS:
            return {
                ...state,
                answer: payload,
            }
        default:
            return state;
    }
}
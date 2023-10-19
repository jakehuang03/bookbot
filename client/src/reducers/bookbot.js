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
            sessionStorage.setItem('selectedBook', JSON.stringify(payload))
            return {...state,
                selectedBook: payload}
            ;
        case ASK_QUESTION:
            sessionStorage.setItem('question', JSON.stringify(payload))
            return {
                ...state,
                question: payload,
            }
        case ANSWER_SUCCESS:
            sessionStorage.setItem('answer', JSON.stringify(payload))
            return {
                ...state,
                answer: payload,
            }
        default:
            return state;
    }
}
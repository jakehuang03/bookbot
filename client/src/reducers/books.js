import {CREATE_BOOK} from '../actions/types';

export default function books(state = {books: []}, action) {
    switch (action.type) {
        case CREATE_BOOK: 
            return {...state};
        default: 
            return state;
    }
};
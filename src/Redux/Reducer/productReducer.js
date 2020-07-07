import {
    FETCH_DATA_START,
    FETCH_DATA_SUCCESS,
    FETCH_DATA_LIMIT,
    FETCH_DATA_FAILED,
    DATA_FETCHED,
    SEARCH_DATA,
} from "../Types";

const INITIAL_STATE = {
    productList: [],
    loading: false,
    count: 0,
};

export const productReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_DATA_START:
            return {
                ...state,
                loading: true,
            };
        case FETCH_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
            };
        case FETCH_DATA_FAILED:
            return {
                ...state,
                loading: false,
            };
        case FETCH_DATA_LIMIT:
            return {
                ...state,
                productList: action.payload,
                loading: false,
            };
        case DATA_FETCHED:
            return {
                ...state,
                productList: action.payload,
                loading: false,
            };
        case SEARCH_DATA:
            return {
                ...state,
                productList: action.payload,
                loading: false,
            };
        default: return state;
    }
};

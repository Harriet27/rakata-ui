import {
    API_AUTH_START,
    API_AUTH_SUCCESS,
    API_AUTH_FAILED,
    LOGIN,
    LOGOUT,
} from "../Types";

const INITIAL_STATE = {
    id: 0,
    user: '',
    role: 'user',
    status: '',
    message: '',
    loading: false,
    isLogged: false,
};

export const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case API_AUTH_START:
            return {
                ...state,
                loading: true,
            };
        case API_AUTH_SUCCESS:
            return {
                ...state,
                role: 'admin',
                loading: true,
                isLogged: true,
            };
        case API_AUTH_FAILED:
            return {
                ...state,
                loading: true,
            };
        case LOGIN:
            return {
                ...state,
                ...action.payload,
                loading: true,
                isLogged: true,
            };
        case LOGOUT: 
            return INITIAL_STATE;
        default: return state;
    };
};

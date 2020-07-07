import Axios from 'axios';
import { API_URL } from '../../Support/API_URL';
import {
    API_AUTH_START,
    API_AUTH_SUCCESS,
    API_AUTH_FAILED,
    LOGIN,
    LOGOUT,
} from '../Types';

export const LoginAdmin = (form) => {
    return async (dispatch) => {
        dispatch({
            type: API_AUTH_START,
        });
        try {
            let res = await Axios.post(`${API_URL}/users/login`, form);
            let { id, user, roleId, token } = res.data.data;
            dispatch({
                type: LOGIN,
                payload: { id, user, roleId },
            });
            localStorage.setItem('token', token);
            dispatch({
                type: API_AUTH_SUCCESS,
            });
        } catch (err) {
            dispatch({
                type: API_AUTH_FAILED,
                payload: err,
            });
        }
    };
};

export const KeepLogin = (token) => {
    return async (dispatch) => {
        let token = localStorage.getItem('token');
        try {
            if (token) {
                dispatch({
                    type : API_AUTH_START
                });
                let headers = {
                    headers : {
                        'Authorization' : ` Bearer ${token}`,
                    },
                };
                let res = await Axios.post(`${API_URL}/users/keep-login`, {}, headers);
                // console.log(res.data.data);
                let { id, user, roleId } = res.data.data;
                dispatch({
                    type : LOGIN,
                    payload : { id, user, roleId },
                });
                dispatch({
                    type : API_AUTH_SUCCESS
                });
            }
        } catch (err) {
            dispatch({
                type : API_AUTH_FAILED,
                payload : {
                    status : err.message,
                    message : err.message,
                },
            });
        }
    };
};

export const Logout = () => {
    return (dispatch) => {
        localStorage.removeItem('token');
        dispatch({
            type: LOGOUT,
        });
    };
};

import Axios from 'axios';
import { API_URL } from '../../Support/API_URL';
import {
    FETCH_DATA_START,
    FETCH_DATA_SUCCESS,
    FETCH_DATA_FAILED,
    DATA_FETCHED,
    SEARCH_DATA,
    FETCH_DATA_LIMIT,
} from '../Types';

export const getProduct = () => {
    return async (dispatch) => {
        dispatch({
            type: FETCH_DATA_START,
        });
        try {
            let res = await Axios.get(`${API_URL}/products/get-products`);
            dispatch({
                type: DATA_FETCHED,
                payload: res.data.data,
            });
            dispatch({
                type: FETCH_DATA_SUCCESS,
            });
        } catch (err) {
            dispatch({
                type: FETCH_DATA_FAILED,
            });
        }
    }
};

export const getProductLimit = (productPerPage, offset) => {
    return async (dispatch) => {
        dispatch({
            type: FETCH_DATA_START,
        });
        try {
            let res = await Axios.get(`${API_URL}/products/get-limit/${productPerPage}/${offset}`);
            dispatch({
                type: FETCH_DATA_LIMIT,
                payload: res.data.data,
                count: res.data.count,
            });
        } catch (err) {
            dispatch({
                type: FETCH_DATA_FAILED,
            });
        }
    };
};

export const addProduct = (formData) => {
    return async (dispatch) => {
        dispatch({
            type: FETCH_DATA_START,
        });
        try {
            let headers = {
                headers : {
                    'Content-type' : 'multipart/form-data',
                },
            };
            let res = await Axios.post(`${API_URL}/products/add-products`, formData, headers);
            dispatch({
                type: FETCH_DATA_SUCCESS,
                payload: res.data.data,
            });
        } catch (err) {
            dispatch({
                type: FETCH_DATA_FAILED,
            });
        }
    };
};

export const editProduct = (id, formData) => {
    return async (dispatch) => {
        dispatch({
            type: FETCH_DATA_START,
        });
        try {
            let res = await Axios.patch(`${API_URL}/products/edit-products/${id}`, formData);
            dispatch({
                type: FETCH_DATA_SUCCESS,
                payload: res.data.data,
            });
        } catch (err) {
            dispatch({
                type: FETCH_DATA_FAILED,
            });
        }
    }; 
};

export const deleteProduct = (id) => {
    return async (dispatch) => {
        dispatch({
            type: FETCH_DATA_START,
        });
        try {
            await Axios.delete(`${API_URL}/products/delete-products/${id}`);
            dispatch({
                type: FETCH_DATA_SUCCESS,
            });
        } catch (err) {
            dispatch({
                type: FETCH_DATA_FAILED,
            });
        }
    }; 
};

export const searchProduct = (product, productPerPage, offset) => {
    return async (dispatch) => {
        dispatch({
            type: FETCH_DATA_START,
        });
        try {
            let res = await Axios.get(`${API_URL}/products/search-products/${product}/${productPerPage}/${offset}`);
            dispatch({
                type: SEARCH_DATA,
                payload: res.data.data,
                count: res.data.count,
            });
        } catch (err) {
            dispatch({
                type: FETCH_DATA_FAILED,
            })
        }
    };
};

import axios from 'axios';
import {
    CONTRACTS_REQUEST,
    CONTRACTS_SUCCESS,
    CONTRACTS_FAIL,
    CONTRACT_ADD_REQUEST,
    CONTRACT_ADD_SUCCESS,
    CONTRACT_ADD_FAIL,
    CONTRACT_DETAILS_REQUEST,
    CONTRACT_DETAILS_SUCCESS,
    CONTRACT_DETAILS_FAIL,
    CONTRACT_UPDATE_REQUEST,
    CONTRACT_UPDATE_SUCCESS,
    CONTRACT_UPDATE_FAIL,
    CONTRACT_DELETE_REQUEST,
    CONTRACT_DELETE_SUCCESS,
    CONTRACT_DELETE_FAIL,
    CLEAR_ERROR
} from '../../Constants/Contract/contractConstants';

const contractURL = "http://localhost:8080/api/v1/soccer-management/contract";
const config = {
    headers: {
        'Authorization': 'Basic ' + btoa('Manager:ManagerPassword')
    }
}
// //Get one
export const getContractRequest = (id) => async (dispatch) => {
    try {

        dispatch({ type: CONTRACT_DETAILS_REQUEST })

        const { data } = await axios.get(contractURL + `/read/${id}`, config)

        dispatch({
            type: CONTRACT_DETAILS_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: CONTRACT_DETAILS_FAIL,
            payload: error
        });
    }
};


// // Create / POST
export const postContractRequest = (isUpdate, contractData) => async (dispatch) => {
    try {

        dispatch({ type: isUpdate ? CONTRACT_UPDATE_REQUEST : CONTRACT_ADD_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa('Manager:ManagerPassword')
            }
        }

        const { data } = await axios.post(contractURL + `/save`, contractData, config)

        dispatch({
            type: isUpdate ? CONTRACT_UPDATE_SUCCESS : CONTRACT_ADD_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: isUpdate ? CONTRACT_ADD_FAIL : CONTRACT_UPDATE_FAIL,
            payload: error
        });
    }
};

// //Delete
export const deleteContractRequest = (id) => async (dispatch) => {
    try {

        dispatch({ type: CONTRACT_DELETE_REQUEST });

        const { data } = await axios.delete(contractURL + `/delete/${id}`, config)

        dispatch({
            type: CONTRACT_DELETE_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: CONTRACT_DELETE_FAIL,
            payload: error.response
        });
    }
}

// //Get All
export const getAllContractRequest = () => async (dispatch) => {
    try {

        dispatch({ type: CONTRACTS_REQUEST })

        const { data: examples } = await axios.get(contractURL + `/all`, config);

        await dispatch({
            type: CONTRACTS_SUCCESS,
            payload: examples
        });

    } catch (error) {
        dispatch({
            type: CONTRACTS_FAIL,
            payload: error.response
        });
    }
};

// //Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERROR
    });
}
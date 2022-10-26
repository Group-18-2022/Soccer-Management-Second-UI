import axios from 'axios';
import {
    MANAGER_CONTRACTS_REQUEST,
    MANAGER_CONTRACTS_SUCCESS,
    MANAGER_CONTRACTS_FAIL,
    MANAGER_CONTRACT_ADD_REQUEST,
    MANAGER_CONTRACT_ADD_SUCCESS,
    MANAGER_CONTRACT_ADD_FAIL,
    MANAGER_CONTRACT_DETAILS_REQUEST,
    MANAGER_CONTRACT_DETAILS_SUCCESS,
    MANAGER_CONTRACT_DETAILS_FAIL,
    MANAGER_CONTRACT_UPDATE_REQUEST,
    MANAGER_CONTRACT_UPDATE_SUCCESS,
    MANAGER_CONTRACT_UPDATE_FAIL,
    MANAGER_CONTRACT_DELETE_REQUEST,
    MANAGER_CONTRACT_DELETE_SUCCESS,
    MANAGER_CONTRACT_DELETE_FAIL,
    CLEAR_ERROR
} from '../../Constants/Contract/managerContractConstants';

const managerContractURL = "http://localhost:8080/api/v1/soccer-management/managerContract";
const config = {
    headers: {
        'Authorization': 'Basic ' + btoa('Manager:ManagerPassword')
    }
}
// //Get one
export const getManagerContractRequest = (id) => async (dispatch) => {
    try {

        dispatch({ type: MANAGER_CONTRACT_DETAILS_REQUEST })

        const { data } = await axios.get(managerContractURL + `/read/${id}`, config)

        dispatch({
            type: MANAGER_CONTRACT_DETAILS_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: MANAGER_CONTRACT_DETAILS_FAIL,
            payload: error
        });
    }
};


// // Create / POST
export const postManagerContractRequest = (isUpdate, managerContractData) => async (dispatch) => {
    try {

        dispatch({ type: isUpdate ? MANAGER_CONTRACT_UPDATE_REQUEST : MANAGER_CONTRACT_ADD_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa('Manager:ManagerPassword')
            }
        }

        const { data } = await axios.post(managerContractURL + `/save`, managerContractData, config)

        dispatch({
            type: isUpdate ? MANAGER_CONTRACT_UPDATE_SUCCESS : MANAGER_CONTRACT_ADD_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: isUpdate ? MANAGER_CONTRACT_ADD_FAIL : MANAGER_CONTRACT_UPDATE_FAIL,
            payload: error
        });
    }
};

// //Delete
export const deleteManagerContractRequest = (id) => async (dispatch) => {
    try {

        dispatch({ type: MANAGER_CONTRACT_DELETE_REQUEST });

        const { data } = await axios.delete(managerContractURL + `/delete/${id}`, config)

        dispatch({
            type: MANAGER_CONTRACT_DELETE_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: MANAGER_CONTRACT_DELETE_FAIL,
            payload: error.response
        });
    }
}

// //Get All
export const getAllManagerContractRequest = () => async (dispatch) => {
    try {

        dispatch({ type: MANAGER_CONTRACTS_REQUEST })

        const { data: examples } = await axios.get(managerContractURL + `/findAll`, config);

        await dispatch({
            type: MANAGER_CONTRACTS_SUCCESS,
            payload: examples
        });

    } catch (error) {
        dispatch({
            type: MANAGER_CONTRACTS_FAIL,
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
import axios from 'axios';
import {
    CONTACT_INFORMATIONS_REQUEST,
    CONTACT_INFORMATIONS_SUCCESS,
    CONTACT_INFORMATIONS_FAIL,
    CONTACT_INFORMATION_ADD_REQUEST,
    CONTACT_INFORMATION_ADD_SUCCESS,
    CONTACT_INFORMATION_ADD_FAIL,
    CONTACT_INFORMATION_DETAILS_REQUEST,
    CONTACT_INFORMATION_DETAILS_SUCCESS,
    CONTACT_INFORMATION_DETAILS_FAIL,
    CONTACT_INFORMATION_UPDATE_REQUEST,
    CONTACT_INFORMATION_UPDATE_SUCCESS,
    CONTACT_INFORMATION_UPDATE_FAIL,
    CONTACT_INFORMATION_DELETE_REQUEST,
    CONTACT_INFORMATION_DELETE_SUCCESS,
    CONTACT_INFORMATION_DELETE_FAIL,
    CLEAR_ERROR
} from '../../Constants/Club/contactInformationConstants';

const contactInformationURL = "http://localhost:8080/api/v1/soccer-management/contactinformation";
const config = {
    headers: {
        'Authorization': 'Basic ' + btoa('Manager:ManagerPassword')
    }
}
//Get one
export const getContactInformationRequest = (id) => async (dispatch) => {
    try {

        dispatch({ type: CONTACT_INFORMATION_DETAILS_REQUEST })

        const { data } = await axios.get(contactInformationURL + `/read/${id}`, config)

        dispatch({
            type: CONTACT_INFORMATION_DETAILS_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: CONTACT_INFORMATION_DETAILS_FAIL,
            payload: error
        });
    }
};


// Create / POST
export const postContactInformationRequest = (contactInformationData) => async (dispatch) => {
    try {

        dispatch({ type: CONTACT_INFORMATION_ADD_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa('Manager:ManagerPassword')
            }
        }

        const { data } = await axios.post(contactInformationURL + `/save`, contactInformationData, config)

        dispatch({
            type: CONTACT_INFORMATION_ADD_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: CONTACT_INFORMATION_ADD_FAIL,
            payload: error
        });
    }
};

//Update Request
export const updateContactInformationRequest = (contactInformationData) => async (dispatch) => {
    try {

        dispatch({ type: CONTACT_INFORMATION_UPDATE_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa('Manager:ManagerPassword')
            }
        }

        const { data } = await axios.post(contactInformationURL + `/save`, contactInformationData, config)

        dispatch({
            type: CONTACT_INFORMATION_UPDATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: CONTACT_INFORMATION_UPDATE_FAIL,
            payload: error.message
        })
    }
};

//Delete
export const deleteContactInformationRequest = (id) => async (dispatch) => {
    try {

        dispatch({ type: CONTACT_INFORMATION_DELETE_REQUEST })

        const { data } = await axios.delete(contactInformationURL + `/delete/${id}`, config)

        dispatch({
            type: CONTACT_INFORMATION_DELETE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: CONTACT_INFORMATION_DELETE_FAIL,
            payload: error.response
        })
    }
}

//Get All
export const getAllContactInformationsRequest = () => async (dispatch) => {
    try {

        dispatch({ type: CONTACT_INFORMATIONS_REQUEST })

        const { data: contactInformations } = await axios.get(contactInformationURL + `/all`, config);

        await dispatch({
            type: CONTACT_INFORMATIONS_SUCCESS,
            payload: contactInformations
        });

    } catch (error) {
        dispatch({
            type: CONTACT_INFORMATIONS_FAIL,
            payload: error.response
        });
    }
};

//Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERROR
    });
}
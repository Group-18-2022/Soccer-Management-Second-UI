import axios from 'axios';
import { 
    SPONSORS_REQUEST,
    SPONSORS_SUCCESS,
    SPONSORS_FAIL,
    SPONSOR_ADD_REQUEST,
    SPONSOR_ADD_SUCCESS,
    SPONSOR_ADD_FAIL,
    SPONSOR_DETAILS_REQUEST,
    SPONSOR_DETAILS_SUCCESS,
    SPONSOR_DETAILS_FAIL,
    SPONSOR_UPDATE_REQUEST,
    SPONSOR_UPDATE_SUCCESS,
    SPONSOR_UPDATE_FAIL,
    SPONSOR_DELETE_REQUEST,
    SPONSOR_DELETE_SUCCESS,
    SPONSOR_DELETE_FAIL,
    CLEAR_ERROR
} from '../../Constants/Entity/sponsorConstants';

const sponsorURL = "http://localhost:8080/api/v1/soccer-management/sponsor";
const config = {
    headers: {
        'Authorization': 'Basic ' + btoa('Manager:ManagerPassword')
    }
}
//Get one
export const getSponsorRequest = (id) => async (dispatch) => {
    try {

        dispatch({ type: SPONSOR_DETAILS_REQUEST })

        const { data } = await axios.get(sponsorURL + `/read/${id}`, config)

        dispatch({
            type: SPONSOR_DETAILS_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: SPONSOR_DETAILS_FAIL,
            payload: error
        });
    }
};


// Create / POST
export const postSponsorRequest = (isUpdate, sponsorData) => async (dispatch) => {
    try {

        dispatch({ type: isUpdate ? SPONSOR_UPDATE_REQUEST : SPONSOR_ADD_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa('Manager:ManagerPassword')
            }
        }

        const { data } = await axios.post(sponsorURL + `/save`, sponsorData, config)

        dispatch({
            type: isUpdate ? SPONSOR_UPDATE_SUCCESS : SPONSOR_ADD_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: isUpdate ? SPONSOR_ADD_FAIL : SPONSOR_UPDATE_FAIL,
            payload: error
        });
    }
};

//Delete
export const deleteSponsorRequest = (id) => async (dispatch) => {
    try {

        dispatch({ type: SPONSOR_DELETE_REQUEST });

        const { data } = await axios.delete(sponsorURL + `/delete/${id}`, config)

        dispatch({
            type: SPONSOR_DELETE_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: SPONSOR_DELETE_FAIL,
            payload: error.response
        });
    }
}

//Get All
export const getAllSponsorsRequest = () => async (dispatch) => {
    try {

        dispatch({ type: SPONSORS_REQUEST })

        const { data: sponsors } = await axios.get(sponsorURL + `/all`, config);

        await dispatch({
            type: SPONSORS_SUCCESS,
            payload: sponsors
        });

    } catch (error) {
        dispatch({
            type: SPONSORS_FAIL,
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
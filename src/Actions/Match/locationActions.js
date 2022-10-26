import axios from 'axios';
import { 
    LOCATIONS_REQUEST,
    LOCATIONS_SUCCESS,
    LOCATIONS_FAIL,
    LOCATION_ADD_REQUEST,
    LOCATION_ADD_SUCCESS,
    LOCATION_ADD_FAIL,
    LOCATION_DETAILS_REQUEST,
    LOCATION_DETAILS_SUCCESS,
    LOCATION_DETAILS_FAIL,
    LOCATION_UPDATE_REQUEST,
    LOCATION_UPDATE_SUCCESS,
    LOCATION_UPDATE_FAIL,
    LOCATION_DELETE_REQUEST,
    LOCATION_DELETE_SUCCESS,
    LOCATION_DELETE_FAIL,
    CLEAR_ERROR
} from '../../Constants/Match/locationConstants';

const locationURL = "http://localhost:8080/api/v1/soccer-management/location";
const config = {
    headers: {
        'Authorization': 'Basic ' + btoa('Manager:ManagerPassword')
    }
}
//Get one
export const getLocationRequest = (id) => async (dispatch) => {
    try {

        dispatch({ type: LOCATION_DETAILS_REQUEST })

        const { data } = await axios.get(locationURL + `/read/${id}`, config)

        dispatch({
            type: LOCATION_DETAILS_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: LOCATION_DETAILS_FAIL,
            payload: error
        });
    }
};


// Create / POST
export const postLocationRequest = (locationData) => async (dispatch) => {
    try {

        dispatch({ type: LOCATION_ADD_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa('Manager:ManagerPassword')
            }
        }

        const { data } = await axios.post(locationURL + `/save`, locationData, config)

        dispatch({
            type: LOCATION_ADD_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: LOCATION_ADD_FAIL,
            payload: error
        });
    }
};

//Update Request
export const updateLocationRequest = (id, locationData) => async (dispatch) => {
    try {

        dispatch({ type:  LOCATION_UPDATE_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa('Manager:ManagerPassword')
            }
        }

        const { data } = await axios.post(locationURL + `/save`, locationData, config)

        dispatch({
            type: LOCATION_UPDATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: LOCATION_UPDATE_FAIL,
            payload: error.message
        })
    }
};

//Delete
export const deleteLocationRequest = (id) => async (dispatch) => {
    try {

        dispatch({ type: LOCATION_DELETE_REQUEST })

        const { data } = await axios.delete(locationURL + `/delete/${id}`, config)

        dispatch({
            type: LOCATION_DELETE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: LOCATION_DELETE_FAIL,
            payload: error.response
        })
    }
}

//Get All
export const getAllLocationshRequest = () => async (dispatch) => {
    try {

        dispatch({ type: LOCATIONS_REQUEST })

        const { data: locations } = await axios.get(locationURL + `/all`, config);

        await dispatch({
            type: LOCATIONS_SUCCESS,
            payload: locations
        });

    } catch (error) {
        dispatch({
            type: LOCATIONS_FAIL,
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
import axios from 'axios';
import {
    CLUBS_REQUEST,
    CLUBS_SUCCESS,
    CLUBS_FAIL,
    CLUB_ADD_REQUEST,
    CLUB_ADD_SUCCESS,
    CLUB_ADD_FAIL,
    CLUB_DETAILS_REQUEST,
    CLUB_DETAILS_SUCCESS,
    CLUB_DETAILS_FAIL,
    CLUB_UPDATE_REQUEST,
    CLUB_UPDATE_SUCCESS,
    CLUB_UPDATE_FAIL,
    CLUB_DELETE_REQUEST,
    CLUB_DELETE_SUCCESS,
    CLUB_DELETE_FAIL,
    CLEAR_ERROR
} from '../../Constants/Club/clubConstants';

const clubURL = "http://localhost:8080/api/v1/soccer-management/club";
const config = {
    headers: {
        'Authorization': 'Basic ' + btoa('Manager:ManagerPassword')
    }
}

//Get one
export const getClubRequest = (id) => async (dispatch) => {
    try {

        dispatch({ type: CLUB_DETAILS_REQUEST })

        const { data } = await axios.get(clubURL + `/read/${id}`, config)

        dispatch({
            type: CLUB_DETAILS_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: CLUB_DETAILS_FAIL,
            payload: error
        });
    }
};


// Create / POST
export const postClubRequest = (clubData) => async (dispatch) => {
    try {

        dispatch({ type: CLUB_ADD_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa('Manager:ManagerPassword')
            }
        }

        const { data } = await axios.post(clubURL + `/save`, clubData, config)

        dispatch({
            type: CLUB_ADD_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: CLUB_ADD_FAIL,
            payload: error
        });
    }
};

//Update Request
export const updateClubRequest = (clubData) => async (dispatch) => {
    try {

        dispatch({ type:  CLUB_UPDATE_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa('Manager:ManagerPassword')
            }
        }

        const { data } = await axios.post(clubURL + `/save`, clubData, config)

        dispatch({
            type: CLUB_UPDATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: CLUB_UPDATE_FAIL,
            payload: error.message
        })
    }
};

//Delete
export const deleteClubRequest = (id) => async (dispatch) => {
    try {

        dispatch({ type: CLUB_DELETE_REQUEST })

        const { data } = await axios.delete(clubURL + `/delete/${id}`, config)

        dispatch({
            type: CLUB_DELETE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: CLUB_DELETE_FAIL,
            payload: error.response
        })
    }
}

//Get All
export const getAllClubsRequest = () => async (dispatch) => {
    try {

        dispatch({ type: CLUBS_REQUEST })

        const { data: clubs } = await axios.get(clubURL + `/all`, config);

        await dispatch({
            type: CLUBS_SUCCESS,
            payload: clubs
        });

    } catch (error) {
        dispatch({
            type: CLUBS_FAIL,
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
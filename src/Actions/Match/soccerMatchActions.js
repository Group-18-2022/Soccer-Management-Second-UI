import axios from 'axios';
import { 
    SOCCER_MATCHES_REQUEST,
    SOCCER_MATCHES_SUCCESS,
    SOCCER_MATCHES_FAIL,
    SOCCER_MATCH_ADD_REQUEST,
    SOCCER_MATCH_ADD_SUCCESS,
    SOCCER_MATCH_ADD_FAIL,
    SOCCER_MATCH_DELETE_REQUEST,
    SOCCER_MATCH_DELETE_SUCCESS,
    SOCCER_MATCH_DELETE_FAIL,
    SOCCER_MATCH_UPDATE_REQUEST,
    SOCCER_MATCH_UPDATE_SUCCESS,
    SOCCER_MATCH_UPDATE_FAIL,
    SOCCER_MATCH_DETAILS_REQUEST,
    SOCCER_MATCH_DETAILS_SUCCESS,
    SOCCER_MATCH_DETAILS_FAIL,
    CLEAR_ERROR
} from '../../Constants/Match/soccerMatchConstants';

const soccerMatchURL = "http://localhost:8080/api/v1/soccer-management/match";
const config = {
    headers: {
        'Authorization': 'Basic ' + btoa('Manager:ManagerPassword')
    }
}
//Get one Match
export const getSoccerMatchRequest = (id) => async (dispatch) => {
    try {

        dispatch({ type: SOCCER_MATCH_DETAILS_REQUEST })

        const { data } = await axios.get(soccerMatchURL + `/read/${id}`, config)

        dispatch({
            type: SOCCER_MATCH_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: SOCCER_MATCH_DETAILS_FAIL,
            payload: error
        })
    }
};


// Creat a new match 
export const postSoccerMatchRequest = (isUpdate, soccerMatchData) => async (dispatch) => {
    try {

        dispatch({ type: isUpdate ? SOCCER_MATCH_UPDATE_REQUEST : SOCCER_MATCH_ADD_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa('Manager:ManagerPassword')
            }
        }

        const { data } = await axios.post(soccerMatchURL + `/save`, soccerMatchData, config)

        dispatch({
            type: isUpdate ? SOCCER_MATCH_UPDATE_SUCCESS : SOCCER_MATCH_ADD_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: isUpdate ? SOCCER_MATCH_UPDATE_FAIL : SOCCER_MATCH_ADD_FAIL,
            payload: error
        })
    }
};

//Delete
export const deleteSoccerMatchRequest = (id) => async (dispatch) => {
    try {

        dispatch({ type: SOCCER_MATCH_DELETE_REQUEST })

        const { data } = await axios.delete(soccerMatchURL + `/delete/${id}`, config)

        dispatch({
            type: SOCCER_MATCH_DELETE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: SOCCER_MATCH_DELETE_FAIL,
            payload: error.response
        })
    }
}

//Get All
export const getAllSoccerMatchRequst = () => async (dispatch) => {
    try {

        dispatch({ type: SOCCER_MATCHES_REQUEST })

        const { data: matches } = await axios.get(soccerMatchURL + `/all`, config);

        await dispatch({
            type: SOCCER_MATCHES_SUCCESS,
            payload: matches
        });

    } catch (error) {
        dispatch({
            type: SOCCER_MATCHES_FAIL,
            payload: error.response
        });
    }
};

//Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERROR
    })
}
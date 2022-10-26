import axios from 'axios';
import { 
    MATCH_SCORES_REQUEST,
    MATCH_SCORES_SUCCESS,
    MATCH_SCORES_FAIL,
    MATCH_SCORE_ADD_REQUEST,
    MATCH_SCORE_ADD_SUCCESS,
    MATCH_SCORE_ADD_FAIL,
    MATCH_SCORE_DETAILS_REQUEST,
    MATCH_SCORE_DETAILS_SUCCESS,
    MATCH_SCORE_DETAILS_FAIL,
    MATCH_SCORE_UPDATE_REQUEST,
    MATCH_SCORE_UPDATE_SUCCESS,
    MATCH_SCORE_UPDATE_FAIL,
    MATCH_SCORE_DELETE_REQUEST,
    MATCH_SCORE_DELETE_SUCCESS,
    MATCH_SCORE_DELETE_FAIL,
    CLEAR_ERROR
} from '../../Constants/Match/matchScoreConstants';

const matchScoreURL = "http://localhost:8080/api/v1/soccer-management/matchScore";
const config = {
    headers: {
        'Authorization': 'Basic ' + btoa('Manager:ManagerPassword')
    }
}
//Get one
export const getMatchScoreRequest = (id) => async (dispatch) => {
    try {

        dispatch({ type: MATCH_SCORE_DETAILS_REQUEST })

        const { data } = await axios.get(matchScoreURL + `/read/${id}`, config);

        dispatch({
            type: MATCH_SCORE_DETAILS_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: MATCH_SCORE_DETAILS_FAIL,
            payload: error
        });
    }
};


// Create / POST
export const postMatchScoreRequest = (isUpdate, matchScoreData) => async (dispatch) => {
    try {

        dispatch({ type: isUpdate ? MATCH_SCORE_UPDATE_REQUEST : MATCH_SCORE_ADD_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa('Manager:ManagerPassword')
            }
        }

        const { data } = await axios.post(matchScoreURL + `/save`, matchScoreData, config)

        dispatch({
            type: isUpdate ? MATCH_SCORE_UPDATE_SUCCESS : MATCH_SCORE_ADD_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: isUpdate ? MATCH_SCORE_UPDATE_FAIL : MATCH_SCORE_ADD_FAIL,
            payload: error.response
        });
    }
};

//Delete
export const deleteMatchScoreRequest = (id) => async (dispatch) => {
    try {

        dispatch({ type: MATCH_SCORE_DELETE_REQUEST })

        const { data } = await axios.delete(matchScoreURL + `/delete/${id}`, config)

        dispatch({
            type: MATCH_SCORE_DELETE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: MATCH_SCORE_DELETE_FAIL,
            payload: error.response
        })
    }
}

//Get All
export const getAllMatchScoresRequest = () => async (dispatch) => {
    try {

        dispatch({ type: MATCH_SCORES_REQUEST })

        const { data: locations } = await axios.get(matchScoreURL + `/all`, config);

        await dispatch({
            type: MATCH_SCORES_SUCCESS,
            payload: locations
        });

    } catch (error) {
        dispatch({
            type: MATCH_SCORES_FAIL,
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
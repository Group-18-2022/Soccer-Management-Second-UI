import axios from 'axios';
import {
    TEAMS_REQUEST,
    TEAMS_SUCCESS,
    TEAMS_FAIL,
    TEAM_ADD_REQUEST,
    TEAM_ADD_SUCCESS,
    TEAM_ADD_FAIL,
    TEAM_DETAILS_REQUEST,
    TEAM_DETAILS_SUCCESS,
    TEAM_DETAILS_FAIL,
    TEAM_UPDATE_REQUEST,
    TEAM_UPDATE_SUCCESS,
    TEAM_UPDATE_FAIL,
    TEAM_DELETE_REQUEST,
    TEAM_DELETE_SUCCESS,
    TEAM_DELETE_FAIL,
    CLEAR_ERROR
} from '../../Constants/Team/teamConstants';

const teamURL = "http://localhost:8080/api/v1/soccer-management/team";
const config = {
    headers: {
        'Authorization': 'Basic ' + btoa('Manager:ManagerPassword')
    }
}
//Get one
export const getTeamRequest = (id) => async (dispatch) => {
    try {

        dispatch({ type: TEAM_DETAILS_REQUEST })

        const { data } = await axios.get(teamURL + `/read/${id}`, config)

        dispatch({
            type: TEAM_DETAILS_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: TEAM_DETAILS_FAIL,
            payload: error
        });
    }
};


// Create / POST
export const postTeamRequest = (isUpdate, teamData) => async (dispatch) => {
    try {

        dispatch({ type: isUpdate ? TEAM_UPDATE_REQUEST : TEAM_ADD_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa('Manager:ManagerPassword')
            }
        }

        const { data } = await axios.post(teamURL + `/save`, teamData, config)

        dispatch({
            type: isUpdate ? TEAM_UPDATE_SUCCESS : TEAM_ADD_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: isUpdate ? TEAM_UPDATE_FAIL : TEAM_ADD_FAIL,
            payload: error
        });
    }
};

//Delete
export const deleteTeamRequest = (id) => async (dispatch) => {
    try {

        dispatch({ type: TEAM_DELETE_REQUEST })

        const { data } = await axios.delete(teamURL + `/delete/${id}`, config)

        dispatch({
            type: TEAM_DELETE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: TEAM_DELETE_FAIL,
            payload: error.response
        })
    }
}

//Get All
export const getAllTeamsRequest = () => async (dispatch) => {
    try {

        dispatch({ type: TEAMS_REQUEST })

        const { data: teams } = await axios.get(teamURL + `/all`, config);

        await dispatch({
            type: TEAMS_SUCCESS,
            payload: teams
        });

    } catch (error) {
        dispatch({
            type: TEAMS_FAIL,
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
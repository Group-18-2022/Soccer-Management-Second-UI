import axios from 'axios';
import {
    TEAM_STATISTICS_REQUEST,
    TEAM_STATISTICS_SUCCESS,
    TEAM_STATISTICS_FAIL,
    TEAM_STATISTIC_ADD_REQUEST,
    TEAM_STATISTIC_ADD_SUCCESS,
    TEAM_STATISTIC_ADD_FAIL,
    TEAM_STATISTIC_DETAILS_REQUEST,
    TEAM_STATISTIC_DETAILS_SUCCESS,
    TEAM_STATISTIC_DETAILS_FAIL,
    TEAM_STATISTIC_UPDATE_REQUEST,
    TEAM_STATISTIC_UPDATE_SUCCESS,
    TEAM_STATISTIC_UPDATE_FAIL,
    TEAM_STATISTIC_DELETE_REQUEST,
    TEAM_STATISTIC_DELETE_SUCCESS,
    TEAM_STATISTIC_DELETE_FAIL,
    CLEAR_ERROR
} from '../../Constants/Team/teamStatisticsConstants';

const teamStatisticsURL = "http://localhost:8080/api/v1/soccer-management/team-statistics";
const config = {
    headers: {
        'Authorization': 'Basic ' + btoa('Manager:ManagerPassword')
    }
}
//Get one
export const getTeamStatisticRequest = (id) => async (dispatch) => {
    try {

        dispatch({ type: TEAM_STATISTIC_DETAILS_REQUEST })

        const { data } = await axios.get(teamStatisticsURL + `/read/${id}`, config)

        dispatch({
            type: TEAM_STATISTIC_DETAILS_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: TEAM_STATISTIC_DETAILS_FAIL,
            payload: error
        });
    }
};


// Create / POST
export const postTeamStatisticRequest = (isUpdate, teamStatisticsData) => async (dispatch) => {
    try {

        dispatch({ type: isUpdate ? TEAM_STATISTIC_UPDATE_REQUEST : TEAM_STATISTIC_ADD_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa('Manager:ManagerPassword')
            }
        }

        const { data } = await axios.post(teamStatisticsURL + `/save`, teamStatisticsData, config)

        dispatch({
            type: isUpdate ? TEAM_STATISTIC_UPDATE_SUCCESS : TEAM_STATISTIC_ADD_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: isUpdate ? TEAM_STATISTIC_UPDATE_FAIL : TEAM_STATISTIC_ADD_FAIL,
            payload: error
        });
    }
};

//Delete
export const deleteTeamStatisticRequest = (id) => async (dispatch) => {
    try {

        dispatch({ type: TEAM_STATISTIC_DELETE_REQUEST })

        const { data } = await axios.delete(teamStatisticsURL + `/delete/${id}`, config)

        dispatch({
            type: TEAM_STATISTIC_DELETE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: TEAM_STATISTIC_DELETE_FAIL,
            payload: error.response
        })
    }
}

//Get All
export const getAllTeamStatisticsRequest = () => async (dispatch) => {
    try {

        dispatch({ type: TEAM_STATISTICS_REQUEST })

        const { data: teamStatistics } = await axios.get(teamStatisticsURL + `/all`, config);

        await dispatch({
            type: TEAM_STATISTICS_SUCCESS,
            payload: teamStatistics
        });

    } catch (error) {
        dispatch({
            type: TEAM_STATISTICS_FAIL,
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
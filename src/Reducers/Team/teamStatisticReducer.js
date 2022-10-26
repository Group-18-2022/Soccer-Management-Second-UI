import {
    TEAM_STATISTICS_REQUEST,
    TEAM_STATISTICS_SUCCESS,
    TEAM_STATISTICS_FAIL,
    TEAM_STATISTIC_ADD_REQUEST,
    TEAM_STATISTIC_ADD_SUCCESS,
    TEAM_STATISTIC_ADD_FAIL,
    TEAM_STATISTIC_ADD_RESET,
    TEAM_STATISTIC_DETAILS_REQUEST,
    TEAM_STATISTIC_DETAILS_SUCCESS,
    TEAM_STATISTIC_DETAILS_FAIL,
    TEAM_STATISTIC_UPDATE_REQUEST,
    TEAM_STATISTIC_UPDATE_SUCCESS,
    TEAM_STATISTIC_UPDATE_FAIL,
    TEAM_STATISTIC_UPDATE_RESET,
    TEAM_STATISTIC_DELETE_REQUEST,
    TEAM_STATISTIC_DELETE_SUCCESS,
    TEAM_STATISTIC_DELETE_FAIL,
    TEAM_STATISTIC_DELETE_RESET,
    CLEAR_ERROR
} from '../../Constants/Team/teamStatisticsConstants';

//Get All teamStatistics Reducer
export const teamStatisticsReducer = (state = { teamStatistics: [] }, action) => {
    switch (action.type) {
        case TEAM_STATISTICS_REQUEST:
            return {
                loading: true,
                teamStatistics: []
            }

        case TEAM_STATISTICS_SUCCESS:
            return {
                loading: false,
                teamStatistics: action.payload,
            }

        case TEAM_STATISTICS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
};

//Create Reducer 
export const newTeamStatisticReducer = (state = { teamStatistic: {} }, action) => {
    switch (action.type) {
        case TEAM_STATISTIC_ADD_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case TEAM_STATISTIC_ADD_SUCCESS:
            return {
                loading: false,
                success: action.payload != null ? true : false,
                teamStatistic: action.payload
            }
        case TEAM_STATISTIC_ADD_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case TEAM_STATISTIC_ADD_RESET:
            return {
                ...state,
                success: false
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
};

//DELETE & UPDATE Reducer
export const teamStatisticReducer = (state = {}, action) => {
    switch (action.type) {
        case TEAM_STATISTIC_DELETE_REQUEST:
        case TEAM_STATISTIC_UPDATE_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case TEAM_STATISTIC_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        case TEAM_STATISTIC_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case TEAM_STATISTIC_DELETE_FAIL:
        case TEAM_STATISTIC_UPDATE_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case TEAM_STATISTIC_DELETE_RESET:
            return {
                ...state,
                isDeleted: false
            }
        case TEAM_STATISTIC_UPDATE_RESET:
            return {
                ...state,
                isUpdated: false
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
};

//Read one reducer
export const teamStatisticDetailsReducer = (state = { teamStatistic: {} }, action) => {
    switch (action.type) {
        case TEAM_STATISTIC_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case TEAM_STATISTIC_DETAILS_SUCCESS:
            return {
                loading: false,
                teamStatistic: action.payload
            }
        case TEAM_STATISTIC_DETAILS_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
};
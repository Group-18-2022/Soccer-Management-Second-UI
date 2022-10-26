import {
    TEAMS_REQUEST,
    TEAMS_SUCCESS,
    TEAMS_FAIL,
    TEAM_ADD_REQUEST,
    TEAM_ADD_SUCCESS,
    TEAM_ADD_FAIL,
    TEAM_ADD_RESET,
    TEAM_DETAILS_REQUEST,
    TEAM_DETAILS_SUCCESS,
    TEAM_DETAILS_FAIL,
    TEAM_UPDATE_REQUEST,
    TEAM_UPDATE_SUCCESS,
    TEAM_UPDATE_FAIL,
    TEAM_UPDATE_RESET,
    TEAM_DELETE_REQUEST,
    TEAM_DELETE_SUCCESS,
    TEAM_DELETE_FAIL,
    TEAM_DELETE_RESET,
    CLEAR_ERROR
} from '../../Constants/Team/teamConstants';

//Get All team Reducer
export const teamsReducer = (state = { teams: [] }, action) => {
    switch (action.type) {
        case TEAMS_REQUEST:
            return {
                loading: true,
                teams: []
            }

        case TEAMS_SUCCESS:
            return {
                loading: false,
                teams: action.payload,
            }

        case TEAMS_FAIL:
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
export const newTeamReducer = (state = { team: {} }, action) => {
    switch (action.type) {
        case TEAM_ADD_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case TEAM_ADD_SUCCESS:
            return {
                loading: false,
                success: action.payload != null ? true : false,
                team: action.payload
            }
        case TEAM_ADD_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case TEAM_ADD_RESET:
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
export const teamReducer = (state = {}, action) => {
    switch (action.type) {
        case TEAM_DELETE_REQUEST:
        case TEAM_UPDATE_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case TEAM_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        case TEAM_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case TEAM_DELETE_FAIL:
        case TEAM_UPDATE_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case TEAM_DELETE_RESET:
            return {
                ...state,
                isDeleted: false
            }
        case TEAM_UPDATE_RESET:
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
export const teamDetailsReducer = (state = { team: {} }, action) => {
    switch (action.type) {
        case TEAM_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case TEAM_DETAILS_SUCCESS:
            return {
                loading: false,
                team: action.payload
            }
        case TEAM_DETAILS_FAIL:
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
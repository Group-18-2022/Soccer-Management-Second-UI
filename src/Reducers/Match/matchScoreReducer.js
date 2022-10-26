import { 
    MATCH_SCORES_REQUEST,
    MATCH_SCORES_SUCCESS,
    MATCH_SCORES_FAIL,
    MATCH_SCORE_ADD_REQUEST,
    MATCH_SCORE_ADD_SUCCESS,
    MATCH_SCORE_ADD_FAIL,
    MATCH_SCORE_ADD_RESET,
    MATCH_SCORE_DETAILS_REQUEST,
    MATCH_SCORE_DETAILS_SUCCESS,
    MATCH_SCORE_DETAILS_FAIL,
    MATCH_SCORE_UPDATE_REQUEST,
    MATCH_SCORE_UPDATE_SUCCESS,
    MATCH_SCORE_UPDATE_FAIL,
    MATCH_SCORE_UPDATE_RESET,
    MATCH_SCORE_DELETE_REQUEST,
    MATCH_SCORE_DELETE_SUCCESS,
    MATCH_SCORE_DELETE_FAIL,
    MATCH_SCORE_DELETE_RESET,
    CLEAR_ERROR
} from '../../Constants/Match/matchScoreConstants';

//Get All Locations Reducer
export const matchScoresReducer = (state = { matchScores: [] }, action) => {
    switch (action.type) {
        case MATCH_SCORES_REQUEST:
            return {
                loading: true,
                matchScores: []
            }

        case MATCH_SCORES_SUCCESS:
            return {
                loading: false,
                matchScores: action.payload,
            }

        case MATCH_SCORES_FAIL:
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
export const newMatchScoreReducer = (state = { matchScore: {} }, action) => {
    switch(action.type) {
        case MATCH_SCORE_ADD_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case MATCH_SCORE_ADD_SUCCESS:
            return {
                loading: false,
                success: action.payload != null ? true : false,
                matchScore: action.payload
            }
        case MATCH_SCORE_ADD_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case MATCH_SCORE_ADD_RESET: 
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
export const matchScoreReducer = (state = {}, action) => {
    switch(action.type) {
        case MATCH_SCORE_DELETE_REQUEST:
        case MATCH_SCORE_UPDATE_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case MATCH_SCORE_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        case MATCH_SCORE_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case MATCH_SCORE_DELETE_FAIL:
        case MATCH_SCORE_UPDATE_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case MATCH_SCORE_DELETE_RESET: 
            return {
                ...state,
                isDeleted: false
            }
        case MATCH_SCORE_UPDATE_RESET: 
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
export const matchScoreDetailsReducer = (state = { matchScore: {} }, action) => {
    switch(action.type) {
        case MATCH_SCORE_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case MATCH_SCORE_DETAILS_SUCCESS:
            return {
                loading: false,
                matchScore: action.payload
            }
        case MATCH_SCORE_DETAILS_FAIL:
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
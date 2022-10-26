import { 
    SOCCER_MATCHES_REQUEST,
    SOCCER_MATCHES_SUCCESS,
    SOCCER_MATCHES_FAIL,
    SOCCER_MATCH_ADD_REQUEST,
    SOCCER_MATCH_ADD_SUCCESS,
    SOCCER_MATCH_ADD_FAIL,
    SOCCER_MATCH_ADD_RESET,
    SOCCER_MATCH_DELETE_REQUEST,
    SOCCER_MATCH_DELETE_SUCCESS,
    SOCCER_MATCH_DELETE_FAIL,
    SOCCER_MATCH_DELETE_RESET,
    SOCCER_MATCH_UPDATE_REQUEST,
    SOCCER_MATCH_UPDATE_SUCCESS,
    SOCCER_MATCH_UPDATE_FAIL,
    SOCCER_MATCH_UPDATE_RESET,
    SOCCER_MATCH_DETAILS_REQUEST,
    SOCCER_MATCH_DETAILS_SUCCESS,
    SOCCER_MATCH_DETAILS_FAIL,
    CLEAR_ERROR
} from '../../Constants/Match/soccerMatchConstants';

//Get All Soccer Matches Reducer
export const soccerMatchesReducer = (state = { matches: [] }, action) => {
    switch (action.type) {
        case SOCCER_MATCHES_REQUEST:
            return {
                loading: true,
                matches: []
            }

        case SOCCER_MATCHES_SUCCESS:
            return {
                loading: false,
                matches: action.payload,
            }

        case SOCCER_MATCHES_FAIL:
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
export const newSoccerMatchReducer = (state = { match: {} }, action) => {
    switch(action.type) {
        case SOCCER_MATCH_ADD_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case SOCCER_MATCH_ADD_SUCCESS:
            return {
                loading: false,
                success: action.payload != null ? true : false,
                match: action.payload
            }
        case SOCCER_MATCH_ADD_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case SOCCER_MATCH_ADD_RESET: 
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
export const matchReducer = (state = {}, action) => {
    switch(action.type) {
        case SOCCER_MATCH_DELETE_REQUEST:
        case SOCCER_MATCH_UPDATE_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case SOCCER_MATCH_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        case SOCCER_MATCH_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case SOCCER_MATCH_DELETE_FAIL:
        case SOCCER_MATCH_UPDATE_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case SOCCER_MATCH_DELETE_RESET: 
            return {
                ...state,
                isDeleted: false
            }
        case SOCCER_MATCH_UPDATE_RESET: 
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

export const soccerMatchDetailsReducer = (state = {match: {} }, action) => {
    switch(action.type) {
        case SOCCER_MATCH_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case SOCCER_MATCH_DETAILS_SUCCESS:
            return {
                loading: false,
                match: action.payload
            }
        case SOCCER_MATCH_DETAILS_FAIL:
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
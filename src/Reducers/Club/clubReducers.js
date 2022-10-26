import {
    CLUBS_REQUEST,
    CLUBS_SUCCESS,
    CLUBS_FAIL,
    CLUB_ADD_REQUEST,
    CLUB_ADD_SUCCESS,
    CLUB_ADD_FAIL,
    CLUB_ADD_RESET,
    CLUB_DETAILS_REQUEST,
    CLUB_DETAILS_SUCCESS,
    CLUB_DETAILS_FAIL,
    CLUB_UPDATE_REQUEST,
    CLUB_UPDATE_SUCCESS,
    CLUB_UPDATE_FAIL,
    CLUB_UPDATE_RESET,
    CLUB_DELETE_REQUEST,
    CLUB_DELETE_SUCCESS,
    CLUB_DELETE_FAIL,
    CLUB_DELETE_RESET,
    CLEAR_ERROR
} from '../../Constants/Club/clubConstants';

//Get All club Reducer
export const clubsReducer = (state = { clubs: [] }, action) => {
    switch (action.type) {
        case CLUBS_REQUEST:
            return {
                loading: true,
                clubs: []
            }

        case CLUBS_SUCCESS:
            return {
                loading: false,
                clubs: action.payload,
            }

        case CLUBS_FAIL:
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
export const newClubReducer = (state = { club: {} }, action) => {
    switch (action.type) {
        case CLUB_ADD_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case CLUB_ADD_SUCCESS:
            return {
                loading: false,
                success: action.payload != null ? true : false,
                club: action.payload
            }
        case CLUB_ADD_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case CLUB_ADD_RESET:
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
export const clubReducer = (state = {}, action) => {
    switch (action.type) {
        case CLUB_DELETE_REQUEST:
        case CLUB_UPDATE_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case CLUB_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        case CLUB_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case CLUB_DELETE_FAIL:
        case CLUB_UPDATE_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case CLUB_DELETE_RESET:
            return {
                ...state,
                isDeleted: false
            }
        case CLUB_UPDATE_RESET:
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
export const clubDetailsReducer = (state = { club: {} }, action) => {
    switch (action.type) {
        case CLUB_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case CLUB_DETAILS_SUCCESS:
            return {
                loading: false,
                club: action.payload
            }
        case CLUB_DETAILS_FAIL:
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
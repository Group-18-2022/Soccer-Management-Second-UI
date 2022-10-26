import { 
    SPONSORS_REQUEST,
    SPONSORS_SUCCESS,
    SPONSORS_FAIL,
    SPONSOR_ADD_REQUEST,
    SPONSOR_ADD_SUCCESS,
    SPONSOR_ADD_FAIL,
    SPONSOR_ADD_RESET,
    SPONSOR_DETAILS_REQUEST,
    SPONSOR_DETAILS_SUCCESS,
    SPONSOR_DETAILS_FAIL,
    SPONSOR_UPDATE_REQUEST,
    SPONSOR_UPDATE_SUCCESS,
    SPONSOR_UPDATE_FAIL,
    SPONSOR_UPDATE_RESET,
    SPONSOR_DELETE_REQUEST,
    SPONSOR_DELETE_SUCCESS,
    SPONSOR_DELETE_FAIL,
    SPONSOR_DELETE_RESET,
    CLEAR_ERROR
} from '../../Constants/Entity/sponsorConstants';

export const sponsorsReducer = (state = { sponsors: [] }, action) => {
    switch (action.type) {
        case SPONSORS_REQUEST:
            return {
                loading: true,
                sponsors: []
            }

        case SPONSORS_SUCCESS:
            return {
                loading: false,
                sponsors: action.payload,
            }

        case SPONSORS_FAIL:
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
export const newSponsorReducer = (state = { sponsor: {} }, action) => {
    switch(action.type) {
        case SPONSOR_ADD_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case SPONSOR_ADD_SUCCESS:
            return {
                loading: false,
                success: action.payload,
                sponsor: action.payload
            }
        case SPONSOR_ADD_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case SPONSOR_ADD_RESET: 
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
export const sponsorReducer = (state = {}, action) => {
    switch(action.type) {
        case SPONSOR_DELETE_REQUEST:
        case SPONSOR_UPDATE_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case SPONSOR_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        case SPONSOR_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case SPONSOR_UPDATE_FAIL:
        case SPONSOR_DELETE_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case SPONSOR_DELETE_RESET: 
            return {
                ...state,
                isDeleted: false
            }
        case SPONSOR_UPDATE_RESET: 
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
export const sponsorDetailsReducer = (state = { sponsor: {} }, action) => {
    switch(action.type) {
        case SPONSOR_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case SPONSOR_DETAILS_SUCCESS:
            return {
                loading: false,
                sponsor: action.payload
            }
        case SPONSOR_DETAILS_FAIL:
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
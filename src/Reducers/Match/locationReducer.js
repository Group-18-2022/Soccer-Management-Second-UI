import { 
    LOCATIONS_REQUEST,
    LOCATIONS_SUCCESS,
    LOCATIONS_FAIL,
    LOCATION_ADD_REQUEST,
    LOCATION_ADD_SUCCESS,
    LOCATION_ADD_FAIL,
    LOCATION_ADD_RESET,
    LOCATION_DETAILS_REQUEST,
    LOCATION_DETAILS_SUCCESS,
    LOCATION_DETAILS_FAIL,
    LOCATION_UPDATE_REQUEST,
    LOCATION_UPDATE_SUCCESS,
    LOCATION_UPDATE_FAIL,
    LOCATION_UPDATE_RESET,
    LOCATION_DELETE_REQUEST,
    LOCATION_DELETE_SUCCESS,
    LOCATION_DELETE_FAIL,
    LOCATION_DELETE_RESET,
    CLEAR_ERROR
} from '../../Constants/Match/locationConstants';

//Get All Locations Reducer
export const locationsReducer = (state = { locations: [] }, action) => {
    switch (action.type) {
        case LOCATIONS_REQUEST:
            return {
                loading: true,
                locations: []
            }

        case LOCATIONS_SUCCESS:
            return {
                loading: false,
                locations: action.payload,
            }

        case LOCATIONS_FAIL:
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
export const newLocationReducer = (state = { location: {} }, action) => {
    switch(action.type) {
        case LOCATION_ADD_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case LOCATION_ADD_SUCCESS:
            return {
                loading: false,
                success: action.payload != null ? true : false,
                location: action.payload
            }
        case LOCATION_ADD_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case LOCATION_ADD_RESET: 
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
export const locationReducer = (state = {}, action) => {
    switch(action.type) {
        case LOCATION_DELETE_REQUEST:
        case LOCATION_UPDATE_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case LOCATION_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        case LOCATION_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case LOCATION_DELETE_FAIL:
        case LOCATION_UPDATE_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case LOCATION_DELETE_RESET: 
            return {
                ...state,
                isDeleted: false
            }
        case LOCATION_UPDATE_RESET: 
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
export const locationDetailsReducer = (state = { location: {} }, action) => {
    switch(action.type) {
        case LOCATION_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case LOCATION_DETAILS_SUCCESS:
            return {
                loading: false,
                location: action.payload
            }
        case LOCATION_DETAILS_FAIL:
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
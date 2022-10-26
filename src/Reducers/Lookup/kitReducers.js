import { 
    KITS_REQUEST,
    KITS_SUCCESS,
    KITS_FAIL,
    KIT_ADD_REQUEST,
    KIT_ADD_SUCCESS,
    KIT_ADD_FAIL,
    KIT_ADD_RESET,
    KIT_DETAILS_REQUEST,
    KIT_DETAILS_SUCCESS,
    KIT_DETAILS_FAIL,
    KIT_UPDATE_REQUEST,
    KIT_UPDATE_SUCCESS,
    KIT_UPDATE_FAIL,
    KIT_UPDATE_RESET,
    KIT_DELETE_REQUEST,
    KIT_DELETE_SUCCESS,
    KIT_DELETE_FAIL,
    KIT_DELETE_RESET,
    CLEAR_ERROR
} from '../../Constants/Lookup/kitConstants';

//Get All Kits Reducer
export const kitsReducer = (state = { kits: [] }, action) => {
    switch (action.type) {
        case KITS_REQUEST:
            return {
                loading: true,
                kits: []
            }

        case KITS_SUCCESS:
            return {
                loading: false,
                kits: action.payload,
            }

        case KITS_FAIL:
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
export const newKitReducer = (state = { kit: {} }, action) => {
    switch(action.type) {
        case KIT_ADD_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case KIT_ADD_SUCCESS:
            return {
                loading: false,
                success: action.payload != null ? true : false,
                kit: action.payload
            }
        case KIT_ADD_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case KIT_ADD_RESET: 
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
export const kitReducer = (state = {}, action) => {
    switch(action.type) {
        case KIT_DELETE_REQUEST:
        case KIT_UPDATE_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case KIT_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        case KIT_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case KIT_DELETE_FAIL:
        case KIT_UPDATE_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case KIT_DELETE_RESET: 
            return {
                ...state,
                isDeleted: false
            }
        case KIT_UPDATE_RESET: 
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
export const kitDetailsReducer = (state = { kit: {} }, action) => {
    switch(action.type) {
        case KIT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case KIT_DETAILS_SUCCESS:
            return {
                loading: false,
                kit: action.payload
            }
        case KIT_DETAILS_FAIL:
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
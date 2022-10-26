import {
    CONTACT_INFORMATIONS_REQUEST,
    CONTACT_INFORMATIONS_SUCCESS,
    CONTACT_INFORMATIONS_FAIL,
    CONTACT_INFORMATION_ADD_REQUEST,
    CONTACT_INFORMATION_ADD_SUCCESS,
    CONTACT_INFORMATION_ADD_FAIL,
    CONTACT_INFORMATION_ADD_RESET,
    CONTACT_INFORMATION_DETAILS_REQUEST,
    CONTACT_INFORMATION_DETAILS_SUCCESS,
    CONTACT_INFORMATION_DETAILS_FAIL,
    CONTACT_INFORMATION_UPDATE_REQUEST,
    CONTACT_INFORMATION_UPDATE_SUCCESS,
    CONTACT_INFORMATION_UPDATE_FAIL,
    CONTACT_INFORMATION_UPDATE_RESET,
    CONTACT_INFORMATION_DELETE_REQUEST,
    CONTACT_INFORMATION_DELETE_SUCCESS,
    CONTACT_INFORMATION_DELETE_FAIL,
    CONTACT_INFORMATION_DELETE_RESET,
    CLEAR_ERROR
} from '../../Constants/Club/contactInformationConstants';

//Get All club Reducer
export const contactInformationsReducer = (state = { contactInformations: [] }, action) => {
    switch (action.type) {
        case CONTACT_INFORMATIONS_REQUEST:
            return {
                loading: true,
                contactInformations: []
            }

        case CONTACT_INFORMATIONS_SUCCESS:
            return {
                loading: false,
                contactInformations: action.payload,
            }

        case CONTACT_INFORMATIONS_FAIL:
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
export const newContactInformationReducer = (state = { contactInformation: {} }, action) => {
    switch (action.type) {
        case CONTACT_INFORMATION_ADD_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case CONTACT_INFORMATION_ADD_SUCCESS:
            return {
                loading: false,
                success: action.payload != null ? true : false,
                contactInformation: action.payload
            }
        case CONTACT_INFORMATION_ADD_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case CONTACT_INFORMATION_ADD_RESET:
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
export const contactInformationReducer = (state = {}, action) => {
    switch (action.type) {
        case CONTACT_INFORMATION_DELETE_REQUEST:
        case CONTACT_INFORMATION_UPDATE_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case CONTACT_INFORMATION_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        case CONTACT_INFORMATION_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case CONTACT_INFORMATION_DELETE_FAIL:
        case CONTACT_INFORMATION_UPDATE_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case CONTACT_INFORMATION_DELETE_RESET:
            return {
                ...state,
                isDeleted: false
            }
        case CONTACT_INFORMATION_UPDATE_RESET:
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
export const contactInformationDetailsReducer = (state = { contactInformation: {} }, action) => {
    switch (action.type) {
        case CONTACT_INFORMATION_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case CONTACT_INFORMATION_DETAILS_SUCCESS:
            return {
                loading: false,
                contactInformation: action.payload
            }
        case CONTACT_INFORMATION_DETAILS_FAIL:
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
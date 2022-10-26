import { 
    MANAGERS_REQUEST,
    MANAGERS_SUCCESS,
    MANAGERS_FAIL,
    MANAGER_ADD_REQUEST,
    MANAGER_ADD_SUCCESS,
    MANAGER_ADD_FAIL,
    MANAGER_ADD_RESET,
    MANAGER_DETAILS_REQUEST,
    MANAGER_DETAILS_SUCCESS,
    MANAGER_DETAILS_FAIL,
    MANAGER_UPDATE_REQUEST,
    MANAGER_UPDATE_SUCCESS,
    MANAGER_UPDATE_FAIL,
    MANAGER_UPDATE_RESET,
    MANAGER_DELETE_REQUEST,
    MANAGER_DELETE_SUCCESS,
    MANAGER_DELETE_FAIL,
    MANAGER_DELETE_RESET,
    CLEAR_ERROR
} from '../../Constants/Entity/managerConstants';

//Get All Managers Reducer
export const managersReducer = (state = { managers: [] }, action) => {
    switch (action.type) {
        case MANAGERS_REQUEST:
            return {
                loading: true,
                managers: []
            }

        case MANAGERS_SUCCESS:
            return {
                loading: false,
                managers: action.payload,
            }

        case MANAGERS_FAIL:
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
export const newManagerReducer = (state = { manager: {} }, action) => {
    switch(action.type) {
        case MANAGER_ADD_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case MANAGER_ADD_SUCCESS:
            return {
                loading: false,
                success: action.payload != null ? true : false,
                manager: action.payload
            }
        case MANAGER_ADD_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case MANAGER_ADD_RESET: 
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
export const managerReducer = (state = {}, action) => {
    switch(action.type) {
        case MANAGER_DELETE_REQUEST:
        case MANAGER_UPDATE_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case MANAGER_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        case MANAGER_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case MANAGER_DELETE_FAIL:
        case MANAGER_UPDATE_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case MANAGER_DELETE_RESET: 
            return {
                ...state,
                isDeleted: false
            }
        case MANAGER_UPDATE_RESET: 
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
export const managerDetailsReducer = (state = { manager: {} }, action) => {
    switch(action.type) {
        case MANAGER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case MANAGER_DETAILS_SUCCESS:
            return {
                loading: false,
                manager: action.payload
            }
        case MANAGER_DETAILS_FAIL:
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
import { 
    VEHICLES_REQUEST,
    VEHICLES_SUCCESS,
    VEHICLES_FAIL,
    VEHICLE_ADD_REQUEST,
    VEHICLE_ADD_SUCCESS,
    VEHICLE_ADD_FAIL,
    VEHICLE_ADD_RESET,
    VEHICLE_DETAILS_REQUEST,
    VEHICLE_DETAILS_SUCCESS,
    VEHICLE_DETAILS_FAIL,
    VEHICLE_UPDATE_REQUEST,
    VEHICLE_UPDATE_SUCCESS,
    VEHICLE_UPDATE_FAIL,
    VEHICLE_UPDATE_RESET,
    VEHICLE_DELETE_REQUEST,
    VEHICLE_DELETE_SUCCESS,
    VEHICLE_DELETE_FAIL,
    VEHICLE_DELETE_RESET,
    CLEAR_ERROR
} from '../../Constants/Club/vehicleConstants';

export const vehiclesReducer = (state = { vehicles: [] }, action) => {
    switch (action.type) {
        case VEHICLES_REQUEST:
            return {
                loading: true,
                vehicles: []
            }

        case VEHICLES_SUCCESS:
            return {
                loading: false,
                vehicles: action.payload,
            }

        case VEHICLES_FAIL:
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
export const newVehicleReducer = (state = { vehicle: {} }, action) => {
    switch(action.type) {
        case VEHICLE_ADD_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case VEHICLE_ADD_SUCCESS:
            return {
                loading: false,
                success: action.payload,
                vehicle: action.payload
            }
        case VEHICLE_ADD_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case VEHICLE_ADD_RESET: 
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
export const vehicleReducer = (state = {}, action) => {
    switch(action.type) {
        case VEHICLE_DELETE_REQUEST:
        case VEHICLE_UPDATE_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case VEHICLE_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        case VEHICLE_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case VEHICLE_UPDATE_FAIL:
        case VEHICLE_DELETE_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case VEHICLE_DELETE_RESET: 
            return {
                ...state,
                isDeleted: false
            }
        case VEHICLE_UPDATE_RESET: 
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
export const vehicleDetailsReducer = (state = { vehicle: {} }, action) => {
    switch(action.type) {
        case VEHICLE_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case VEHICLE_DETAILS_SUCCESS:
            return {
                loading: false,
                vehicle: action.payload
            }
        case VEHICLE_DETAILS_FAIL:
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
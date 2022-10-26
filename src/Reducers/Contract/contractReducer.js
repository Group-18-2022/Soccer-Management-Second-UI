import {
    CONTRACTS_REQUEST,
    CONTRACTS_SUCCESS,
    CONTRACTS_FAIL,
    CONTRACT_ADD_REQUEST,
    CONTRACT_ADD_SUCCESS,
    CONTRACT_ADD_FAIL,
    CONTRACT_ADD_RESET,
    CONTRACT_DETAILS_REQUEST,
    CONTRACT_DETAILS_SUCCESS,
    CONTRACT_DETAILS_FAIL,
    CONTRACT_UPDATE_REQUEST,
    CONTRACT_UPDATE_SUCCESS,
    CONTRACT_UPDATE_FAIL,
    CONTRACT_UPDATE_RESET,
    CONTRACT_DELETE_REQUEST,
    CONTRACT_DELETE_SUCCESS,
    CONTRACT_DELETE_FAIL,
    CONTRACT_DELETE_RESET,
    CLEAR_ERROR
} from '../../Constants/Contract/contractConstants';

//Get All Contract Reducer
export const contractsReducer = (state = { contracts: [] }, action) => {
    switch (action.type) {
        case CONTRACTS_REQUEST:
            return {
                loading: true,
                contracts: []
            }

        case CONTRACTS_SUCCESS:
            return {
                loading: false,
                contracts: action.payload,
            }

        case CONTRACTS_FAIL:
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
export const newContractReducer = (state = { contract: {} }, action) => {
    switch(action.type) {
        case CONTRACT_ADD_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case CONTRACT_ADD_SUCCESS:
            return {
                loading: false,
                success: action.payload != null ? true : false,
                contract: action.payload
            }
        case CONTRACT_ADD_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case CONTRACT_ADD_RESET:
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
export const contractReducer = (state = {}, action) => {
    switch(action.type) {
        case CONTRACT_DELETE_REQUEST:
        case CONTRACT_UPDATE_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case CONTRACT_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        case CONTRACT_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case CONTRACT_DELETE_FAIL:
        case CONTRACT_UPDATE_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case CONTRACT_DELETE_RESET:
            return {
                ...state,
                isDeleted: false
            }
        case CONTRACT_UPDATE_RESET:
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
export const contractDetailsReducer = (state = { contract: {} }, action) => {
    switch(action.type) {
        case CONTRACT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case CONTRACT_DETAILS_SUCCESS:
            return {
                loading: false,
                contract: action.payload
            }
        case CONTRACT_DETAILS_FAIL:
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
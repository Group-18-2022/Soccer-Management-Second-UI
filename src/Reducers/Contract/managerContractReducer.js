import {
    MANAGER_CONTRACTS_REQUEST,
    MANAGER_CONTRACTS_SUCCESS,
    MANAGER_CONTRACTS_FAIL,
    MANAGER_CONTRACT_ADD_REQUEST,
    MANAGER_CONTRACT_ADD_SUCCESS,
    MANAGER_CONTRACT_ADD_FAIL,
    MANAGER_CONTRACT_ADD_RESET,
    MANAGER_CONTRACT_DETAILS_REQUEST,
    MANAGER_CONTRACT_DETAILS_SUCCESS,
    MANAGER_CONTRACT_DETAILS_FAIL,
    MANAGER_CONTRACT_UPDATE_REQUEST,
    MANAGER_CONTRACT_UPDATE_SUCCESS,
    MANAGER_CONTRACT_UPDATE_FAIL,
    MANAGER_CONTRACT_UPDATE_RESET,
    MANAGER_CONTRACT_DELETE_REQUEST,
    MANAGER_CONTRACT_DELETE_SUCCESS,
    MANAGER_CONTRACT_DELETE_FAIL,
    MANAGER_CONTRACT_DELETE_RESET,
    CLEAR_ERROR
} from '../../Constants/Contract/managerContractConstants';

//Get All Manager Contract Reducer
export const managerContractsReducer = (state = { managerContracts: [] }, action) => {
    switch (action.type) {
        case MANAGER_CONTRACTS_REQUEST:
            return {
                loading: true,
                managerContracts: []
            }

        case MANAGER_CONTRACTS_SUCCESS:
            return {
                loading: false,
                managerContracts: action.payload,
            }

        case MANAGER_CONTRACTS_FAIL:
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
export const newManagerContractReducer = (state = { managerContract: {} }, action) => {
    switch(action.type) {
        case MANAGER_CONTRACT_ADD_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case MANAGER_CONTRACT_ADD_SUCCESS:
            return {
                loading: false,
                success: action.payload != null ? true : false,
                managerContract: action.payload
            }
        case MANAGER_CONTRACT_ADD_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case MANAGER_CONTRACT_ADD_RESET:
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
export const managerContractReducer = (state = {}, action) => {
    switch(action.type) {
        case MANAGER_CONTRACT_DELETE_REQUEST:
        case MANAGER_CONTRACT_UPDATE_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case MANAGER_CONTRACT_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        case MANAGER_CONTRACT_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case MANAGER_CONTRACT_DELETE_FAIL:
        case MANAGER_CONTRACT_UPDATE_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case MANAGER_CONTRACT_DELETE_RESET:
            return {
                ...state,
                isDeleted: false
            }
        case MANAGER_CONTRACT_UPDATE_RESET:
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
export const managerContractDetailsReducer = (state = { managerContract: {} }, action) => {
    switch(action.type) {
        case MANAGER_CONTRACT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case MANAGER_CONTRACT_DETAILS_SUCCESS:
            return {
                loading: false,
                contract: action.payload
            }
        case MANAGER_CONTRACT_DETAILS_FAIL:
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
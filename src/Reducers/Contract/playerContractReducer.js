import {
    PLAYER_CONTRACTS_REQUEST,
    PLAYER_CONTRACTS_SUCCESS,
    PLAYER_CONTRACTS_FAIL,
    PLAYER_CONTRACT_ADD_REQUEST,
    PLAYER_CONTRACT_ADD_SUCCESS,
    PLAYER_CONTRACT_ADD_FAIL,
    PLAYER_CONTRACT_ADD_RESET,
    PLAYER_CONTRACT_DETAILS_REQUEST,
    PLAYER_CONTRACT_DETAILS_SUCCESS,
    PLAYER_CONTRACT_DETAILS_FAIL,
    PLAYER_CONTRACT_UPDATE_REQUEST,
    PLAYER_CONTRACT_UPDATE_SUCCESS,
    PLAYER_CONTRACT_UPDATE_FAIL,
    PLAYER_CONTRACT_UPDATE_RESET,
    PLAYER_CONTRACT_DELETE_REQUEST,
    PLAYER_CONTRACT_DELETE_SUCCESS,
    PLAYER_CONTRACT_DELETE_FAIL,
    PLAYER_CONTRACT_DELETE_RESET,
    CLEAR_ERROR
} from '../../Constants/Contract/playerContractConstants';

//Get All Player Contract Reducer
export const playerContractsReducer = (state = { playerContracts: [] }, action) => {
    switch (action.type) {
        case PLAYER_CONTRACTS_REQUEST:
            return {
                loading: true,
                playerContracts: []
            }

        case PLAYER_CONTRACTS_SUCCESS:
            return {
                loading: false,
                playerContracts: action.payload,
            }

        case PLAYER_CONTRACTS_FAIL:
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
export const newPlayerContractReducer = (state = { playerContract: {} }, action) => {
    switch(action.type) {
        case PLAYER_CONTRACT_ADD_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case PLAYER_CONTRACT_ADD_SUCCESS:
            return {
                loading: false,
                success: action.payload != null ? true : false,
                playerContract: action.payload
            }
        case PLAYER_CONTRACT_ADD_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case PLAYER_CONTRACT_ADD_RESET:
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
export const playerContractReducer = (state = {}, action) => {
    switch(action.type) {
        case PLAYER_CONTRACT_DELETE_REQUEST:
        case PLAYER_CONTRACT_UPDATE_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case PLAYER_CONTRACT_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        case PLAYER_CONTRACT_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case PLAYER_CONTRACT_DELETE_FAIL:
        case PLAYER_CONTRACT_UPDATE_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case PLAYER_CONTRACT_DELETE_RESET:
            return {
                ...state,
                isDeleted: false
            }
        case PLAYER_CONTRACT_UPDATE_RESET:
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
export const playerContractDetailsReducer = (state = { playerContract: {} }, action) => {
    switch(action.type) {
        case PLAYER_CONTRACT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case PLAYER_CONTRACT_DETAILS_SUCCESS:
            return {
                loading: false,
                playerContract: action.payload
            }
        case PLAYER_CONTRACT_DETAILS_FAIL:
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
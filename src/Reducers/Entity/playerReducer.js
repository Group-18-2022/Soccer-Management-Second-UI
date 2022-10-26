import { 
    PLAYERS_REQUEST,
    PLAYERS_SUCCESS,
    PLAYERS_FAIL,
    PLAYER_ADD_REQUEST,
    PLAYER_ADD_SUCCESS,
    PLAYER_ADD_FAIL,
    PLAYER_ADD_RESET,
    PLAYER_DETAILS_REQUEST,
    PLAYER_DETAILS_SUCCESS,
    PLAYER_DETAILS_FAIL,
    PLAYER_UPDATE_REQUEST,
    PLAYER_UPDATE_SUCCESS,
    PLAYER_UPDATE_FAIL,
    PLAYER_UPDATE_RESET,
    PLAYER_DELETE_REQUEST,
    PLAYER_DELETE_SUCCESS,
    PLAYER_DELETE_FAIL,
    PLAYER_DELETE_RESET,
    CLEAR_ERROR
} from '../../Constants/Entity/playerConstants';

//Get All Kits Reducer
export const playersReducer = (state = { players: [] }, action) => {
    switch (action.type) {
        case PLAYERS_REQUEST:
            return {
                loading: true,
                players: []
            }

        case PLAYERS_SUCCESS:
            return {
                loading: false,
                players: action.payload,
            }

        case PLAYERS_FAIL:
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
export const newPlayerReducer = (state = { player: {} }, action) => {
    switch(action.type) {
        case PLAYER_ADD_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case PLAYER_ADD_SUCCESS:
            return {
                loading: false,
                success: action.payload != null ? true : false,
                player: action.payload
            }
        case PLAYER_ADD_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case PLAYER_ADD_RESET: 
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
export const playerReducer = (state = {}, action) => {
    switch(action.type) {
        case PLAYER_DELETE_REQUEST:
        case PLAYER_UPDATE_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case PLAYER_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        case PLAYER_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }
        case PLAYER_DELETE_FAIL:
        case PLAYER_UPDATE_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case PLAYER_DELETE_RESET: 
            return {
                ...state,
                isDeleted: false
            }
        case PLAYER_UPDATE_RESET: 
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
export const playerDetailsReducer = (state = { player: {} }, action) => {
    switch(action.type) {
        case PLAYER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case PLAYER_DETAILS_SUCCESS:
            return {
                loading: false,
                player: action.payload
            }
        case PLAYER_DETAILS_FAIL:
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
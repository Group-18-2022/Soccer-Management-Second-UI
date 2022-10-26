import axios from 'axios';
import { 
    PLAYERS_REQUEST,
    PLAYERS_SUCCESS,
    PLAYERS_FAIL,
    PLAYER_ADD_REQUEST,
    PLAYER_ADD_SUCCESS,
    PLAYER_ADD_FAIL,
    PLAYER_DETAILS_REQUEST,
    PLAYER_DETAILS_SUCCESS,
    PLAYER_DETAILS_FAIL,
    PLAYER_UPDATE_REQUEST,
    PLAYER_UPDATE_SUCCESS,
    PLAYER_UPDATE_FAIL,
    PLAYER_DELETE_REQUEST,
    PLAYER_DELETE_SUCCESS,
    PLAYER_DELETE_FAIL,
    CLEAR_ERROR
} from '../../Constants/Entity/playerConstants';

const playerURL = "http://localhost:8080/api/v1/soccer-management/player";
const config = {
    headers: {
        'Authorization': 'Basic ' + btoa('Manager:ManagerPassword')
    }
}
//Get one
export const getPlayerRequest = (id) => async (dispatch) => {
    try {

        dispatch({ type: PLAYER_DETAILS_REQUEST })

        const { data } = await axios.get(playerURL + `/read/${id}`, config)

        dispatch({
            type: PLAYER_DETAILS_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: PLAYER_DETAILS_FAIL,
            payload: error
        });
    }
};


// Create / POST
export const postPlayerRequest = (isUpdate, playerData) => async (dispatch) => {
    try {

        dispatch({ type: isUpdate ? PLAYER_UPDATE_REQUEST : PLAYER_ADD_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa('Manager:ManagerPassword')
            }
        }

        const { data } = await axios.post(playerURL + `/save`, playerData, config)

        dispatch({
            type: isUpdate ? PLAYER_UPDATE_SUCCESS : PLAYER_ADD_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: isUpdate ? PLAYER_UPDATE_FAIL : PLAYER_ADD_FAIL,
            payload: error
        });
    }
};

//Delete
export const deletePlayerRequest = (id) => async (dispatch) => {
    try {

        dispatch({ type: PLAYER_DELETE_REQUEST });

        const { data } = await axios.delete(playerURL + `/delete/${id}`, config)

        dispatch({
            type: PLAYER_DELETE_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: PLAYER_DELETE_FAIL,
            payload: error
        });
    }
}

//Get All
export const getAllPlayersRequest = () => async (dispatch) => {
    try {

        dispatch({ type: PLAYERS_REQUEST })

        const { data: players } = await axios.get(playerURL + `/all`, config);

        console.log("AD: ", players)

        await dispatch({
            type: PLAYERS_SUCCESS,
            payload: players
        });

    } catch (error) {
        dispatch({
            type: PLAYERS_FAIL,
            payload: error
        });
    }
};

//Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERROR
    });
}
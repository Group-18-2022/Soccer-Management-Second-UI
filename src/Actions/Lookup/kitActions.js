import axios from 'axios';
import { 
    KITS_REQUEST,
    KITS_SUCCESS,
    KITS_FAIL,
    KIT_ADD_REQUEST,
    KIT_ADD_SUCCESS,
    KIT_ADD_FAIL,
    KIT_DETAILS_REQUEST,
    KIT_DETAILS_SUCCESS,
    KIT_DETAILS_FAIL,
    KIT_UPDATE_REQUEST,
    KIT_UPDATE_SUCCESS,
    KIT_UPDATE_FAIL,
    KIT_DELETE_REQUEST,
    KIT_DELETE_SUCCESS,
    KIT_DELETE_FAIL,
    CLEAR_ERROR
} from '../../Constants/Lookup/kitConstants';

const kitURL = "http://localhost:8080/api/v1/soccer-management/kit";

const config = {
    headers: {
        'Authorization': 'Basic ' + btoa('Manager:ManagerPassword')
    }
}

//Get one
export const getKitRequest = (id) => async (dispatch) => {
    try {

        dispatch({ type: KIT_DETAILS_REQUEST })

        const { data } = await axios.get(kitURL + `/read/${id}`, config)

        dispatch({
            type: KIT_DETAILS_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: KIT_DETAILS_FAIL,
            payload: error
        });
    }
};


// Create / POST
export const postKitRequest = (isUpdate, kitData) => async (dispatch) => {
    try {

        dispatch({ type: isUpdate ? KIT_UPDATE_REQUEST : KIT_ADD_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa('Manager:ManagerPassword')
            }
        }

        const { data } = await axios.post(kitURL + `/save`, kitData, config)

        dispatch({
            type: isUpdate ? KIT_UPDATE_SUCCESS : KIT_ADD_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: isUpdate ? KIT_UPDATE_FAIL : KIT_ADD_FAIL,
            payload: error
        });
    }
};

//Delete
export const deleteKitRequest = (id) => async (dispatch) => {
    try {

        dispatch({ type: KIT_DELETE_REQUEST });

        const { data } = await axios.delete(kitURL + `/delete/${id}`, config)

        dispatch({
            type: KIT_DELETE_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: KIT_DELETE_FAIL,
            payload: error.response
        });
    }
}

//Get All
export const getAllKitsRequest = () => async (dispatch) => {
    try {

        dispatch({ type: KITS_REQUEST })

        const { data: kits } = await axios.get(kitURL + `/all`, config);

        console.log("Got here", kits);

        await dispatch({
            type: KITS_SUCCESS,
            payload: kits
        });

    } catch (error) {
        dispatch({
            type: KITS_FAIL,
            payload: error.response
        });
    }
};

//Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERROR
    });
}
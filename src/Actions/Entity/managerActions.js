import axios from 'axios';
import { 
    MANAGERS_REQUEST,
    MANAGERS_SUCCESS,
    MANAGERS_FAIL,
    MANAGER_ADD_REQUEST,
    MANAGER_ADD_SUCCESS,
    MANAGER_ADD_FAIL,
    MANAGER_DETAILS_REQUEST,
    MANAGER_DETAILS_SUCCESS,
    MANAGER_DETAILS_FAIL,
    MANAGER_UPDATE_REQUEST,
    MANAGER_UPDATE_SUCCESS,
    MANAGER_UPDATE_FAIL,
    MANAGER_DELETE_REQUEST,
    MANAGER_DELETE_SUCCESS,
    MANAGER_DELETE_FAIL,
    CLEAR_ERROR
} from '../../Constants/Entity/managerConstants';

const managerURL = "http://localhost:8080/api/v1/soccer-management/manager";
const config = {
    headers: {
        'Authorization': 'Basic ' + btoa('Manager:ManagerPassword')
    }
}
//Get one
export const getManagerRequest = (id) => async (dispatch) => {
    try {

        dispatch({ type: MANAGER_DETAILS_REQUEST })

        const { data } = await axios.get(managerURL + `/read/${id}`, config)

        dispatch({
            type: MANAGER_DETAILS_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: MANAGER_DETAILS_FAIL,
            payload: error
        });
    }
};


// Create / POST
export const postManagerRequest = (isUpdate, managerDate) => async (dispatch) => {
    try {

        dispatch({ type: isUpdate ? MANAGER_UPDATE_REQUEST : MANAGER_ADD_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa('Manager:ManagerPassword')
            }
        }

        const { data } = await axios.post(managerURL + `/save`, managerDate, config)

        dispatch({
            type: isUpdate ? MANAGER_UPDATE_SUCCESS : MANAGER_ADD_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: isUpdate ? MANAGER_UPDATE_FAIL : MANAGER_ADD_FAIL,
            payload: error
        });
    }
};

//Delete
export const deleteManagerRequest = (id) => async (dispatch) => {
    try {

        dispatch({ type: MANAGER_DELETE_REQUEST });

        const { data } = await axios.delete(managerURL + `/delete/${id}`, config)

        dispatch({
            type: MANAGER_DELETE_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: MANAGER_DELETE_FAIL,
            payload: error.response
        });
    }
}

//Get All
export const getAllManagersRequest = () => async (dispatch) => {
    try {

        dispatch({ type: MANAGERS_REQUEST })

        const { data: managers } = await axios.get(managerURL + `/all`, config);

        console.log("AD: ", managers)

        await dispatch({
            type: MANAGERS_SUCCESS,
            payload: managers
        });

    } catch (error) {
        dispatch({
            type: MANAGERS_FAIL,
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
import axios from 'axios';
import { 
    VEHICLES_REQUEST,
    VEHICLES_SUCCESS,
    VEHICLES_FAIL,
    VEHICLE_ADD_REQUEST,
    VEHICLE_ADD_SUCCESS,
    VEHICLE_ADD_FAIL,
    VEHICLE_DETAILS_REQUEST,
    VEHICLE_DETAILS_SUCCESS,
    VEHICLE_DETAILS_FAIL,
    VEHICLE_UPDATE_REQUEST,
    VEHICLE_UPDATE_SUCCESS,
    VEHICLE_UPDATE_FAIL,
    VEHICLE_DELETE_REQUEST,
    VEHICLE_DELETE_SUCCESS,
    VEHICLE_DELETE_FAIL,
    CLEAR_ERROR
} from '../../Constants/Club/vehicleConstants';

const vehicleURL = "http://localhost:8080/api/v1/soccer-management/vehicle";
const config = {
    headers: {
        'Authorization': 'Basic ' + btoa('Manager:ManagerPassword')
    }
}
//Get one
export const getVehicleRequest = (id) => async (dispatch) => {
    try {

        dispatch({ type: VEHICLE_DETAILS_REQUEST })

        const { data } = await axios.get(vehicleURL + `/read/${id}`, config)

        dispatch({
            type: VEHICLE_DETAILS_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: VEHICLE_DETAILS_FAIL,
            payload: error
        });
    }
};


// Create / POST
export const postVehicleRequest = (isUpdate, vehicleData) => async (dispatch) => {
    try {

        dispatch({ type: isUpdate ? VEHICLE_UPDATE_REQUEST : VEHICLE_ADD_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa('Manager:ManagerPassword')
            }
        }

        const { data } = await axios.post(vehicleURL + `/save`, vehicleData, config)

        dispatch({
            type: isUpdate ? VEHICLE_UPDATE_SUCCESS : VEHICLE_ADD_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: isUpdate ? VEHICLE_ADD_FAIL : VEHICLE_UPDATE_FAIL,
            payload: error
        });
    }
};

//Delete
export const deleteVehicleRequest = (id) => async (dispatch) => {
    try {

        dispatch({ type: VEHICLE_DELETE_REQUEST });

        const { data } = await axios.delete(vehicleURL + `/delete/${id}`, config)

        dispatch({
            type: VEHICLE_DELETE_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: VEHICLE_DELETE_FAIL,
            payload: error.response
        });
    }
}

//Get All
export const getAllVehiclesRequest = () => async (dispatch) => {
    try {

        dispatch({ type: VEHICLES_REQUEST })

        const { data: vehicles } = await axios.get(vehicleURL + `/all`, config);

        await dispatch({
            type: VEHICLES_SUCCESS,
            payload: vehicles
        });

    } catch (error) {
        dispatch({
            type: VEHICLES_FAIL,
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
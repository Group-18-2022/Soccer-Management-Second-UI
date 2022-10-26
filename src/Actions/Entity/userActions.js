import axios from 'axios';

import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    CLEAR_ERRORS
} from '../../Constants/Entity/userConstants';

const userURL = "http://localhost:8080/api/v1/soccer-management/user";

//Login the user
export const login = (name, email) => async (dispatch) => {
    try {

        dispatch({ type: LOGIN_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        let obj = {
            'name': name,
            'email': email
        }

        const { data } = await axios.post(userURL + `/login`, obj, config)

        console.log("User Login ", data);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data
        })

    } catch (error) {
        console.log("Error: ", error);
        dispatch({
            type: LOGIN_FAIL,
            payload: error
        })
    }
};

//Load User
// export const loadUser = () => async (dispatch) => {
//     try {

//         dispatch({ type: LOAD_USER_REQUEST })

//         const { data } = await axios.get('/api/v1/me')

//         dispatch({
//             type: LOAD_USER_SUCCESS,
//             payload: data.user
//         })

//     } catch (error) {
//         dispatch({
//             type: LOAD_USER_FAIL,
//             payload: error.response.data.message
//         })
//     }
// };

//Logout user
export const logout = () => async (dispatch) => {
    try {

        dispatch({
            type: LOGOUT_SUCCESS
        });

    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error
        });
    }
};

//Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}
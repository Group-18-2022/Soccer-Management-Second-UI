import axios from 'axios';
import {
    PLAYER_CONTRACTS_REQUEST,
    PLAYER_CONTRACTS_SUCCESS,
    PLAYER_CONTRACTS_FAIL,
    PLAYER_CONTRACT_ADD_REQUEST,
    PLAYER_CONTRACT_ADD_SUCCESS,
    PLAYER_CONTRACT_ADD_FAIL,
    PLAYER_CONTRACT_DETAILS_REQUEST,
    PLAYER_CONTRACT_DETAILS_SUCCESS,
    PLAYER_CONTRACT_DETAILS_FAIL,
    PLAYER_CONTRACT_UPDATE_REQUEST,
    PLAYER_CONTRACT_UPDATE_SUCCESS,
    PLAYER_CONTRACT_UPDATE_FAIL,
    PLAYER_CONTRACT_DELETE_REQUEST,
    PLAYER_CONTRACT_DELETE_SUCCESS,
    PLAYER_CONTRACT_DELETE_FAIL,
CLEAR_ERROR
 } from '../../Constants/Contract/playerContractConstants';

const playerContractURL = "http://localhost:8080/api/v1/soccer-management/playerContract";
const config = {
    headers: {
        'Authorization': 'Basic ' + btoa('Manager:ManagerPassword')
    }
}
// //Get one
export const getPlayerContractRequest = (id) => async (dispatch) => {
 try {

dispatch({ type: PLAYER_CONTRACT_DETAILS_REQUEST })

 const { data } = await axios.get(playerContractURL + `/read/${id}`, config)

 dispatch({
 type: PLAYER_CONTRACT_DETAILS_SUCCESS,
 payload: data
 });

     } catch (error) {
         dispatch({
            type: PLAYER_CONTRACT_DETAILS_FAIL,
             payload: error
       });
    }
 };


// // Create / POST
export const postPlayerContractRequest = (isUpdate, playerContractData) => async (dispatch) => {
 try {

        dispatch({ type: isUpdate ? PLAYER_CONTRACT_UPDATE_REQUEST : PLAYER_CONTRACT_ADD_REQUEST });

     const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa('Manager:ManagerPassword')
            }
        }

         const { data } = await axios.post(playerContractURL + `/save`, playerContractData, config)

        dispatch({
             type: isUpdate ? PLAYER_CONTRACT_UPDATE_SUCCESS : PLAYER_CONTRACT_ADD_SUCCESS,
             payload: data
         });

     } catch (error) {
         dispatch({
             type: isUpdate ? PLAYER_CONTRACT_ADD_FAIL : PLAYER_CONTRACT_UPDATE_FAIL,
            payload: error
        });
     }
 };

// //Delete
 export const deletePlayerContractRequest = (id) => async (dispatch) => {
     try {

        dispatch({ type: PLAYER_CONTRACT_DELETE_REQUEST });

         const { data } = await axios.delete(playerContractURL + `/delete/${id}`, config)

         dispatch({
            type: PLAYER_CONTRACT_DELETE_SUCCESS,
            payload: data
         });

    } catch (error) {
        dispatch({
            type: PLAYER_CONTRACT_DELETE_FAIL,
            payload: error.response
        });
     }
 }

// //Get All
 export const getAllPlayerContractRequest = () => async (dispatch) => {
   try {

        dispatch({ type: PLAYER_CONTRACTS_REQUEST })

         const { data: examples } = await axios.get(playerContractURL + `/findAll`, config);

        await dispatch({
             type: PLAYER_CONTRACTS_SUCCESS,
             payload: examples
        });

     } catch (error) {
        dispatch({
             type: PLAYER_CONTRACTS_FAIL,
            payload: error.response
         });
    }
 };

// //Clear Errors
 export const clearErrors = () => async (dispatch) => {
     dispatch({
       type: CLEAR_ERROR
     });
 }
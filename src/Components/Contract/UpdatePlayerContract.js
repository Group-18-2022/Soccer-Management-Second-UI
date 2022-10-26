import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';

import MetaData from '../Layout/MetaData';
import Sidebar from '../Layout/Sidebar';

import { getPlayerContractRequest, postPlayerContractRequest, clearErrors } from '../../Actions/Contract/playerContractActions';
import { PLAYER_CONTRACT_UPDATE_RESET } from '../../Constants/Contract/playerContractConstants';

const UpdatePlayerContract = ({ match, history }) => {
const dispatch = useDispatch();
const alert = useAlert();

const [contractId, setContractId] = useState('');
const [goalTarget, setGoalTarget] = useState('');
const [matchesPlayed, setMatchesPlayed] = useState('');
    const [duration, setDuration] = useState('');
    const [signedDate, setSignedDate] = useState('');
    const [exDate, setExDate] = useState('');
    const [signedLocation, setSignedLocation] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [firstName, setFirstName] = useState('');
    const [surname, setSurname] = useState('');
    const [idNumber, setIdNumber] = useState('');
    const [contactId, setContactId] = useState('');
    const [area, setArea] = useState('');
    const [city, setCity] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [streetName, setStreetName] = useState('');
    const [streetNumber, setStreetNumber] = useState(0);
    const [zipCode, setZipCode] = useState('');

const { playerContract, error } = useSelector(state => state.playerContractDetails);
const { loading, error: updateError, isUpdated } = useSelector(state => state.playerContract);

const paramContractId = match.params.id;

 useEffect(() => {
if(playerContract && playerContract.contractId !== paramContractId) {
dispatch(getPlayerContractRequest(paramContractId));
 } else {
    // setContractId(playerContract.contractId);
    // setGoalTarget(playerContract.goalTarget);
    // setMatchesPlayed(playerContract.matchesPlayed);
    // setDuration(playerContract.duration)
    // setDateOfBirth(playerContract.personalDetails.dateOfBirth);
    // setFirstName(playerContract.personalDetails.firstName);
    // setSurname(playerContract.personalDetails.surname);
    // setIdNumber(playerContract.personalDetails.idNumber);
    // setContactId(playerContract.personalDetails.contactDetails.contactId);
    // setArea(playerContract.personalDetails.contactDetails.area);
    // setCity(playerContract.personalDetails.contactDetails.city);
    // setEmailAddress(playerContract.personalDetails.contactDetails.emailAddress);
    // setPhoneNumber(playerContract.personalDetails.contactDetails.phoneNumber);
    // setStreetName(playerContract.personalDetails.contactDetails.streetName);
    // setStreetNumber(playerContract.personalDetails.contactDetails.streetNumber);
    // setZipCode(playerContract.personalDetails.contactDetails.zipCode);

    setContractId(playerContract.contractId);
    setGoalTarget(playerContract.goalTarget);
    setMatchesPlayed(playerContract.matchesPlayed);
    setDuration(playerContract.duration)
    setDateOfBirth(playerContract.contract.witness.dateOfBirth);
    setFirstName(playerContract.contract.witness.firstName);
    setSurname(playerContract.contract.witness.surname);
    setIdNumber(playerContract.contract.witness.idNumber);
    setContactId(playerContract.contract.witness.contactDetails.contactId);
    setArea(playerContract.contract.witness.contactDetails.area);
    setCity(playerContract.contract.witness.contactDetails.city);
    setEmailAddress(playerContract.contract.witness.contactDetails.emailAddress);
    setPhoneNumber(playerContract.contract.witness.contactDetails.phoneNumber);
    setStreetName(playerContract.contract.witness.contactDetails.streetName);
    setStreetNumber(playerContract.contract.witness.contactDetails.streetNumber);
    setZipCode(playerContract.contract.witness.contactDetails.zipCode);
}

if(error) {
 alert.error(error);
 dispatch(clearErrors());
}

 if(updateError) {
 alert.error(updateError);
dispatch(clearErrors());
}

 if(isUpdated) {
 history.push('/playerContracts');
alert.success('Example updated successfully');
dispatch({ type: PLAYER_CONTRACT_UPDATE_RESET });
}

 }, [dispatch, alert, error, isUpdated, history, updateError, playerContract, paramContractId]);

 const submitHandler = (e) => {
 e.preventDefault();

 let contactDetails = {
    'contactId': contactId,
    'area': area,
    'city': city,
    'emailAddress': emailAddress,
    'phoneNumber': phoneNumber,
    'streetName': streetName,
    'streetNumber': streetNumber,
    'zipCode': zipCode,
}

const personalDetails = {
    'firstName': firstName,
    'surname': surname,
    'idNumber': idNumber,
    'dateOfBirth': dateOfBirth,
    'contactDetails': contactDetails
}

const contract = {
    'signedDate': signedDate,
    'expDate': exDate,
    'signedLocation': signedLocation,
    'duration': duration,
    'witness': personalDetails
}

const playerContract = {
    'contractId': contractId,
    'goalTarget': goalTarget,
    'matchesPlayed': matchesPlayed,
    'contract': contract
}

dispatch(postPlayerContractRequest(true, playerContract))
}

 return (
<Fragment>
<MetaData title={'Update Player Contract Details'} />
<div className="row">
<div className="col-12 col-md-2 remove-padding-sidebar">
<Sidebar />
 </div>

 <div className="col-12 col-md-10">
<Fragment>
<div className="wrapper my-5">
<form className="shadow-lg" onSubmit={submitHandler}>
<h1 className="mb-4">Update Player Contract Details</h1>

 <div className="form-group">
<label htmlFor="contractId_field">Contract ID</label>
<input
type="text"
id="contractId_field"
 className="form-control"
 value={contractId}
 onChange={(e) => setContractId(e.target.value)}
 />
 </div>

                              <div className="form-group">
                                   <label htmlFor="goalTarget_field">GoalTarget</label>
                                     <input
                                        type="text"
                                        id="goalTarget_field"
                                        className="form-control"
                                        value={goalTarget}
                                         onChange={(e) => setGoalTarget(e.target.value)}
                                    />
                               </div>

                              <div className="form-group">
                                    <label htmlFor="matchesPlayed_field">Matches Played</label>
                                    <input
                                        type="text"
                                         id="matchesPlayed_field"
                                         className="form-control"
                                         value={matchesPlayed}
                                       onChange={(e) => setMatchesPlayed(e.target.value)}
                                   />
                                </div>

    <div className="form-group">
        <label htmlFor="signedDate_field">Signed Date</label>
        <input
            type="text"
            id="signedDate_field"
            className="form-control"
            disabled
            value={signedDate}
            onChange={(e) => setSignedDate(e.target.value)}
        />
    </div>

    <div className="form-group">
        <label htmlFor="exDate_field">Expiring Date</label>
        <input
            type="text"
            id="exDate_field"
            className="form-control"
            value={exDate}
            onChange={(e) => setExDate(e.target.value)}
        />
    </div>

    <div className="form-group">  <label htmlFor="signedLocation_field">Signed Location</label>
        <input
            type="text"
            id="signedLocation_field"  className="form-control"
            value={signedLocation}
            onChange={(e) => setSignedLocation(e.target.value)}
        />
    </div>

    <div className="form-group">  <label htmlFor="signedLocation_field">Duration</label>
        <input
            type="text"
            id="duration_field"  className="form-control"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
        />
    </div>

    <div className="form-group">
        <label htmlFor="dateOfBirth_field">Date of Birth</label>
        <input
            type="text"
            id="dateOfBirth_field"
            className="form-control"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
        />
    </div>

    <div className="form-group">
        <label htmlFor="firstName_field">First Name</label>
        <input
            type="text"
            id="firstName_field"
            className="form-control"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
        />
    </div>

    <div className="form-group">
        <label htmlFor="surname_field">Surname</label>
        <input
            type="text"
            id="surname_field"
            className="form-control"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
        />
    </div>

    <div className="form-group">
        <label htmlFor="idNumber_field">ID Number</label>
        <input
            type="text"
            id="idNumber_field"
            className="form-control"
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
        />
    </div>

    <h4>Contact Details</h4>

    <div className="form-group">
        <label htmlFor="area_field">Area</label>
        <input
            type="text"
            id="area_field"
            className="form-control"
            value={area}
            onChange={(e) => setArea(e.target.value)}
        />
    </div>

    <div className="form-group">
        <label htmlFor="city_field">City</label>
        <input
            type="text"
            id="city_field"
            className="form-control"
            value={city}
            onChange={(e) => setCity(e.target.value)}
        />
    </div>

    <div className="form-group">
        <label htmlFor="emailAddress_field">Email Address</label>
        <input
            type="email"
            id="empNumber_field"
            className="form-control"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
        />
    </div>

    <div className="form-group">
        <label htmlFor="phoneNumber_field">Phone Number</label>
        <input
            type="text"
            id="phoneNumber_field"
            className="form-control"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
        />
    </div>

                                 <button
                                    id="login_button"
                                     type="submit"
                                     className="btn btn-block py-3"
                                    disabled={loading ? true : false}
                                >
                                     Update
                                 </button>

                            </form>
                         </div>
                     </Fragment>
                 </div>
            </div>

        </Fragment>
     )
 }

 export default UpdatePlayerContract
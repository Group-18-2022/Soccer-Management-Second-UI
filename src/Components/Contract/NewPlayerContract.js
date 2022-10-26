import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { v4 as uuidv4 } from 'uuid';


import MetaData from '../Layout/MetaData';
import Sidebar from '../Layout/Sidebar';

import { postPlayerContractRequest, clearErrors } from '../../Actions/Contract/playerContractActions';
import { PLAYER_CONTRACT_ADD_RESET } from '../../Constants/Contract/playerContractConstants';

const NewPlayerContract = ({ history }) => {
    const alert = useAlert();
    const dispatch = useDispatch();

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

    const { loading, error, success } = useSelector(state => state.newPlayerContract);

    useEffect(() => {
        setContractId(uuidv4());
        setContactId(uuidv4());

        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if(success) {
            history.push('/playerContracts');
            alert.success('Player Contract created successfully');
            dispatch({ type: PLAYER_CONTRACT_ADD_RESET });
        }

    }, [dispatch, alert, error, success, history])


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

        dispatch(postPlayerContractRequest(false, playerContract))
    }

    return (
        <Fragment>
            <MetaData title={'New Player Contract'} />
            <div className="row">
                <div className="col-12 col-md-2 remove-padding-sidebar">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler}>

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
                                    <label htmlFor="mileStone_field">Goal Target</label>
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
                                        id="matchesPlayed_field"  className="form-control"
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

                                <div className="form-group">
                                    <label htmlFor="empNumber_field">Street Name</label>
                                    <input
                                        type="text"
                                        id="empNumber_field"
                                        className="form-control"
                                        value={streetName}
                                        onChange={(e) => setStreetName(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="empNumber_field">Street Number</label>
                                    <input
                                        type="text"
                                        id="empNumber_field"
                                        className="form-control"
                                        value={streetNumber}
                                        onChange={(e) => setStreetNumber(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="empNumber_field">Zip Code</label>
                                    <input
                                        type="text"
                                        id="empNumber_field"
                                        className="form-control"
                                        value={zipCode}
                                        onChange={(e) => setZipCode(e.target.value)}
                                    />
                                </div>

                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                    disabled={loading ? true : false}
                                >
                                    ADD
                                </button>

                            </form>
                        </div>
                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default NewPlayerContract
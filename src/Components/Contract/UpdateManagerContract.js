import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';

import MetaData from '../Layout/MetaData';
import Sidebar from '../Layout/Sidebar';

import { getManagerContractRequest, postManagerContractRequest, clearErrors } from '../../Actions/Contract/managerContractActions';
import { MANAGER_CONTRACT_UPDATE_RESET } from '../../Constants/Contract/managerContractConstants';

const UpdateManagerContract = ({ match, history }) => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const [contractId, setContractId] = useState('');
    const [mileStone, setMileStone] = useState('');
    const [numberofGrievance, setNumberofGrievance] = useState('');
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

    const { managerContract, error } = useSelector(state => state.managerContractDetails);
    const { loading, error: updateError, isUpdated } = useSelector(state => state.managerContract);

    const paramContractId = match.params.id;

    useEffect(() => {
        if(managerContract && managerContract.contractId !== paramContractId) {
            dispatch(getManagerContractRequest(paramContractId));
        } else {
            setContractId(managerContract.contractId);
            setMileStone(managerContract.mileStone);
            setNumberofGrievance(managerContract.numberofGrievance);
            setDateOfBirth(managerContract.personalDetails.dateOfBirth);
            setFirstName(managerContract.personalDetails.firstName);
            setSurname(managerContract.personalDetails.surname);
            setIdNumber(managerContract.personalDetails.idNumber);
            setContactId(managerContract.personalDetails.contactDetails.contactId);
            setArea(managerContract.personalDetails.contactDetails.area);
            setCity(managerContract.personalDetails.contactDetails.city);
            setEmailAddress(managerContract.personalDetails.contactDetails.emailAddress);
            setPhoneNumber(managerContract.personalDetails.contactDetails.phoneNumber);
            setStreetName(managerContract.personalDetails.contactDetails.streetName);
            setStreetNumber(managerContract.personalDetails.contactDetails.streetNumber);
            setZipCode(managerContract.personalDetails.contactDetails.zipCode);
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
            history.push('/managerContracts');
            alert.success('Manager updated successfully');
            dispatch({ type: MANAGER_CONTRACT_UPDATE_RESET });
        }

    }, [dispatch, alert, error, isUpdated, history, updateError, managerContract, paramContractId]);

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
    
        const managerContract = {
            'contractId': contractId,
            'milestonesOnTime': mileStone,
            'numberofGrievance': numberofGrievance,
            'contract' : contract
        }

        dispatch(postManagerContractRequest(true, managerContract))
    }

    return (
        <Fragment>
            <MetaData title={'Update Manager Contract Details'} />
            <div className="row">
                <div className="col-12 col-md-2 remove-padding-sidebar">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler}>
                                <h1 className="mb-4">Update Manager Contract Details</h1>

                                <div className="form-group">
                                    <label htmlFor="contractId_field">Contract ID</label>
                                    <input
                                        type="text"
                                        id="contractId_field"
                                        className="form-control"
                                        disabled
                                        value={contractId}
                                        onChange={(e) => setContractId(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="mileStone_field">Mile Stone</label>
                                    <input
                                        type="text"
                                        id="mileStone_field"
                                        className="form-control"
                                        value={mileStone}
                                        onChange={(e) => setMileStone(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="numberofGrievance_field">Number ofGrievance</label>
                                    <input
                                        type="text"
                                        id="numberofGrievance_field"
                                        className="form-control"
                                        value={numberofGrievance}
                                        onChange={(e) => setNumberofGrievance(e.target.value)}
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

export default UpdateManagerContract
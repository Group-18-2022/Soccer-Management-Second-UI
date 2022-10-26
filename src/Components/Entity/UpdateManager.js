import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';

import MetaData from '../Layout/MetaData';
import Sidebar from '../Layout/Sidebar';

import { getManagerRequest, postManagerRequest, clearErrors } from '../../Actions/Entity/managerActions';
import { getAllTeamsRequest } from '../../Actions/Team/teamActions';
import { MANAGER_UPDATE_RESET } from '../../Constants/Entity/managerConstants';

const UpdateManager = ({ match, history }) => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const [employeeNumber, setEmployeeNumber] = useState('');
    const [clubName, setClubName] = useState('');
    const [jobTitle, setJobTitle] = useState('Manager');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [firstName, setFirstName] = useState('');
    const [surname, setSurname] = useState('');
    const [idNumber, setIdNumber] = useState('');
    const [yearExp, setYearExp] = useState('');
    const [teamIddd, setTeamId] = useState(1);
    const [contactId, setContactId] = useState('');
    const [area, setArea] = useState('');
    const [city, setCity] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [streetName, setStreetName] = useState('');
    const [streetNumber, setStreetNumber] = useState(0);
    const [zipCode, setZipCode] = useState('');

    const { manager, error } = useSelector(state => state.managerDetails);
    const { loading, error: updateError, isUpdated } = useSelector(state => state.manager);
    const { teams } = useSelector(state => state.teams);

    const paramManagerId = match.params.id;

    useEffect(() => {
        getAllTeamsRequest();
        if(manager && manager.empNumber !== paramManagerId) {
            dispatch(getManagerRequest(paramManagerId));
        } else {
            setEmployeeNumber(manager.empNumber);
            setClubName(manager.clubName);
            setJobTitle(manager.jobTitle);
            setDateOfBirth(manager.personalDetails.dateOfBirth);
            setFirstName(manager.personalDetails.firstName);
            setSurname(manager.personalDetails.surname);
            setIdNumber(manager.personalDetails.idNumber);
            setYearExp(manager.yearsExperience);
            setTeamId(manager.teamId);
            setContactId(manager.personalDetails.contactDetails.contactId);
            setArea(manager.personalDetails.contactDetails.area);
            setCity(manager.personalDetails.contactDetails.city);
            setEmailAddress(manager.personalDetails.contactDetails.emailAddress);
            setPhoneNumber(manager.personalDetails.contactDetails.phoneNumber);
            setStreetName(manager.personalDetails.contactDetails.streetName);
            setStreetNumber(manager.personalDetails.contactDetails.streetNumber);
            setZipCode(manager.personalDetails.contactDetails.zipCode);
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
            history.push('/users');
            alert.success('User updated successfully');
            dispatch({ type: MANAGER_UPDATE_RESET });
        }

    }, [dispatch, alert, error, isUpdated, history, updateError, manager, paramManagerId]);
    
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

        const manager = {
            'empNumber': employeeNumber,
            'clubName': clubName,
            'jobTitle': jobTitle,
            'yearExp': yearExp,
            'teamId': teamIddd,
            'personalDetails': personalDetails
        }

        dispatch(postManagerRequest(true, manager))
    }

    return (
        <Fragment>
            <MetaData title={'Update Manager Details'} />
            <div className="row">
                <div className="col-12 col-md-2 remove-padding-sidebar">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler}>
                                <h1 className="mb-4">Update Manager Details</h1>

                                <div className="form-group">
                                    <label htmlFor="clubName_field">Club Name</label>
                                    <input
                                        type="text"
                                        id="clubName_field"
                                        className="form-control"
                                        value={clubName}
                                        onChange={(e) => setClubName(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="teamId_field">Team</label>
                                    <select 
                                        id="teamId_field" 
                                        className="form-control" 
                                        name="teamId_field"
                                        required
                                        value={teamIddd}
                                        onChange={(e) => setTeamId(e.target.value)}
                                    >
                                        {
                                            teams.map((team) => (
                                                    <option key={team.teamId} value={team.teamId}>
                                                        {team.teamName}
                                                    </option> 
                                            ))
                                        }
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="jobTitle_field">Job Title</label>
                                    <input
                                        type="text"
                                        id="jobTitle_field"
                                        className="form-control"
                                        disabled
                                        value={jobTitle}
                                        onChange={(e) => setJobTitle(e.target.value)}
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

                                <div className="form-group">
                                    <label htmlFor="yearExp_field">Yearly Experience</label>
                                    <input
                                        type="text"
                                        id="yearExp_field"
                                        className="form-control"
                                        value={yearExp}
                                        onChange={(e) => setYearExp(e.target.value)}
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

export default UpdateManager

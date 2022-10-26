import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';

import MetaData from '../Layout/MetaData';
import Sidebar from '../Layout/Sidebar';

import { getPlayerRequest, postPlayerRequest, clearErrors } from '../../Actions/Entity/playerActions';
import { getAllTeamsRequest } from '../../Actions/Team/teamActions';
import { PLAYER_UPDATE_RESET } from '../../Constants/Entity/playerConstants';

const UpdatePlayer = ({ match, history }) => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const [employeeNumber, setEmployeeNumber] = useState('');
    const [fieldPosition, setFieldPosition] = useState(0);
    const [jerseyNumber, setJerseyNumber] = useState(0);
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [firstName, setFirstName] = useState('');
    const [surname, setSurname] = useState('');
    const [idNumber, setIdNumber] = useState('');
    const [teamId, setTeamId] = useState(1);
    // const [contactDetails, setContactDetails] = useState(1);
    const [contactId, setContactId] = useState('');
    const [area, setArea] = useState('');
    const [city, setCity] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [streetName, setStreetName] = useState('');
    const [streetNumber, setStreetNumber] = useState(0);
    const [zipCode, setZipCode] = useState('');

    const { player, error } = useSelector(state => state.playerDetails);
    const { loading, error: updateError, isUpdated } = useSelector(state => state.player);
    const { teams } = useSelector(state => state.teams);

    const paramPlayerId = match.params.id;

    useEffect(() => {
        getAllTeamsRequest();
        if(player && player.empNumber !== paramPlayerId) {
            dispatch(getPlayerRequest(paramPlayerId));
        } else {
            setEmployeeNumber(player.empNumber);
            setFieldPosition(player.fieldPosition);
            setJerseyNumber(player.jerseyNumber);
            setDateOfBirth(player.personalDetails.dateOfBirth);
            setFirstName(player.personalDetails.firstName);
            setSurname(player.personalDetails.surname);
            setIdNumber(player.personalDetails.idNumber);
            setTeamId(player.teamId);
            setContactId(player.personalDetails.contactDetails.contactId);
            setArea(player.personalDetails.contactDetails.area);
            setCity(player.personalDetails.contactDetails.city);
            setEmailAddress(player.personalDetails.contactDetails.emailAddress);
            setPhoneNumber(player.personalDetails.contactDetails.phoneNumber);
            setStreetName(player.personalDetails.contactDetails.streetName);
            setStreetNumber(player.personalDetails.contactDetails.streetNumber);
            setZipCode(player.personalDetails.contactDetails.zipCode);
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
            alert.success('Player updated successfully');
            dispatch({ type: PLAYER_UPDATE_RESET });
        }

    }, [dispatch, alert, error, isUpdated, history, updateError, player, paramPlayerId]);
    
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

        const player = {
            'empNumber': employeeNumber,
            'fieldPosition': fieldPosition,
            'jerseyNumber': jerseyNumber,
            'teamId': teamId,
            'personalDetails': personalDetails
        }

        dispatch(postPlayerRequest(true, player))
    }

    return (
        <Fragment>
            <MetaData title={'Update Player Details'} />
            <div className="row">
                <div className="col-12 col-md-2 remove-padding-sidebar">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler}>
                                <h1 className="mb-4">Update Player Details</h1>

                                <div className="form-group">
                                    <label htmlFor="teamId_field">Team</label>
                                    <select 
                                        id="teamId_field" 
                                        className="form-control" 
                                        name="teamId_field"
                                        required
                                        value={teamId}
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
                                    <label htmlFor="clubName_field">Field Position</label>
                                    <input
                                        type="text"
                                        id="clubName_field"
                                        className="form-control"
                                        value={fieldPosition}
                                        onChange={(e) => setFieldPosition(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="jobTitle_field">Jersey Number</label>
                                    <input
                                        type="text"
                                        id="jobTitle_field"
                                        className="form-control"
                                        value={jerseyNumber}
                                        onChange={(e) => setJerseyNumber(e.target.value)}
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
                                    <label htmlFor="streetName_field">Street Name</label>
                                    <input
                                        type="text"
                                        id="streetName_field"
                                        className="form-control"
                                        value={streetName}
                                        onChange={(e) => setStreetName(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="streetNumber_field">Street Number</label>
                                    <input
                                        type="text"
                                        id="streetNumber_field"
                                        className="form-control"
                                        value={streetNumber}
                                        onChange={(e) => setStreetNumber(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="zipCode_field">Zip Code</label>
                                    <input
                                        type="text"
                                        id="zipCode_field"
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

export default UpdatePlayer

import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { v4 as uuidv4 } from 'uuid';

import MetaData from '../Layout/MetaData';
import Sidebar from '../Layout/Sidebar';

import { postContactInformationRequest, clearErrors } from '../../Actions/Club/contactInformationAction';
import { CONTACT_INFORMATION_ADD_RESET } from '../../Constants/Club/contactInformationConstants';

const NewContactInformation = ({ history }) => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const [contactId, setContactId] = useState('');
    const [streetName, setStreetName] = useState('');
    const [streetNumber, setStreetNumber] = useState('');
    const [area, setArea] = useState('');
    const [city, setCity] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
   

    const { loading, error, success } = useSelector(state => state.newContactInformation);

    useEffect(() => {
        setContactId(uuidv4());
        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if(success) {
            history.push('/contactInformations');
            alert.success('Contact Information created successfully');
            dispatch({ type: CONTACT_INFORMATION_ADD_RESET });
        }

    }, [dispatch, alert, error, success, history])


    const submitHandler = (e) => {
        e.preventDefault();
        const contactInformation = {
            'contactId': contactId,
            'streetName': streetName,
            'streetNumber': streetNumber,
            'area': area,
            'city': city,
            'zipCode': zipCode,
            'phoneNumber': phoneNumber,
            'emailAddress': emailAddress,
        }

        dispatch(postContactInformationRequest(contactInformation))
    }

    return (
        <Fragment>
            <MetaData title={'New Contact Information'} />
            <div className="row">
                <div className="col-12 col-md-2 remove-padding-sidebar">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler}>
                                <h1 className="mb-4">Add Contact Information</h1>

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
                                    <label htmlFor="Area_field">Area</label>
                                    <input
                                        type="text"
                                        id="Area_field"
                                        className="form-control"
                                        value={area}
                                        onChange={(e) => setArea(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="City_field">City</label>
                                    <input
                                        type="text"
                                        id="City_field"
                                        className="form-control"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
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
                                    <label htmlFor="emailAddress_field">Email Address</label>
                                    <input
                                        type="text"
                                        id="emailAddress_field"
                                        className="form-control"
                                        value={emailAddress}
                                        onChange={(e) => setEmailAddress(e.target.value)}
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

export default NewContactInformation

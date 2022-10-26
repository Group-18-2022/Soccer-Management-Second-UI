import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { v4 as uuidv4 } from 'uuid';

import MetaData from '../Layout/MetaData';
import Sidebar from '../Layout/Sidebar';

import { postLocationRequest, clearErrors } from '../../Actions/Match/locationActions';
import { LOCATION_ADD_RESET } from '../../Constants/Match/locationConstants';

const NewLocation = ({ history }) => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const [locationId, setLocationId] = useState('');
    const [stadiumName, setStadiumName] = useState('');

    const { loading, error, success } = useSelector(state => state.newLocation);

    useEffect(() => {
        setLocationId(uuidv4())

        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if(success) {
            history.push('/locations');
            alert.success('Locations created successfully');
            dispatch({ type: LOCATION_ADD_RESET });
        }

    }, [dispatch, alert, error, success, history])


    const submitHandler = (e) => {
        e.preventDefault();

        const location = {
            'locationId': locationId,
            'stadiumName': stadiumName,
        }

        dispatch(postLocationRequest(location))
    }

    return (
        <Fragment>
            <MetaData title={'New Location'} />
            <div className="row">
                <div className="col-12 col-md-2 remove-padding-sidebar">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler}>
                                <h1 className="mb-4">Add Location</h1>

                                <div className="form-group">
                                    <label htmlFor="locationID_field">Location ID</label>
                                    <input
                                        type="text"
                                        id="locationID_field"
                                        className="form-control"
                                        disabled
                                        value={locationId}
                                        onChange={(e) => setLocationId(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="stadiumName_field">Stadium Name</label>
                                    <input
                                        type="text"
                                        id="stadiumName_field"
                                        className="form-control"
                                        value={stadiumName}
                                        onChange={(e) => setStadiumName(e.target.value)}
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

export default NewLocation

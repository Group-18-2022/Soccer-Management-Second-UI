import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';

import MetaData from '../Layout/MetaData';
import Sidebar from '../Layout/Sidebar';

import { getLocationRequest, updateLocationRequest, clearErrors } from '../../Actions/Match/locationActions';
import { LOCATION_UPDATE_RESET } from '../../Constants/Match/locationConstants';

const UpdateLocation = ({ match, history }) => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const [locationId, setLocationId] = useState('');
    const [stadiumName, setStadiumName] = useState('');

    const { location, error } = useSelector(state => state.locationDetails);
    const { loading, error: updateError, isUpdated } = useSelector(state => state.location);

    const paramLocationId = match.params.id;

    useEffect(() => {
        if(location && location.locationId !== paramLocationId) {
            dispatch(getLocationRequest(paramLocationId));
        } else {
            setLocationId(location.locationId);
            setStadiumName(location.stadiumName);
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
            history.push('/locations');
            alert.success('Locations updated successfully');
            dispatch({ type: LOCATION_UPDATE_RESET });
        }

    }, [dispatch, alert, error, isUpdated, history, updateError, location, paramLocationId]);
    
    const submitHandler = (e) => {
        e.preventDefault();

        const location = {
            'locationId': locationId,
            'stadiumName': stadiumName,
        }

        dispatch(updateLocationRequest(paramLocationId, location))
    }

    return (
        <Fragment>
            <MetaData title={'Update Location Details'} />
            <div className="row">
                <div className="col-12 col-md-2 remove-padding-sidebar">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler}>
                                <h1 className="mb-4">Update Location Details</h1>

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

export default UpdateLocation

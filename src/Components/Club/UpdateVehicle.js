import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';

import MetaData from '../Layout/MetaData';
import Sidebar from '../Layout/Sidebar';

import { getVehicleRequest, postVehicleRequest, clearErrors } from '../../Actions/Club/vehicleActions';
import { VEHICLE_UPDATE_RESET } from '../../Constants/Club/vehicleConstants';

const UpdateVehicle = ({ match, history }) => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const [vinNumber, setVinNumber] = useState('');
    const [modelType, setModelType] = useState('');
    const [modelName, setModelName] = useState('');
    const [capacity, setCapacity] = useState('');

    const { vehicle, error } = useSelector(state => state.vehicleDetails);
    const { loading, error: updateError, isUpdated } = useSelector(state => state.vehicle);

    const paramVinNumber = match.params.id;

    console.log("VinNUmber" + vehicle)

    useEffect(() => {
        if(vehicle && vehicle.vinNumber !== paramVinNumber) {
            dispatch(getVehicleRequest(paramVinNumber));
        } else {
            setVinNumber(vehicle.vinNumber);
            setModelType(vehicle.modelType);
            setModelName(vehicle.modelName);
            setCapacity(vehicle.capacity);
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
            history.push('/vehicles');
            alert.success('Vehicle updated successfully');
            dispatch({ type: VEHICLE_UPDATE_RESET });
        }

    }, [dispatch, alert, error, isUpdated, history, updateError, vehicle, paramVinNumber]);
    
    const submitHandler = (e) => {
        e.preventDefault();

        const vehicle = {
            'vinNumber': vinNumber,
            'modelType': modelType,
            'modelName': modelName,
            'capacity': capacity,
        }

        dispatch(postVehicleRequest(true, vehicle))
    }

    return (
        <Fragment>
            <MetaData title={'Update Vehicle Details'} />
            <div className="row">
                <div className="col-12 col-md-2 remove-padding-sidebar">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler}>
                                <h1 className="mb-4">Update Vehicle Details</h1>

                                <div className="form-group">
                                    <label htmlFor="vinNumber_field">Vin Number</label>
                                    <input
                                        type="text"
                                        id="vinNumber_field"
                                        className="form-control"
                                        disabled
                                        value={vinNumber}
                                        onChange={(e) => setVinNumber(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="modelType_field">Model Type</label>
                                    <input
                                        type="text"
                                        id="modelType_field"
                                        className="form-control"
                                        value={modelType}
                                        onChange={(e) => setModelType(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="modelName_field">Model Name</label>
                                    <input
                                        type="text"
                                        id="modelName_field"
                                        className="form-control"
                                        value={modelName}
                                        onChange={(e) => setModelName(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="capacity_field">Capacity</label>
                                    <input
                                        type="text"
                                        id="capacity_field"
                                        className="form-control"
                                        value={capacity}
                                        onChange={(e) => setCapacity(e.target.value)}
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

export default UpdateVehicle
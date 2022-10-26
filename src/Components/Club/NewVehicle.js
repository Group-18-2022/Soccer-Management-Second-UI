import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { v4 as uuidv4 } from 'uuid';


import MetaData from '../Layout/MetaData';
import Sidebar from '../Layout/Sidebar';

import { postVehicleRequest, clearErrors } from '../../Actions/Club/vehicleActions';
import { VEHICLE_ADD_RESET } from '../../Constants/Club/vehicleConstants';

const NewVehicle = ({ history }) => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const [vinNumber, setVinNumber] = useState('');
    const [modelType, setModelType] = useState('');
    const [modelName, setModelName] = useState('');
    const [capacity, setCapacity] = useState('');

    const { loading, error, success } = useSelector(state => state.newVehicle);

    useEffect(() => {
        setVinNumber(uuidv4())

        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if(success) {
            history.push('/vehicles');
            alert.success('Vehicle created successfully');
            dispatch({ type: VEHICLE_ADD_RESET });
        }

    }, [dispatch, alert, error, success, history])


    const submitHandler = (e) => {
        e.preventDefault();

        const vehicle = {
            'vinNumber': vinNumber,
            'modelType': modelType,
            'modelName': modelName,
            'capacity': capacity,
        }

        dispatch(postVehicleRequest(false, vehicle))
    }

    return (
        <Fragment>
            <MetaData title={'New Vehicle'} />
            <div className="row">
                <div className="col-12 col-md-2 remove-padding-sidebar">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler}>
                                <h1 className="mb-4">Add Vehicle</h1>

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

export default NewVehicle

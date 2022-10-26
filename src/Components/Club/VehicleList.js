import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MDBDataTable } from 'mdbreact';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';

import MetaData from '../Layout/MetaData';
import Loader from '../Layout/Loader';
import Sidebar from '../Layout/Sidebar';

import { getAllVehiclesRequest, deleteVehicleRequest, clearErrors } from '../../Actions/Club/vehicleActions';
import { VEHICLE_DELETE_RESET } from '../../Constants/Club/vehicleConstants';

const VehicleList = ({ history }) => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, vehicles } = useSelector(state => state.vehicles);
    const { error: deleteError, isDeleted } = useSelector(state => state.vehicle)

    useEffect(() => {
        dispatch(getAllVehiclesRequest());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('VEHICLE deleted successfully');
            history.push('/vehicles');
            dispatch({ type: VEHICLE_DELETE_RESET })
        }

    }, [dispatch, alert, error, deleteError, isDeleted, history])

    const setVehicles = () => {
        const data = {
            columns: [
                {
                    label: 'Vin Number',
                    field: 'vinNumber',
                    sort: 'asc'
                },
                {
                    label: 'Model Type',
                    field: 'modelType',
                    sort: 'asc'
                },
                {
                    label: 'Model Name',
                    field: 'modelName',
                    sort: 'asc'
                },
                {
                    label: 'Capacity',
                    field: 'capacity',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        vehicles.forEach(vehicle => {
            data.rows.push({
                vinNumber: vehicle.vinNumber,
                modelType: vehicle.modelType,
                modelName: vehicle.modelName,
                capacity: vehicle.capacity,
                actions: <Fragment>
                    <Link to={`/vehicle/${vehicle.vinNumber}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteVehicleHandler(vehicle.vinNumber)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            })
        })

        return data;
    }

    const deleteVehicleHandler = (id) => {
        dispatch(deleteVehicleRequest(id))
    }

    return (
        <Fragment>
            <MetaData title={'All Vehicles'} />
            <div className="row">
                <div className="col-12 col-md-2 remove-padding-sidebar">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">All Vehicles</h1>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setVehicles()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        )}

                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default VehicleList
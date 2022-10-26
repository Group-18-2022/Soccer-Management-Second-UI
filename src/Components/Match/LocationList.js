import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MDBDataTable } from 'mdbreact';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';

import MetaData from '../Layout/MetaData';
import Loader from '../Layout/Loader';
import Sidebar from '../Layout/Sidebar';

import { getAllLocationshRequest, deleteLocationRequest, clearErrors } from '../../Actions/Match/locationActions';
import { LOCATION_DELETE_RESET } from '../../Constants/Match/locationConstants';

const LocationList = ({ history }) => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, locations } = useSelector(state => state.locations);
    const { error: deleteError, isDeleted } = useSelector(state => state.location)

    useEffect(() => {
        dispatch(getAllLocationshRequest());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('Location deleted successfully');
            history.push('/locations');
            dispatch({ type: LOCATION_DELETE_RESET })
        }

    }, [dispatch, alert, error, deleteError, isDeleted, history])

    const setLocations = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'locationId',
                    sort: 'asc'
                },
                {
                    label: 'Stadium Name',
                    field: 'stadiumName',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        locations.forEach(location => {
            data.rows.push({
                locationId: location.locationId,
                stadiumName: location.stadiumName,
                actions: <Fragment>
                    <Link to={`/location/${location.locationId}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteLocationHandler(location.locationId)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            })
        })

        return data;
    }

    const deleteLocationHandler = (id) => {
        dispatch(deleteLocationRequest(id))
    }

    return (
        <Fragment>
            <MetaData title={'All Locations'} />
            <div className="row">
                <div className="col-12 col-md-2 remove-padding-sidebar">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">All Locations</h1>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setLocations()}
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

export default LocationList

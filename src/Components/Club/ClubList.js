import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MDBDataTable } from 'mdbreact';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';

import MetaData from '../Layout/MetaData';
import Loader from '../Layout/Loader';
import Sidebar from '../Layout/Sidebar';

import { getAllClubsRequest, deleteClubRequest, clearErrors } from '../../Actions/Club/clubActions';
import { CLUB_DELETE_RESET } from '../../Constants/Club/clubConstants';

const ClubList = ({ history }) => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, clubs } = useSelector(state => state.clubs);
    const { error: deleteError, isDeleted } = useSelector(state => state.club)

    useEffect(() => {
        dispatch(getAllClubsRequest());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('Club deleted successfully');
            history.push('/clubs');
            dispatch({ type: CLUB_DELETE_RESET })
        }

    }, [dispatch, alert, error, deleteError, isDeleted, history])

    const setClubs = () => {
        console.log(clubs);
        const data = {
            columns: [{
                    label: 'Club ID',
                    field: 'clubID',
                    sort: 'asc'
                },
                {
                    label: 'Club Name',
                    field: 'clubName',
                    sort: 'asc'
                },
                {
                    label: 'Club Owner',
                    field: 'clubOwner',
                    sort: 'asc'
                },
                {
                    label: 'Registered Club',
                    field: 'isRegisteredClub',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }
        clubs.forEach(club => {
            data.rows.push({
                clubID: club.clubId,
    		    clubName: club.clubName,
                clubOwner: club.clubOwner,
                isRegisteredClub: club.isRegisteredClub.toString(),
                actions: <Fragment>
                    <Link to={`/club/${club.clubId}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteClubHandler(club.clubId)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            })
        })

        return data;
    }

    const deleteClubHandler = (id) => {
        dispatch(deleteClubRequest(id))
    }

    return (
        <Fragment>
            <MetaData title={'All Clubs'} />
            <div className="row">
                <div className="col-12 col-md-2 remove-padding-sidebar">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">All Clubs</h1>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setClubs()}
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

export default ClubList

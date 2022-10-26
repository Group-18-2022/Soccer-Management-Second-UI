import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MDBDataTable } from 'mdbreact';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';

import MetaData from '../Layout/MetaData';
import Loader from '../Layout/Loader';
import Sidebar from '../Layout/Sidebar';

import { getAllManagersRequest, deleteManagerRequest, clearErrors } from '../../Actions/Entity/managerActions';
import { MANAGER_DELETE_RESET } from '../../Constants/Entity/managerConstants';

import { getAllPlayersRequest, deletePlayerRequest } from '../../Actions/Entity/playerActions';
import { PLAYER_DELETE_RESET } from '../../Constants/Entity/playerConstants';

const UserList = ({ history }) => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, managers } = useSelector(state => state.managers);
    const {  error: playerError, players } = useSelector(state => state.players);
    const { error: deleteError, isDeleted } = useSelector(state => state.manager);
    const { error: deletePlayerError, isPlayerDeleted } = useSelector(state => state.player)

    useEffect(() => {
        dispatch(getAllManagersRequest());
        dispatch(getAllPlayersRequest());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (playerError) {
            alert.error(playerError);
            dispatch(clearErrors())
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors())
        }

        if (isDeleted || isPlayerDeleted) {
            alert.success('User deleted successfully');
            history.push('/users');
            dispatch({ type: isDeleted ? MANAGER_DELETE_RESET : PLAYER_DELETE_RESET });
        }
        

    }, [dispatch, alert, error, deleteError, deletePlayerError, isDeleted, isPlayerDeleted, history])

    const setManagers = () => {
        const data = {
            columns: [
                {
                    label: 'Employee Number',
                    field: 'employeeNumber',
                    sort: 'asc'
                },
                {
                    label: 'Club Name',
                    field: 'clubName',
                    sort: 'asc'
                },
                {
                    label: 'Job Title',
                    field: 'jobTitle',
                    sort: 'asc'
                },
                {
                    label: 'Date Of Birth',
                    field: 'dateOfBirth',
                    sort: 'asc'
                },
                {
                    label: 'First Name',
                    field: 'firstName',
                    sort: 'asc'
                },
                {
                    label: 'Surname',
                    field: 'surname',
                    sort: 'asc'
                },
                {
                    label: 'ID Number',
                    field: 'idNumber',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        managers.forEach(manager => {
            data.rows.push({
                employeeNumber: manager.empNumber,
                clubName: manager.clubName,
                jobTitle: manager.jobTitle,
                dateOfBirth: manager.personalDetails.dateOfBirth,
                firstName: manager.personalDetails.firstName,
                surname: manager.personalDetails.surname,
                idNumber: manager.personalDetails.idNumber,
                yearExp: manager.yearExp,
                actions: <Fragment>
                    <Link to={`/manager/${manager.empNumber}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteManagerHandler(manager.empNumber)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            })
        })

        return data;
    }

    const deleteManagerHandler = (id) => {
        dispatch(deleteManagerRequest(id))
    }

    const setPlayers = () => {
        const data = {
            columns: [
                {
                    label: 'Employee Number',
                    field: 'employeeNumber',
                    sort: 'asc'
                },
                {
                    label: 'Field Position',
                    field: 'fieldPosition',
                    sort: 'asc'
                },
                {
                    label: 'Jersey Number',
                    field: 'jerseyNumber',
                    sort: 'asc'
                },
                {
                    label: 'Date Of Birth',
                    field: 'dateOfBirth',
                    sort: 'asc'
                },
                {
                    label: 'First Name',
                    field: 'firstName',
                    sort: 'asc'
                },
                {
                    label: 'Surname',
                    field: 'surname',
                    sort: 'asc'
                },
                {
                    label: 'ID Number',
                    field: 'idNumber',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        players.forEach(player => {
            data.rows.push({
                employeeNumber: player.empNumber,
                fieldPosition: player.fieldPosition,
                jerseyNumber: player.jerseyNumber,
                dateOfBirth: player.personalDetails.dateOfBirth,
                firstName: player.personalDetails.firstName,
                surname: player.personalDetails.surname,
                idNumber: player.personalDetails.idNumber,
                actions: <Fragment>
                    <Link to={`/player/${player.empNumber}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deletePlayerHandler(player.empNumber)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            })
        })

        return data;
    }

    const deletePlayerHandler = (id) => {
        dispatch(deletePlayerRequest(id))
    }

    return (
        <Fragment>
            <MetaData title={'All Users'} />
            <div className="row">
                <div className="col-12 col-md-2 remove-padding-sidebar">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">All Managers</h1>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setManagers()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        )}

                    </Fragment>

                    <Fragment>
                        <h1 className="my-5">All Players</h1>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setPlayers()}
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

export default UserList

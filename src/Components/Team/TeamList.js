import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MDBDataTable } from 'mdbreact';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';

import MetaData from '../Layout/MetaData';
import Loader from '../Layout/Loader';
import Sidebar from '../Layout/Sidebar';

import { getAllTeamsRequest, deleteTeamRequest, clearErrors } from '../../Actions/Team/teamActions';

const TeamList = ({ history }) => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, teams } = useSelector(state => state.teams);
    const { error: deleteError, isDeleted } = useSelector(state => state.team)

    useEffect(() => {
        dispatch(getAllTeamsRequest());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

    }, [dispatch, alert, error, deleteError, isDeleted, history])

    const setTeams = () => {
        const data = {
            columns: [
                {
                    label: 'Team Id',
                    field: 'teamId',
                    sort: 'asc'
                },
                {
                    label: 'Team Name',
                    field: 'teamName',
                    sort: 'asc'
                },
                {
                    label: 'Number of Players',
                    field: 'numberOfPlayers',
                    sort: 'asc'
                },
                {
                    label: 'Max Number of Players',
                    field: 'maxNumberOfPlayers',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        teams.forEach(team => {
            data.rows.push({
                teamId: team.teamId,
                teamName: team.teamName,
                numberOfPlayers: team.numberOfPlayers,
                maxNumberOfPlayers: team.maxNumberOfPlayers,
                actions: <Fragment>
                    <Link to={`/team/${team.teamId}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteTeamHandler(team.teamId)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            })
        })

        return data;
    }

    const deleteTeamHandler = (id) => {
        dispatch(deleteTeamRequest(id))
    }

    return (
        <Fragment>
            <MetaData title={'All Teams'} />
            <div className="row">
                <div className="col-12 col-md-2 remove-padding-sidebar">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">All Teams</h1>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setTeams()}
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

export default TeamList

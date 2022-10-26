import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MDBDataTable } from 'mdbreact';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';

import MetaData from '../Layout/MetaData';
import Loader from '../Layout/Loader';
import Sidebar from '../Layout/Sidebar';

import { getAllTeamStatisticsRequest, deleteTeamStatisticRequest, clearErrors } from '../../Actions/Team/teamStatisticsActions';

const TeamStatisticsList = ({ history }) => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, teamStatistics } = useSelector(state => state.teamStatistics);
    const { error: deleteError, isDeleted } = useSelector(state => state.teamStatistic)

    useEffect(() => {
        dispatch(getAllTeamStatisticsRequest());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

    }, [dispatch, alert, error, deleteError, isDeleted, history])

    const setTeamStatistics = () => {
        const data = {
            columns: [
                {
                    label: 'Team Id',
                    field: 'teamId',
                    sort: 'asc'
                },
                {
                    label: 'Trophies Won',
                    field: 'trophiesWon',
                    sort: 'asc'
                },
                {
                    label: 'Matches Played',
                    field: 'matchesPlayed',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        teamStatistics.forEach(teamStatistic => {
            data.rows.push({
                teamId: teamStatistic.teamId,
                trophiesWon: teamStatistic.trophiesWon,
                matchesPlayed: teamStatistic.matchesPlayed,
                actions: <Fragment>
                    <Link to={`/statistic/${teamStatistic.teamId}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteTeamStatisticHandler(teamStatistic.teamId)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            })
        })

        return data;
    }

    const deleteTeamStatisticHandler = (id) => {
        dispatch(deleteTeamStatisticRequest(id))
    }

    return (
        <Fragment>
            <MetaData title={'All Team Statistics'} />
            <div className="row">
                <div className="col-12 col-md-2 remove-padding-sidebar">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">All Team Statistics</h1>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setTeamStatistics()}
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

export default TeamStatisticsList

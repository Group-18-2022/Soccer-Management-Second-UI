import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MDBDataTable } from 'mdbreact';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';

import MetaData from '../Layout/MetaData';
import Loader from '../Layout/Loader';
import Sidebar from '../Layout/Sidebar';

import { getAllSoccerMatchRequst, deleteSoccerMatchRequest, clearErrors } from '../../Actions/Match/soccerMatchActions';
import { SOCCER_MATCH_DELETE_RESET } from '../../Constants/Match/soccerMatchConstants';

const SoccerMatchList = ({ history }) => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, matches } = useSelector(state => state.matches);
    const { error: deleteError, isDeleted } = useSelector(state => state.soccerMatch)

    useEffect(() => {
        dispatch(getAllSoccerMatchRequst());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('Match deleted successfully');
            history.push('/matches');
            dispatch({ type: SOCCER_MATCH_DELETE_RESET })
        }

    }, [dispatch, alert, error, deleteError, isDeleted, history])

    const setMatches = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'matchId',
                    sort: 'asc'
                },
                {
                    label: 'Kit Type',
                    field: 'kitType',
                    sort: 'asc'
                },
                {
                    label: 'Opponent',
                    field: 'opponent',
                    sort: 'asc'
                },
                {
                    label: 'Date',
                    field: 'date',
                    sort: 'asc'
                },
                {
                    label: 'Time',
                    field: 'time',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        matches.forEach(match => {
            data.rows.push({
                matchId: match.matchId,
                kitType: match.kitType,
                opponent: match.opponent,
                date: match.date,
                time: match.time,
                actions: <Fragment>
                    <Link to={`/match/${match.matchId}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteMatchHandler(match.matchId)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            })
        })

        return data;
    }

    const deleteMatchHandler = (id) => {
        dispatch(deleteSoccerMatchRequest(id))
    }

    return (
        <Fragment>
            <MetaData title={'All Soccer Matches'} />
            <div className="row">
                <div className="col-12 col-md-2 remove-padding-sidebar">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">All Soccer Matches</h1>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setMatches()}
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

export default SoccerMatchList

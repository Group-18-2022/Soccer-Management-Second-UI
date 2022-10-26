import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MDBDataTable } from 'mdbreact';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';

import MetaData from '../Layout/MetaData';
import Loader from '../Layout/Loader';
import Sidebar from '../Layout/Sidebar';

import { getAllMatchScoresRequest, deleteMatchScoreRequest, clearErrors } from '../../Actions/Match/matchScoreActions';
import { MATCH_SCORE_DELETE_RESET } from '../../Constants/Match/matchScoreConstants';

const MatchScoreList = ({ history }) => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, matchScores } = useSelector(state => state.matchScores);
    const { error: deleteError, isDeleted } = useSelector(state => state.matchScore)

    useEffect(() => {
        dispatch(getAllMatchScoresRequest());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('Match Score deleted successfully');
            history.push('/matchScores');
            dispatch({ type: MATCH_SCORE_DELETE_RESET })
        }

    }, [dispatch, alert, error, deleteError, isDeleted, history])

    const setMatchScores = () => {
        const data = {
            columns: [
                {
                    label: 'Match ID',
                    field: 'matchId',
                    sort: 'asc'
                },
                {
                    label: 'Opponent Score',
                    field: 'opponentScore',
                    sort: 'asc'
                },
                {
                    label: 'Team Score',
                    field: 'teamScore',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        console.log("MS: ", matchScores);

        matchScores.forEach(matchScore => {
            data.rows.push({
                matchId: matchScore.matchId,
                opponentScore: matchScore.opponentScore,
                teamScore: matchScore.teamScore,
                actions: <Fragment>
                    <Link to={`/matchScore/${matchScore.matchId}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteMatchScoreHandler(matchScore.matchId)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            })
        })

        return data;
    }

    const deleteMatchScoreHandler = (id) => {
        dispatch(deleteMatchScoreRequest(id))
    }

    return (
        <Fragment>
            <MetaData title={'All Match Scores'} />
            <div className="row">
                <div className="col-12 col-md-2 remove-padding-sidebar">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">All Match Scores</h1>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setMatchScores()}
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

export default MatchScoreList

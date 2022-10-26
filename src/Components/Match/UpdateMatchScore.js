import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';

import MetaData from '../Layout/MetaData';
import Sidebar from '../Layout/Sidebar';

import { getMatchScoreRequest, postMatchScoreRequest, clearErrors } from '../../Actions/Match/matchScoreActions';
import { MATCH_SCORE_UPDATE_RESET } from '../../Constants/Match/matchScoreConstants';

const UpdateKit = ({ match, history }) => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const [matchId, setMatchId] = useState('');
    const [opponentScore, setOpponentScore] = useState('');
    const [teamScore, setTeamScore] = useState('');

    const { matchScore, error } = useSelector(state => state.matchScoreDetails);
    const { loading, error: updateError, isUpdated } = useSelector(state => state.matchScore);

    const paramMatchScoreId = match.params.id;

    useEffect(() => {
        if(matchScore && matchScore.matchId !== paramMatchScoreId) {
            dispatch(getMatchScoreRequest(paramMatchScoreId));
        } else {
            setMatchId(matchScore.matchId);
            setOpponentScore(matchScore.opponentScore);
            setTeamScore(matchScore.teamScore);
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
            history.push('/matchScores');
            alert.success('Score updated successfully');
            dispatch({ type: MATCH_SCORE_UPDATE_RESET });
        }

    }, [dispatch, alert, error, isUpdated, history, updateError, matchScore, paramMatchScoreId]);
    
    const submitHandler = (e) => {
        e.preventDefault();

        const matchScore = {
            'matchId': matchId,
            'opponentScore': opponentScore,
            'teamScore': teamScore,
        }

        dispatch(postMatchScoreRequest(true, matchScore))
    }

    return (
        <Fragment>
            <MetaData title={'Update Score Details'} />
            <div className="row">
                <div className="col-12 col-md-2 remove-padding-sidebar">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler}>
                                <h1 className="mb-4">Update Score Details</h1>

                                <div className="form-group">
                                    <label htmlFor="matchId_field">Match ID</label>
                                    <input
                                        type="text"
                                        id="matchId_field"
                                        className="form-control"
                                        disabled
                                        value={matchId}
                                        onChange={(e) => setMatchId(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="opponentScore_field">Opponent Score</label>
                                    <input
                                        type="number"
                                        id="opponentScore_field"
                                        className="form-control"
                                        min="0"
                                        max="30"
                                        step="1"
                                        value={opponentScore}
                                        onChange={(e) => setOpponentScore(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="teamScore_field">Team Score</label>
                                    <input
                                        type="number"
                                        id="teamScore_field"
                                        className="form-control"
                                        min="0"
                                        max="30"
                                        step="1"
                                        value={teamScore}
                                        onChange={(e) => setTeamScore(e.target.value)}
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

export default UpdateKit

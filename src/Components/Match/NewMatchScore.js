import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';

import MetaData from '../Layout/MetaData';
import Sidebar from '../Layout/Sidebar';

import { postMatchScoreRequest, clearErrors } from '../../Actions/Match/matchScoreActions';
import { MATCH_SCORE_ADD_RESET } from '../../Constants/Match/matchScoreConstants';
import { getAllSoccerMatchRequst } from '../../Actions/Match/soccerMatchActions';

const NewKit = ({ history }) => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const [matchId, setMatchId] = useState('Choose a Match ...');
    const [opponentScore, setOpponentScore] = useState('');
    const [teamScore, setTeamScore] = useState('');
    const [defaultValue, setDefaultValue] = useState('');

    const { loading, error, success } = useSelector(state => state.newMatchScore);
    const { error: matchError, matches } = useSelector(state => state.matches);

    useEffect(() => {
        dispatch(getAllSoccerMatchRequst());
        setDefaultValue("DEFAULT VALUE")

        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if(success) {
            history.push('/matchScores');
            alert.success('Match Score created successfully');
            dispatch({ type: MATCH_SCORE_ADD_RESET });
        }

    }, [dispatch, alert, error, matchError, success, history])


    const submitHandler = (e) => {
        e.preventDefault();

        const matchScore = {
            'matchId': matchId,
            'opponentScore': opponentScore,
            'teamScore': teamScore,
        };

        dispatch(postMatchScoreRequest(false, matchScore))
    }

    return (
        <Fragment>
            <MetaData title={'New Match Score'} />
            <div className="row">
                <div className="col-12 col-md-2 remove-padding-sidebar">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                                <h1 className="mb-4">Add Match Score</h1>

                                <div className="form-group">
                                    <label htmlFor="matchId_field">Match</label>
                                    <select 
                                        id="matchId_field" 
                                        className="form-control" 
                                        name="matchId_field"
                                        required
                                        value={matchId}
                                        defaultValue={defaultValue}
                                        onChange={(e) => setMatchId(e.target.value)}
                                    >
                                        <option key="1" value="DEFAULT VALUE" disabled>Choose a Match ...</option>
                                        {
                                            matches.map((match) => (
                                                    <option key={match.matchId} value={match.matchId}>
                                                        Group 18 VS {match.opponent} - {match.date}
                                                    </option> 
                                            ))
                                        }
                                    </select>
                                </div>
                                {/* <div className="form-group">
                                    <label htmlFor="matchId_field">Match ID</label>
                                    <input
                                        type="text"
                                        id="matchId_field"
                                        className="form-control"
                                        value={matchId}
                                        onChange={(e) => setMatchId(e.target.value)}
                                    />
                                </div> */}

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
                                        min="0"
                                        max="30"
                                        step="1"
                                        className="form-control"
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

export default NewKit

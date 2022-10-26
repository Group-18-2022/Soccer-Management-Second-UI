import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';

import MetaData from '../Layout/MetaData';
import Sidebar from '../Layout/Sidebar';

import { getSoccerMatchRequest, postSoccerMatchRequest, clearErrors } from '../../Actions/Match/soccerMatchActions';
import { SOCCER_MATCH_UPDATE_RESET } from '../../Constants/Match/soccerMatchConstants';

const UpdateSoccerMatch = ({ match, history }) => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const [matchId, setMatchId] = useState('');
    const [date, setDate] = useState('');
    const [kitType, setKitType] = useState('');
    const [opponent, setOpponent] = useState('');
    const [time, setTime] = useState('');


    const { match: soccerMatch, error } = useSelector(state => state.matchDetails);
    const { loading, error: updateError, isUpdated } = useSelector(state => state.soccerMatch);

    const paramMatchId = match.params.id;

    useEffect(() => {
        if(soccerMatch && soccerMatch.matchId !== paramMatchId) {
            dispatch(getSoccerMatchRequest(paramMatchId));
        } else {
            setMatchId(soccerMatch.matchId);
            setKitType(soccerMatch.kitType);
            setOpponent(soccerMatch.opponent);
            setDate(soccerMatch.date);
            setTime(soccerMatch.time);
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
            history.push('/matches');
            alert.success('Soccer Match updated successfully');
            dispatch({ type: SOCCER_MATCH_UPDATE_RESET });
        }

    }, [dispatch, alert, error, isUpdated, history, updateError, soccerMatch, paramMatchId]);
    
    const submitHandler = (e) => {
        e.preventDefault();

        const matchData = {
            'matchId': matchId,
            'kitType': kitType,
            'opponent': opponent,
            'date': date,
            'time': time
        }

        dispatch(postSoccerMatchRequest(true, matchData))
    }

    return (
        <Fragment>
            <MetaData title={'Update Soccer Match'} />
            <div className="row">
                <div className="col-12 col-md-2 remove-padding-sidebar">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler}>
                                <h1 className="mb-4">Update Soccer Match Details</h1>

                                <div className="form-group">
                                    <label htmlFor="matchID_field">Match ID</label>
                                    <input
                                        type="text"
                                        id="matchID_field"
                                        className="form-control"
                                        disabled
                                        value={matchId}
                                        onChange={(e) => setMatchId(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="kitType_field">Kit Type</label>
                                    <input
                                        type="text"
                                        id="kitType_field"
                                        className="form-control"
                                        value={kitType}
                                        onChange={(e) => setKitType(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="opponent_field">Opponent</label>
                                    <input
                                        type="text"
                                        id="opponent_field"
                                        className="form-control"
                                        value={opponent}
                                        onChange={(e) => setOpponent(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="date_field">Date</label>
                                    <input
                                        type="text"
                                        id="date_field"
                                        className="form-control"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="time_field">Time</label>
                                    <input
                                        type="text"
                                        id="time_field"
                                        className="form-control"
                                        value={time}
                                        onChange={(e) => setTime(e.target.value)}
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

export default UpdateSoccerMatch

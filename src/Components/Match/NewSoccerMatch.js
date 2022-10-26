import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { v4 as uuidv4 } from 'uuid';

import MetaData from '../Layout/MetaData';
import Sidebar from '../Layout/Sidebar';

import { postSoccerMatchRequest, clearErrors } from '../../Actions/Match/soccerMatchActions';
import { SOCCER_MATCH_ADD_RESET } from '../../Constants/Match/soccerMatchConstants';

import { getAllKitsRequest } from '../../Actions/Lookup/kitActions';

const NewSoccerMatch = ({ history }) => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const [matchId, setMatchId] = useState('');
    const [date, setDate] = useState('');
    const [kitType, setKitType] = useState('Choose a Kit ...');
    const [opponent, setOpponent] = useState('');
    const [time, setTime] = useState('');

    const { loading, error, success } = useSelector(state => state.newMatch);
    const { error: kitsError, kits } = useSelector(state => state.kits);

    useEffect(() => {
        dispatch(getAllKitsRequest());
        setMatchId(uuidv4());

        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if(success) {
            history.push('/matches');
            alert.success('Soccer Match created successfully');
            dispatch({ type: SOCCER_MATCH_ADD_RESET });
        }

    }, [dispatch, alert, error, kitsError, success, history])


    const submitHandler = (e) => {
        e.preventDefault();
        console.log("KitType", kitType);

        const match = {
            'matchId': matchId,
            'kitType': kitType,
            'opponent': opponent,
            'date': date,
            'time': time
        }

        dispatch(postSoccerMatchRequest(false, match))
    }

    return (
        <Fragment>
            <MetaData title={'New Soccer Match'} />
            <div className="row">
                <div className="col-12 col-md-2 remove-padding-sidebar">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler}>
                                <h1 className="mb-4">Create Soccer Match</h1>

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
                                    <select 
                                        id="kitType_selection" 
                                        className="form-control" 
                                        name="kitType_selection"
                                        required
                                        value={kitType}
                                        onChange={(e) => setKitType(e.target.value)}
                                    >
                                        {/* <option key="1" value="DEFAULT VALUE" disabled>Choose a Kit ...</option> */}
                                        {
                                            kits.map((kit) => (
                                                    <option 
                                                        key={kit.kitType} value={kit.kitType}>{kit.kitType}
                                                    </option> 
                                            ))
                                        }
                                    </select>
                                </div>
                                {/* <div className="form-group">
                                    <label htmlFor="kitType_field">Kit Type</label>
                                    <input
                                        type="text"
                                        id="kitType_field"
                                        className="form-control"
                                        value={kitType}
                                        onChange={(e) => setKitType(e.target.value)}
                                    />
                                </div> */}

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
                                    CREATE
                                </button>

                            </form>
                        </div>
                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default NewSoccerMatch

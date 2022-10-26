import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { v4 as uuidv4 } from 'uuid';

import MetaData from '../Layout/MetaData';
import Sidebar from '../Layout/Sidebar';

import { postTeamRequest, clearErrors } from '../../Actions/Team/teamActions';
import { TEAM_ADD_RESET } from '../../Constants/Team/teamConstants';

const NewTeam = ({ history }) => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const [teamId, setTeamId] = useState('');
    const [teamName, setTeamName] = useState('');
    const [numberOfPlayers, setNumberOfPlayers] = useState(0);
    const [maxNumberOfPlayers, setMaxNumberOfPlayers] = useState(20);

    const { loading, error, success } = useSelector(state => state.newTeam);

    useEffect(() => {
        setTeamId(uuidv4());

        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if(success) {
            history.push('/teams');
            alert.success('Team created successfully');
            dispatch({ type: TEAM_ADD_RESET });
        }

    }, [dispatch, alert, error, success, history])


    const submitHandler = (e) => {
        e.preventDefault();

        if(maxNumberOfPlayers > numberOfPlayers) {
            alert.error("Numbers of Players cannot be higher than " + maxNumberOfPlayers);
            return;
        }

        const team = {
            'teamId': teamId,
            'teamName': teamName,
            'numberOfPlayers': numberOfPlayers,
            'maxNumberOfPlayers': maxNumberOfPlayers
        }

        dispatch(postTeamRequest(false, team))
    }

    return (
        <Fragment>
            <MetaData title={'New Team'} />
            <div className="row">
                <div className="col-12 col-md-2 remove-padding-sidebar">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler}>
                                <h1 className="mb-4">Add Team</h1>

                                <div className="form-group">
                                    <label htmlFor="teamName_field">Team Name </label>
                                    <input
                                        type="text"
                                        id="teamName_field"
                                        className="form-control"
                                        value={teamName}
                                        onChange={(e) => setTeamName(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="numberOfPlayers_field">Number Of Players</label>
                                    <input
                                        type="number"
                                        id="numberOfPlayers_field"
                                        className="form-control"
                                        min="0"
                                        max="25"
                                        step="1"
                                        value={numberOfPlayers}
                                        onChange={(e) => setNumberOfPlayers(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="maxNumberOfPlayers_field">Max Numbers of Players</label>
                                    <input
                                        type="number"
                                        id="maxNumberOfPlayers_field"
                                        className="form-control"
                                        min="0"
                                        max="30"
                                        step="1"
                                        value={maxNumberOfPlayers}
                                        onChange={(e) => setMaxNumberOfPlayers(e.target.value)}
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

export default NewTeam

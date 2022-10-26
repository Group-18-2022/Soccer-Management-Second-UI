import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';

import MetaData from '../Layout/MetaData';
import Sidebar from '../Layout/Sidebar';

import { getTeamRequest, postTeamRequest, clearErrors } from '../../Actions/Team/teamActions';
import { TEAM_UPDATE_RESET } from '../../Constants/Team/teamConstants';

const UpdateTeam = ({ match, history }) => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const [teamId, setTeamId] = useState('DEFAULT');
    const [teamName, setTeamName] = useState('');
    const [numberOfPlayers, setNumberOfPlayers] = useState('');
    const [maxNumberOfPlayers, setMaxNumberOfPlayers] = useState(20);

    const { team, error } = useSelector(state => state.teamDetails);
    const { loading, error: updateError, isUpdated } = useSelector(state => state.team);

    const paramTeamId = match.params.id;

    useEffect(() => {
        if(team && team.teamId !== paramTeamId) {
            dispatch(getTeamRequest(paramTeamId));
        } else {
            setTeamId(team.teamId);
            setTeamName(team.teamName);
            setNumberOfPlayers(team.numberOfPlayers);
            setMaxNumberOfPlayers(team.maxNumberOfPlayers);
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
            history.push('/teams');
            alert.success('Team updated successfully');
            dispatch({ type: TEAM_UPDATE_RESET });
        }

    }, [dispatch, alert, error, isUpdated, history, updateError, team, paramTeamId]);
    
    const submitHandler = (e) => {
        e.preventDefault();

        const team = {
            'teamId': teamId,
            'teamName': teamName,
            'numberOfPlayers': numberOfPlayers,
            'maxNumberOfPlayers': maxNumberOfPlayers
        }

        dispatch(postTeamRequest(true, team))
    }

    return (
        <Fragment>
            <MetaData title={'Update Team Details'} />
            <div className="row">
                <div className="col-12 col-md-2 remove-padding-sidebar">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler}>
                                <h1 className="mb-4">Update Team Details</h1>

                                <div className="form-group">
                                    <label htmlFor="teamId_field">Team Id</label>
                                    <input
                                        type="text"
                                        id="teamId_field"
                                        className="form-control"
                                        disabled
                                        value={teamId}
                                        onChange={(e) => setTeamId(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="teamName_field">Team Name</label>
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

export default UpdateTeam

import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';

import MetaData from '../Layout/MetaData';
import Sidebar from '../Layout/Sidebar';

import { postTeamStatisticRequest, clearErrors } from '../../Actions/Team/teamStatisticsActions';
import { getAllTeamsRequest } from '../../Actions/Team/teamActions';
import { TEAM_STATISTIC_ADD_RESET } from '../../Constants/Team/teamStatisticsConstants';

const NewTeamStatistics = ({ history }) => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const [teamId, setTeamId] = useState('Choose a Team ...');
    const [trophiesWon, setTrophiesWon] = useState('');
    const [matchesPlayed, setMatchesPlayed] = useState('');

    const { loading, error, success } = useSelector(state => state.newTeamStatistic);
    const { teams } = useSelector(state => state.teams);

    useEffect(() => {
        getAllTeamsRequest();

        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if(success) {
            history.push('/statistics');
            alert.success('Team Statistics created successfully');
            dispatch({ type: TEAM_STATISTIC_ADD_RESET });
        }

    }, [dispatch, alert, error, success, history])


    const submitHandler = (e) => {
        e.preventDefault();

        const teamStatistic = {
            'teamId': teamId,
            'trophiesWon': trophiesWon,
            'matchesPlayed': matchesPlayed,
        }

        console.log(teamStatistic);
        dispatch(postTeamStatisticRequest(false, teamStatistic))
    }

    return (
        <Fragment>
            <MetaData title={'New Team Statistic'} />
            <div className="row">
                <div className="col-12 col-md-2 remove-padding-sidebar">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler}>
                                <h1 className="mb-4">Add Team Statistic</h1>

                                <div className="form-group">
                                    <label htmlFor="teamId_field">Team</label>
                                    <select 
                                        id="teamId_field" 
                                        className="form-control" 
                                        name="teamId_field"
                                        required
                                        value={teamId}
                                        onChange={(e) => setTeamId(e.target.value)}
                                    >
                                        {
                                            teams.map((team) => (
                                                    <option key={team.teamId} value={team.teamId}>
                                                        {team.teamName}
                                                    </option> 
                                            ))
                                        }
                                    </select>
                                </div>
                                

                                <div className="form-group">
                                    <label htmlFor="trophiesWon_field">Trophies Won </label>
                                    <input
                                        type="text"
                                        id="trophiesWon_field"
                                        className="form-control"
                                        value={trophiesWon}
                                        onChange={(e) => setTrophiesWon(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="matchesPlayed_field">Matches Played</label>
                                    <input
                                        type="text"
                                        id="matchesPlayed_field"
                                        className="form-control"
                                        value={matchesPlayed}
                                        onChange={(e) => setMatchesPlayed(e.target.value)}
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

export default NewTeamStatistics

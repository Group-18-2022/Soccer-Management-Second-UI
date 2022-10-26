import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';

import MetaData from '../Layout/MetaData';
import Sidebar from '../Layout/Sidebar';

import { getTeamStatisticRequest, postTeamStatisticRequest, clearErrors } from '../../Actions/Team/teamStatisticsActions';
import { TEAM_STATISTIC_UPDATE_RESET } from '../../Constants/Team/teamStatisticsConstants';

const UpdateTeamStatistics = ({ match, history }) => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const [teamId, setTeamId] = useState('');
    const [trophiesWon, setTrophiesWon] = useState('');
    const [matchesPlayed, setMatchesPlayed] = useState('');

    const { teamStatistic, error } = useSelector(state => state.teamStatisticDetails);
    const { loading, error: updateError, isUpdated } = useSelector(state => state.teamStatistic);

    const paramTeamId = match.params.id;

    useEffect(() => {
        if(teamStatistic && teamStatistic.teamId !== paramTeamId) {
            dispatch(getTeamStatisticRequest(paramTeamId));
        } else {
            setTeamId(teamStatistic.teamId);
            setTrophiesWon(teamStatistic.trophiesWon);
            setMatchesPlayed(teamStatistic.matchesPlayed);
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
            history.push('/statistics');
            alert.success('Team Statistics updated successfully');
            dispatch({ type: TEAM_STATISTIC_UPDATE_RESET });
        }

    }, [dispatch, alert, error, isUpdated, history, updateError, teamStatistic, paramTeamId]);
    
    const submitHandler = (e) => {
        e.preventDefault();

        const teamStatistic = {
            'teamId': teamId,
            'trophiesWon': trophiesWon,
            'matchesPlayed': matchesPlayed,
        }

        dispatch(postTeamStatisticRequest(true, teamStatistic))
    }

    return (
        <Fragment>
            <MetaData title={'Update Team Statistic Details'} />
            <div className="row">
                <div className="col-12 col-md-2 remove-padding-sidebar">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler}>
                                <h1 className="mb-4">Update Team Statistics Details</h1>

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

export default UpdateTeamStatistics

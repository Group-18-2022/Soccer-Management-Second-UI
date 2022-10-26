import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';

import MetaData from '../Layout/MetaData';
import Sidebar from '../Layout/Sidebar';

import { getClubRequest, updateClubRequest, clearErrors } from '../../Actions/Club/clubActions';
import { CLUB_UPDATE_RESET } from '../../Constants/Club/clubConstants';

const UpdateClub = ({ match, history }) => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const [clubId, setClubId] = useState('');
    const [clubName, setClubName] = useState('');
    const [clubOwner, setClubOwner] = useState('');
    const [isRegisteredClub, setIsRegisteredClub] = useState('');

    const { club, error } = useSelector(state => state.clubDetails);
    const { loading, error: updateError, isUpdated } = useSelector(state => state.club);

    const paramClubId = match.params.id;

    useEffect(() => {
        if(club && club.clubId !== paramClubId) {
            dispatch(getClubRequest(paramClubId));
        } else {
            setClubId(club.clubId);
            setClubName(club.clubName);
            setClubOwner(club.clubOwner);
            setIsRegisteredClub(club.isRegisteredClub);
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
            history.push('/clubs');
            alert.success('Club updated successfully');
            dispatch({ type: CLUB_UPDATE_RESET });
        }

    }, [dispatch, alert, error, isUpdated, history, updateError, club, paramClubId]);
    
    const submitHandler = (e) => {
        e.preventDefault();

        const club = {
            'clubId': clubId,
            'clubName': clubName,
            'clubOwner': clubOwner,
            'isRegisteredClub': isRegisteredClub,
        }

        dispatch(updateClubRequest(club))
    }

    const comboboxData = [
        { id: 1, value: 'true'},
        { id: 2, value: 'false'}
    ]

    return (
        <Fragment>
            <MetaData title={'Update Club Details'} />
            <div className="row">
                <div className="col-12 col-md-2 remove-padding-sidebar">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler}>
                                <h1 className="mb-4">Update Club Details</h1>

                                <div className="form-group">
                                    <label htmlFor="clubName_field">Club Name</label>
                                    <input
                                        type="text"
                                        id="clubName_field"
                                        className="form-control"
                                        value={clubName}
                                        onChange={(e) => setClubName(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="clubOwner_field"> Club Owner</label>
                                    <input
                                        type="text"
                                        id="clubOwner_field"
                                        className="form-control"
                                        value={clubOwner}
                                        onChange={(e) => setClubOwner(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="isRegisteredClub_field">Registered Club</label>
                                    <select 
                                        id="isRegisteredClub_field" 
                                        className="form-control" 
                                        name="isRegisteredClub_field"
                                        required
                                        value={isRegisteredClub}
                                        onChange={(e) => setIsRegisteredClub(e.target.value)}
                                    >
                                        {
                                            comboboxData.map((v) => (
                                                    <option key={v.id} value={v.value}>
                                                        {v.value}
                                                    </option> 
                                            ))
                                        }
                                    </select>
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

export default UpdateClub

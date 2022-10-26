import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { v4 as uuidv4 } from 'uuid';

import MetaData from '../Layout/MetaData';
import Sidebar from '../Layout/Sidebar';

import { postClubRequest, clearErrors } from '../../Actions/Club/clubActions';
import { CLUB_ADD_RESET } from '../../Constants/Club/clubConstants';

const NewClub = ({ history }) => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const [clubId, setClubId] = useState('');
    const [clubName, setClubName] = useState('');
    const [clubOwner, setClubOwner] = useState('');
    const [isRegisteredClub, setIsRegisteredClub] = useState('');
   

    const { loading, error, success } = useSelector(state => state.newClub);

    useEffect(() => {
        setClubId(uuidv4());

        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if(success) {
            history.push('/clubs');
            alert.success('Club created successfully');
            dispatch({ type: CLUB_ADD_RESET });
        }

    }, [dispatch, alert, error, success, history])


    const submitHandler = (e) => {
        e.preventDefault();

        const club = {
            'clubId': clubId,
            'clubName': clubName,
            'clubOwner': clubOwner,
            'isRegisteredClub': isRegisteredClub
        }

        dispatch(postClubRequest(club))
    }

    const comboboxData = [
        { id: 1, value: 'true'},
        { id: 2, value: 'false'}
    ]

    return (
        <Fragment>
            <MetaData title={'New Club'} />
            <div className="row">
                <div className="col-12 col-md-2 remove-padding-sidebar">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler}>
                                <h1 className="mb-4">Add Club</h1>

                                {/* <div className="form-group">
                                    <label htmlFor="clubID_field">Club ID</label>
                                    <input
                                        type="text"
                                        id="clubID_field"
                                        className="form-control"
                                        value={clubId}
                                        onChange={(e) => setClubId(e.target.value)}
                                    />
                                </div> */}

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
                                    <label htmlFor="clubOwner_field">Club Owner</label>
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

export default NewClub

import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { v4 as uuidv4 } from 'uuid';


import MetaData from '../Layout/MetaData';
import Sidebar from '../Layout/Sidebar';

import { postSponsorRequest, clearErrors } from '../../Actions/Entity/sponsorActions';
import { SPONSOR_ADD_RESET } from '../../Constants/Entity/sponsorConstants';

const NewSponsor = ({ history }) => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const [roleID, setRoleID] = useState('');
    const [taxNumber, setTaxNumber] = useState('');
    const [companyName, setCompanyName] = useState('');

    const { loading, error, success } = useSelector(state => state.newSponsor);

    useEffect(() => {
        setRoleID(uuidv4())

        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if(success) {
            history.push('/sponsors');
            alert.success('Sponsor created successfully');
            dispatch({ type: SPONSOR_ADD_RESET });
        }

    }, [dispatch, alert, error, success, history])


    const submitHandler = (e) => {
        e.preventDefault();

        const sponsor = {
            'roleId': roleID,
            'taxNumber': taxNumber,
            'companyName': companyName,
        }

        dispatch(postSponsorRequest(false, sponsor))
    }

    return (
        <Fragment>
            <MetaData title={'New Sponsor'} />
            <div className="row">
                <div className="col-12 col-md-2 remove-padding-sidebar">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler}>
                                <h1 className="mb-4">Add Sponsor</h1>

                                <div className="form-group">
                                    <label htmlFor="roleID_field">Role ID</label>
                                    <input
                                        type="text"
                                        id="roleID_field"
                                        className="form-control"
                                        disabled
                                        value={roleID}
                                        onChange={(e) => setRoleID(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="taxNumber_field">Tax Number</label>
                                    <input
                                        type="text"
                                        id="taxNumber_field"
                                        className="form-control"
                                        value={taxNumber}
                                        onChange={(e) => setTaxNumber(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="companyName_field">Company Name</label>
                                    <input
                                        type="text"
                                        id="companyName_field"
                                        className="form-control"
                                        value={companyName}
                                        onChange={(e) => setCompanyName(e.target.value)}
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

export default NewSponsor
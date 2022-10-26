import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';

import MetaData from '../Layout/MetaData';
import Sidebar from '../Layout/Sidebar';

import { getSponsorRequest, postSponsorRequest, clearErrors } from '../../Actions/Entity/sponsorActions';
import { SPONSOR_UPDATE_RESET } from '../../Constants/Entity/sponsorConstants';

const UpdateSponsor = ({ match, history }) => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const [roleID, setRoleID] = useState('');
    const [taxNumber, setTaxNumber] = useState('');
    const [companyName, setCompanyName] = useState('');

    const { sponsor, error } = useSelector(state => state.sponsorDetails);
    const { loading, error: updateError, isUpdated } = useSelector(state => state.sponsor);

    const paramRoleID = match.params.id;

    useEffect(() => {
        if(sponsor && sponsor.roleId !== paramRoleID) {
            dispatch(getSponsorRequest(paramRoleID));
        } else {
            setRoleID(sponsor.roleId);
            setTaxNumber(sponsor.taxNumber);
            setCompanyName(sponsor.companyName);
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
            history.push('/sponsors');
            alert.success('Sponsor updated successfully');
            dispatch({ type: SPONSOR_UPDATE_RESET });
        }

    }, [dispatch, alert, error, isUpdated, history, updateError, sponsor, paramRoleID]);
    
    const submitHandler = (e) => {
        e.preventDefault();

        const sponsor = {
            'roleId': roleID,
            'taxNumber': taxNumber,
            'companyName': companyName,
        }

        dispatch(postSponsorRequest(true, sponsor))
    }

    return (
        <Fragment>
            <MetaData title={'Update Sponsor Details'} />
            <div className="row">
                <div className="col-12 col-md-2 remove-padding-sidebar">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler}>
                                <h1 className="mb-4">Update Sponsor Details</h1>

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

export default UpdateSponsor
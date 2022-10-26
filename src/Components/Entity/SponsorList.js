import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MDBDataTable } from 'mdbreact';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';

import MetaData from '../Layout/MetaData';
import Loader from '../Layout/Loader';
import Sidebar from '../Layout/Sidebar';

import { getAllSponsorsRequest, deleteSponsorRequest, clearErrors } from '../../Actions/Entity/sponsorActions';
import { SPONSOR_DELETE_RESET } from '../../Constants/Entity/sponsorConstants';

const SponsorList = ({ history }) => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, sponsors } = useSelector(state => state.sponsors);
    const { error: deleteError, isDeleted } = useSelector(state => state.sponsor)

    useEffect(() => {
        dispatch(getAllSponsorsRequest());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('SPONSOR deleted successfully');
            history.push('/sponsors');
            dispatch({ type: SPONSOR_DELETE_RESET })
        }

    }, [dispatch, alert, error, deleteError, isDeleted, history])

    const setSponsors = () => {
        const data = {
            columns: [
                {
                    label: 'Role Id',
                    field: 'roleID',
                    sort: 'asc'
                },
                {
                    label: 'Tax Number',
                    field: 'taxNumber',
                    sort: 'asc'
                },
                {
                    label: 'Company Name',
                    field: 'companyName',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        sponsors.forEach(sponsor => {
            data.rows.push({
                roleID: sponsor.roleId,
                taxNumber: sponsor.taxNumber,
                companyName: sponsor.companyName,
                actions: <Fragment>
                    <Link to={`/sponsor/${sponsor.roleId}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteSponsorHandler(sponsor.roleId)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            })
        })

        return data;
    }

    const deleteSponsorHandler = (id) => {
        dispatch(deleteSponsorRequest(id))
    }

    return (
        <Fragment>
            <MetaData title={'All Sponsors'} />
            <div className="row">
                <div className="col-12 col-md-2 remove-padding-sidebar">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">All Sponsors</h1>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setSponsors()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        )}

                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default SponsorList
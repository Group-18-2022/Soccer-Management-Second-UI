import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MDBDataTable } from 'mdbreact';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';

import MetaData from '../Layout/MetaData';
import Loader from '../Layout/Loader';
import Sidebar from '../Layout/Sidebar';

import { getAllContactInformationsRequest, deleteContactInformationRequest, clearErrors } from '../../Actions/Club/contactInformationAction';
import { CONTACT_INFORMATION_DELETE_RESET } from '../../Constants/Club/contactInformationConstants';

const ContactInformationList = ({ history }) => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, contactInformations } = useSelector(state => state.contactInformations);
    const { error: deleteError, isDeleted } = useSelector(state => state.contactInformation)

    useEffect(() => {
        dispatch(getAllContactInformationsRequest());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('Contact Information deleted successfully');
            history.push('/contactInformations');
            dispatch({ type: CONTACT_INFORMATION_DELETE_RESET })
        }

    }, [dispatch, alert, error, deleteError, isDeleted, history])

    const setContactInformations = () => {
        const data = {
            columns: [{
                    label: 'Contact ID',
                    field: 'contactID',
                    sort: 'asc'
                },
                {
                    label: 'Street Name',
                    field: 'streetName',
                    sort: 'asc'
                },
                {
                    label: 'Street Number',
                    field: 'streetNumber',
                    sort: 'asc'
                },
                {
                    label: 'Area',
                    field: 'Area',
                    sort: 'asc'
                },
                {
                    label: 'City',
                    field: 'City',
                    sort: 'asc'
                },
                {
                    label: 'Zip Code',
                    field: 'zipCode',
                    sort: 'asc'
                },
                {
                    label: 'Phone Number',
                    field: 'phoneNumber',
                    sort: 'asc'
                },
                {
                    label: 'Email Address',
                    field: 'emailAddress',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }
        contactInformations.forEach(contactInformation => {
            data.rows.push({
                contactID: contactInformation.contactId,
    		    streetName: contactInformation.streetName,
                streetNumber: contactInformation.streetNumber,
                Area: contactInformation.area,
                City: contactInformation.city,
                zipCode: contactInformation.zipCode,
                phoneNumber: contactInformation.phoneNumber,
                emailAddress: contactInformation.emailAddress,
                actions: <Fragment>
                    <Link to={`/contactInformation/${contactInformation.contactId}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteContactInformationHandler(contactInformation.contactId)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            })
        })

        return data;
    }

    const deleteContactInformationHandler = (id) => {
        dispatch(deleteContactInformationRequest(id))
    }

    return (
        <Fragment>
            <MetaData title={'All Contact Information'} />
            <div className="row">
                <div className="col-12 col-md-2 remove-padding-sidebar">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">All Contact Information</h1>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setContactInformations()}
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

export default ContactInformationList

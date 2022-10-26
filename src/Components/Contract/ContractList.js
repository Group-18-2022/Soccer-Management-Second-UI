import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MDBDataTable } from 'mdbreact';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';

import MetaData from '../Layout/MetaData';
import Loader from '../Layout/Loader';
import Sidebar from '../Layout/Sidebar';

import { getAllContractRequest, deleteContractRequest, clearErrors } from '../../Actions/Contract/contractActions';
import { CONTRACT_DELETE_RESET } from '../../Constants/Contract/contractConstants';

const ContractList = ({ history }) => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, contracts } = useSelector(state => state.contracts);
    const { error: deleteError, isDeleted } = useSelector(state => state.contract)

    useEffect(() => {
        dispatch(getAllContractRequest());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('Contract deleted successfully');
            history.push('/contract');
            dispatch({ type: CONTRACT_DELETE_RESET })
        }

    }, [dispatch, alert, error, deleteError, isDeleted, history])

    const setContracts = () => {
        const data = {
            columns: [
                {
                    label: 'Signed Date',
                    field: 'signedDate',
                    sort: 'asc'
                },
                {
                    label: 'Ex Date',
                    field: 'exDate',
                    sort: 'asc'
                },
                {
                    label: 'Signed Location',
                    field: 'signedLocation',
                    sort: 'asc'
                },

                {
                    label: 'Duration',
                    field: 'duration',
                    sort: 'asc'
                },

                {
                    label: 'Date Of Birth',
                    field: 'dateOfBirth',
                    sort: 'asc'
                },
                {
                    label: 'First Name',
                    field: 'firstName',
                    sort: 'asc'
                },
                {
                    label: 'Surname',
                    field: 'surname',
                    sort: 'asc'
                },
                {
                    label: 'ID Number',
                    field: 'idNumber',
                    sort: 'asc'
                },

                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }


        contracts.forEach(contract => {
            data.rows.push({
                dateOfBirth: contract.personalDetails.dateOfBirth,
                firstName: contract.personalDetails.firstName,
                surname: contract.personalDetails.surname,
                idNumber: contract.personalDetails.idNumber,
                signedDate: contract.signedDate,
                exDate: contract.exDate,
                signedLocation: contract.signedLocation,
                duration: contract.duration,
                actions: <Fragment>
                    <Link to={`/contract/${contract.signedDate}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteContractHandler(contract.signedDate)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            })
        })

        return data;
    }

    const deleteContractHandler = (id) => {
        dispatch(deleteContractRequest(id))
    }

    return (
        <Fragment>
            <MetaData title={'All Contracts'} />
            <div className="row">
                <div className="col-12 col-md-2 remove-padding-sidebar">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">All Contracts</h1>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setContracts()}
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

export default ContractList
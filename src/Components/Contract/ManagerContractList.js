import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MDBDataTable } from 'mdbreact';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';

import MetaData from '../Layout/MetaData';
import Loader from '../Layout/Loader';
import Sidebar from '../Layout/Sidebar';

import { getAllManagerContractRequest, deleteManagerContractRequest, clearErrors } from '../../Actions/Contract/managerContractActions';
import { MANAGER_CONTRACT_DELETE_RESET } from '../../Constants/Contract/managerContractConstants';

const ManagerContractList = ({ history }) => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, managerContracts } = useSelector(state => state.managerContracts);
    const { error: deleteError, isDeleted } = useSelector(state => state.managerContract)

    useEffect(() => {
        dispatch(getAllManagerContractRequest());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('Manager Contract deleted successfully');
            history.push('/managerContract');
            dispatch({ type: MANAGER_CONTRACT_DELETE_RESET })
        }

    }, [dispatch, alert, error, deleteError, isDeleted, history])

    const setManagerContracts = () => {
        const data = {
            columns: [
                {
                    label: 'Contract ID',
                    field: 'contractId',
                    sort: 'asc'
                },
                {
                    label: 'Mile Stone',
                    field: 'mileStone',
                    sort: 'asc'
                },

                {
                    label: 'Number of Grievance',
                    field: 'numberofGrievance',
                    sort: 'asc'
                },

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
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }


        managerContracts.forEach(managerContract => {
            data.rows.push({
                contractId: managerContract.contractId,
                mileStone: managerContract.milestonesOnTime,
                numberofGrievance: managerContract.numberofGrievance,
                signedDate: managerContract.contract.signedDate,
                exDate: managerContract.contract.expDate,
                signedLocation:managerContract.contract.signedLocation,
                duration: managerContract.contract.duration,
                actions: <Fragment>
                    <Link to={`/managerContract/${managerContract.contractId}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteManagerContractHandler(managerContract.contractId)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            })
        })

        return data;
    }

    const deleteManagerContractHandler = (id) => {
        dispatch(deleteManagerContractRequest(id))
    }

    return (
        <Fragment>
            <MetaData title={'All Manager Contracts'} />
            <div className="row">
                <div className="col-12 col-md-2 remove-padding-sidebar">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">All Manager Contracts</h1>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setManagerContracts()}
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

export default ManagerContractList
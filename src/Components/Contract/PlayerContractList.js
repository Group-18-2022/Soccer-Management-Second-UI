import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MDBDataTable } from 'mdbreact';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';

import MetaData from '../Layout/MetaData';
import Loader from '../Layout/Loader';
import Sidebar from '../Layout/Sidebar';

import { getAllPlayerContractRequest, deletePlayerContractRequest, clearErrors } from '../../Actions/Contract/playerContractActions';
import { PLAYER_CONTRACT_DELETE_RESET } from '../../Constants/Contract/playerContractConstants';

const PlayerContractList = ({ history }) => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, playerContracts } = useSelector(state => state.playerContracts);
    const { error: deleteError, isDeleted } = useSelector(state => state.playerContract)

    useEffect(() => {
        dispatch(getAllPlayerContractRequest());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('Player Contract deleted successfully');
            history.push('/playerContract');
            dispatch({ type: PLAYER_CONTRACT_DELETE_RESET })
        }

    }, [dispatch, alert, error, deleteError, isDeleted, history])

    const setPlayerContracts = () => {
        const data = {
            columns: [
                {
                    label: 'Contract ID',
                    field: 'contractId',
                    sort: 'asc'
                },
                {
                    label: 'Goal Target',
                    field: 'goalTarget',
                    sort: 'asc'
                },
                {
                    label: 'Matches Played',
                    field: 'matchesPlayed',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        console.log("PlayerContract", playerContracts);

        playerContracts.forEach(playerContract => {
            data.rows.push({
                contractId: playerContract.contractId,
                goalTarget: playerContract.goalTarget,
                matchesPlayed: playerContract.matchesPlayed,
                actions: <Fragment>
                    <Link to={`/playerContract/${playerContract.contractId}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deletePlayerContractHandler(playerContract.contractId)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            })
        })

        return data;
    }

    const deletePlayerContractHandler = (id) => {
        dispatch(deletePlayerContractRequest(id))
    }

    return (
        <Fragment>
            <MetaData title={'All Player Contracts'} />
            <div className="row">
                <div className="col-12 col-md-2 remove-padding-sidebar">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">All Player Contracts</h1>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setPlayerContracts()}
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

export default PlayerContractList

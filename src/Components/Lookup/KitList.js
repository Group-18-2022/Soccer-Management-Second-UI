import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MDBDataTable } from 'mdbreact';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';

import MetaData from '../Layout/MetaData';
import Loader from '../Layout/Loader';
import Sidebar from '../Layout/Sidebar';

import { getAllKitsRequest, deleteKitRequest, clearErrors } from '../../Actions/Lookup/kitActions';
import { KIT_DELETE_RESET } from '../../Constants/Lookup/kitConstants';

const KitList = ({ history }) => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, kits } = useSelector(state => state.kits);
    const { error: deleteError, isDeleted } = useSelector(state => state.kit)

    useEffect(() => {
        dispatch(getAllKitsRequest());

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('Kit deleted successfully');
            history.push('/kits');
            dispatch({ type: KIT_DELETE_RESET })
        }

    }, [dispatch, alert, error, deleteError, isDeleted, history])

    const setKits = () => {
        const data = {
            columns: [
                {
                    label: 'Kit Type',
                    field: 'kitType',
                    sort: 'asc'
                },
                {
                    label: 'Kit Brand',
                    field: 'kitBrand',
                    sort: 'asc'
                },
                {
                    label: 'Kit Colour',
                    field: 'kitColor',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        kits.forEach(kit => {
            data.rows.push({
                kitType: kit.kitType,
                kitBrand: kit.kitBrand,
                kitColor: kit.kitColor,
                actions: <Fragment>
                    <Link to={`/kit/${kit.kitType}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteKitHandler(kit.kitType)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            })
        })

        return data;
    }

    const deleteKitHandler = (id) => {
        dispatch(deleteKitRequest(id))
    }

    return (
        <Fragment>
            <MetaData title={'All Kits'} />
            <div className="row">
                <div className="col-12 col-md-2 remove-padding-sidebar">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">All Kits</h1>

                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setKits()}
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

export default KitList

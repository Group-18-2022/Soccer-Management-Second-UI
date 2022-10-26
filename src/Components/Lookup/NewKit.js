import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';

import MetaData from '../Layout/MetaData';
import Sidebar from '../Layout/Sidebar';

import { postKitRequest, clearErrors } from '../../Actions/Lookup/kitActions';
import { KIT_ADD_RESET } from '../../Constants/Lookup/kitConstants';

const NewKit = ({ history }) => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const [kitType, setKitType] = useState('DEFAULT');
    const [kitBrand, setKitBrand] = useState('');
    const [kitColor, setKitColor] = useState('');

    const { loading, error, success } = useSelector(state => state.newKit);

    useEffect(() => {
        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if(success) {
            history.push('/kits');
            alert.success('Kit created successfully');
            dispatch({ type: KIT_ADD_RESET });
        }

    }, [dispatch, alert, error, success, history])


    const submitHandler = (e) => {
        e.preventDefault();

        const kit = {
            'kitType': kitType,
            'kitBrand': kitBrand,
            'kitColor': kitColor,
        }

        dispatch(postKitRequest(false, kit))
    }

    return (
        <Fragment>
            <MetaData title={'New Kit'} />
            <div className="row">
                <div className="col-12 col-md-2 remove-padding-sidebar">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler}>
                                <h1 className="mb-4">Add Kit</h1>

                                <div className="form-group">
                                    <label htmlFor="kitType_field">Kit Type</label>
                                    <input
                                        type="text"
                                        id="kitType_field"
                                        className="form-control"
                                        value={kitType}
                                        onChange={(e) => setKitType(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="kitBrand_field">Kit Brand</label>
                                    <input
                                        type="text"
                                        id="kitBrand_field"
                                        className="form-control"
                                        value={kitBrand}
                                        onChange={(e) => setKitBrand(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="kitColor_field">Kit Colour</label>
                                    <input
                                        type="text"
                                        id="kitColor_field"
                                        className="form-control"
                                        value={kitColor}
                                        onChange={(e) => setKitColor(e.target.value)}
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

export default NewKit

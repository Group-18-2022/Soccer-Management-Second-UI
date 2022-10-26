import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';

import MetaData from '../Layout/MetaData';
import Sidebar from '../Layout/Sidebar';

import { getKitRequest, postKitRequest, clearErrors } from '../../Actions/Lookup/kitActions';
import { KIT_UPDATE_RESET } from '../../Constants/Lookup/kitConstants';

const UpdateKit = ({ match, history }) => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const [kitType, setKitType] = useState('DEFAULT');
    const [kitBrand, setKitBrand] = useState('');
    const [kitColor, setKitColor] = useState('');

    const { kit, error } = useSelector(state => state.kitDetails);
    const { loading, error: updateError, isUpdated } = useSelector(state => state.kit);

    const paramKitId = match.params.id;

    useEffect(() => {
        if(kit && kit.kitType !== paramKitId) {
            dispatch(getKitRequest(paramKitId));
        } else {
            setKitType(kit.kitType);
            setKitBrand(kit.kitBrand);
            setKitColor(kit.kitColor);
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
            history.push('/kits');
            alert.success('Kit updated successfully');
            dispatch({ type: KIT_UPDATE_RESET });
        }

    }, [dispatch, alert, error, isUpdated, history, updateError, kit, paramKitId]);
    
    const submitHandler = (e) => {
        e.preventDefault();

        const kit = {
            'kitType': kitType,
            'kitBrand': kitBrand,
            'kitColor': kitColor,
        }

        dispatch(postKitRequest(true, kit))
    }

    return (
        <Fragment>
            <MetaData title={'Update Kit Details'} />
            <div className="row">
                <div className="col-12 col-md-2 remove-padding-sidebar">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="shadow-lg" onSubmit={submitHandler}>
                                <h1 className="mb-4">Update Kit Details</h1>

                                <div className="form-group">
                                    <label htmlFor="kitType_field">Kit Type</label>
                                    <input
                                        type="text"
                                        id="kitType_field"
                                        className="form-control"
                                        disabled
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

export default UpdateKit

import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';

import Loader from '../Layout/Loader';
import MetaData from '../Layout/MetaData';
import { login, clearErrors } from '../../Actions/Entity/userActions';

const Login = ({ history, location }) => {
        const [email, setEmail] = useState('');
        const [name, setName] = useState('');
    
        const alert = useAlert();
        const dispatch = useDispatch();
    
        const { isAuthenticated, error, loading } = useSelector(state => state.auth);
    
        useEffect(() => {
    
            if (isAuthenticated) {
                history.push('/home')
            }
    
            if (loading && error) {
                alert.error(error);
                dispatch(clearErrors());
            }
    
        }, [dispatch, alert, isAuthenticated, error, history])
    
        const submitHandler = (e) => {
            e.preventDefault();
            dispatch(login(name, email))
        }

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Login'} />

                    <div className="row wrapper">
                        <div className="col-10 col-lg-5">
                            <form className="shadow-lg" onSubmit={submitHandler}>
                                <h1 className="mb-3">Login</h1>
                                <div className="form-group">
                                    <label htmlFor="email_field">Email</label>
                                    <input
                                        type="email"
                                        id="email_field"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="name_field">Name</label>
                                    <input
                                        type="text"
                                        id="name_field"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <Link to="/password/forgot" className="float-right mb-4">Forgot Password?</Link>

                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-block py-3"
                                >
                                    LOGIN
                                </button>

                            </form>
                        </div>
                    </div>


                </Fragment>
            )}
        </Fragment>
    )
}

export default Login

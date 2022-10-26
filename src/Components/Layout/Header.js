import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import '../../App.css';

import { logout } from '../../Actions/Entity/userActions';

const Header = () => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { user } = useSelector(state => state.auth);
    console.log("User", user);

    const logoutHandler = () => {
        dispatch(logout());
        alert.success("Logged out successfully");
    }

    return (
    <Fragment>
        <nav className="navbar row">    
            <div className="col-12 col-md-3">
                <div className="navbar-brand">
                    <Link to="/">
                        <img class="navbar-img" src="/images/Group18.png" alt="Soccer Club Management System Logo"/>
                    </Link>
                </div>
            </div>

            <div className="col-12 col-md-6 mt-2 mt-md-0 main_heading">
                Soccer Club Management System  
            </div>

            <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                <div className="ml-4 dropdown d-inline">
                    <Link to="#!" className="btn dropdown-toggle text-white mr-4" type="button" id="dropDownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                        <figure className="avatar avatar-nav">
                            <img
                                src="/images/default_avatar.jpg"
                                alt="User Profile"
                                className="rounded-circle"
                            />
                        </figure>
                        <span>{user && user.personalDetails && user.personalDetails.firstName}</span>
                    </Link>

                    <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">

                        <Link className="dropdown-item" to="/home">Dashboard</Link>
                        <Link className="dropdown-item text-danger" to="/" onClick={logoutHandler}>
                            Logout
                        </Link>

                    </div>


                </div>

                
                
            </div>
        </nav>
    </Fragment>
    )
}

export default Header

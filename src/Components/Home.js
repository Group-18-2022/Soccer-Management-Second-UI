import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { Link } from 'react-router-dom';

import MetaData from './Layout/MetaData';
// import Loader from '../Layout/Loader';
import Sidebar from './Layout/Sidebar';

import { getAllSoccerMatchRequst } from '../Actions/Match/soccerMatchActions';
import { getAllPlayersRequest } from '../Actions/Entity/playerActions';
import { getAllManagersRequest } from '../Actions/Entity/managerActions';

function Home() {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { matches } = useSelector(state => state.matches);
    const { managers } = useSelector(state => state.managers);
    const { players } = useSelector(state => state.players);

    useEffect(() => {
        dispatch(getAllSoccerMatchRequst());
        dispatch(getAllManagersRequest());
        dispatch(getAllPlayersRequest());

    }, [dispatch, alert])


  return (
    <Fragment>
            <div className="row">
                <div className="col-12 col-md-2 remove-padding-sidebar">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <h1 className="my-4">Dashboard</h1>

                        <Fragment>
                            <MetaData title={'Managers Dashboard'} />

                            <div className="row pr-4">
                                <div className="col-xl-12 col-sm-12 mb-3">
                                    <div className="card text-white bg-primary o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Total Players<br /> <b>20</b>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row pr-4">
                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-success o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Matches<br /> <b>{matches && matches.length} remaining</b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/matches">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>


                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-danger o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Total Players<br /> <b>{players && players.length}</b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/users">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>


                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-info o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Total Managers<br /> <b>{managers && managers.length}</b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/users">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>


                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="card text-white bg-info o-hidden h-100">
                                        <div className="card-body">
                                            <div className="text-center card-font-size">Users<br /> <b>{managers && players && managers.length + players.length}</b></div>
                                        </div>
                                        <Link className="card-footer text-white clearfix small z-1" to="/users">
                                            <span className="float-left">View Details</span>
                                            <span className="float-right">
                                                <i className="fa fa-angle-right"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </Fragment>
                 </div>
            </div>
        </Fragment >           
  )
}

export default Home
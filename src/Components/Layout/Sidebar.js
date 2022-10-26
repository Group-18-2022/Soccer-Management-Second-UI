import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="sidebar-wrapper">
            <nav id="sidebar">
                <ul className="list-unstyled components">
                    <li>
                        <Link to="/home"><i className="fa fa-tachometer"></i> Dashboard</Link>
                    </li>

                    <li>
                        <a href="#clubSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                            className="fa fa-building-o"></i> Club</a>
                        <ul className="collapse list-unstyled" id="clubSubmenu">
                            <li>
                                <Link to="/clubs"><i className="fa fa-clipboard"></i> All</Link>
                            </li>

                            <li>
                                <Link to="/new/club"><i className="fa fa-plus"></i> Create</Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <a href="#userSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                            className="fa fa-user"></i> Users</a>
                        <ul className="collapse list-unstyled" id="userSubmenu">
                            <li>
                                <Link to="/users"><i className="fa fa-clipboard"></i> All</Link>
                            </li>

                            <li>
                                <Link to="/new/manager"><i className="fa fa-plus"></i> Create Manager</Link>
                            </li>

                            <li>
                                <Link to="/new/player"><i className="fa fa-user-plus"></i> Create Player</Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <a href="#teamSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                            className="fa fa-users"></i> Team</a>
                        <ul className="collapse list-unstyled" id="teamSubmenu">
                            <li>
                                <Link to="/teams"><i className="fa fa-clipboard"></i> All</Link>
                            </li>

                            <li>
                                <Link to="/new/team"><i className="fa fa-plus"></i> Create</Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <a href="#soccerMatchSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                            className="fa fa-soccer-ball-o"></i> Soccer Match</a>
                        <ul className="collapse list-unstyled" id="soccerMatchSubmenu">
                            <li>
                                <Link to="/matches"><i className="fa fa-clipboard"></i> All</Link>
                            </li>

                            <li>
                                <Link to="/new/match"><i className="fa fa-plus"></i> Create</Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <a href="#locationSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                            className="fa fa-location-arrow"></i> Location</a>
                        <ul className="collapse list-unstyled" id="locationSubmenu">
                            <li>
                                <Link to="/locations"><i className="fa fa-clipboard"></i> All</Link>
                            </li>

                            <li>
                                <Link to="/new/location"><i className="fa fa-plus"></i> Create</Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <a href="#kitSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                            className="fa fa-child"></i> Kit</a>
                        <ul className="collapse list-unstyled" id="kitSubmenu">
                            <li>
                                <Link to="/kits"><i className="fa fa-clipboard"></i> All</Link>
                            </li>

                            <li>
                                <Link to="/new/kit"><i className="fa fa-plus"></i> Create</Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <a href="#matchScoreSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                            className="fa fa-get-pocket"></i> Scores</a>
                        <ul className="collapse list-unstyled" id="matchScoreSubmenu">
                            <li>
                                <Link to="/matchScores"><i className="fa fa-clipboard"></i> All</Link>
                            </li>

                            <li>
                                <Link to="/new/matchScore"><i className="fa fa-plus"></i> Create</Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <a href="#contactInformationSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                            className="fa fa-phone-square"></i> Contact Info</a>
                        <ul className="collapse list-unstyled" id="contactInformationSubmenu">
                            <li>
                                <Link to="/contactInformations"><i className="fa fa-clipboard"></i> All</Link>
                            </li>

                            <li>
                                <Link to="/new/contactInformation"><i className="fa fa-plus"></i> Create</Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <a href="#statisticSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                            className="fa fa-calculator"></i> Statistics</a>
                        <ul className="collapse list-unstyled" id="statisticSubmenu">
                            <li>
                                <Link to="/statistics"><i className="fa fa-clipboard"></i> All</Link>
                            </li>

                            <li>
                                <Link to="/new/statistic"><i className="fa fa-plus"></i> Create</Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <a href="#contractSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                            className="fa fa-paperclip"></i> Contracts</a>
                        <ul className="collapse list-unstyled" id="contractSubmenu">
                            <li>
                                <Link to="/managerContracts"><i className="fa fa-clipboard"></i> Manager Contracts</Link>
                            </li>

                            <li>
                                <Link to="/new/managerContract"><i className="fa fa-plus"></i> Create Manager Contract</Link>
                            </li>

                            <li>
                                <Link to="/playerContracts"><i className="fa fa-clipboard"></i> Player Contracts</Link>
                            </li>

                            <li>
                                <Link to="/new/playerContract"><i className="fa fa-plus"></i> Create Player Contract</Link>
                            </li>
                            
                        </ul>
                    </li>
                    
                    <li>
                        <a href="#vehicleSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                            className="fa fa-car"></i> Vehicle</a>
                        <ul className="collapse list-unstyled" id="vehicleSubmenu">
                            <li>
                                <Link to="/vehicles"><i className="fa fa-clipboard"></i> All</Link>
                            </li>

                            <li>
                                <Link to="/new/vehicle"><i className="fa fa-plus"></i> Create</Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <a href="#sponsorSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                            className="fa fa-money"></i> Sponsor</a>
                        <ul className="collapse list-unstyled" id="sponsorSubmenu">
                            <li>
                                <Link to="/sponsors"><i className="fa fa-clipboard"></i> All</Link>
                            </li>

                            <li>
                                <Link to="/new/sponsor"><i className="fa fa-plus"></i> Create</Link>
                            </li>
                        </ul>
                    </li>

                </ul>
            </nav>
        </div>
    )
}

export default Sidebar

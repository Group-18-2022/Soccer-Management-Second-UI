import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';

import Header from './Components/Layout/Header';
import Footer from './Components/Layout/Footer';

import Home from './Components/Home';

import NewClub from './Components/Club/NewClub';
import ClubList from './Components/Club/ClubList';
import UpdateClub from './Components/Club/UpdateClub';

import NewContactInformation from './Components/Club/NewContactInformation';
import ContactInformationList from './Components/Club/ContactInformationList';
import UpdateContactInformation from './Components/Club/UpdateContactInformation';

import NewSoccerMatch from './Components/Match/NewSoccerMatch';
import SoccerMatchList from './Components/Match/SoccerMatchList';
import UpdateMatch from './Components/Match/UpdateSoccerMatch';

import NewLocation from './Components/Match/NewLocation';
import LocationList from './Components/Match/LocationList';
import UpdateLocation from './Components/Match/UpdateLocation';

import NewKit from './Components/Lookup/NewKit';
import KitList from './Components/Lookup/KitList';
import UpdateKit from './Components/Lookup/UpdateKit';

import NewMatchScore from './Components/Match/NewMatchScore';
import MatchScoreList from './Components/Match/MatchScoreList';
import UpdateMatchScore from './Components/Match/UpdateMatchScore';

import Login from './Components/Entity/Login';
import UserList from './Components/Entity/UserList';
import NewManager from './Components/Entity/NewManager';
import NewPlayer from './Components/Entity/NewPlayer';
import UpdateManager from './Components/Entity/UpdateManager';
import UpdatePlayer from './Components/Entity/UpdatePlayer';

import NewVehicle from './Components/Club/NewVehicle';
import VehicleList from './Components/Club/VehicleList';
import UpdateVehicle from './Components/Club/UpdateVehicle';

import NewSponsor from './Components/Entity/NewSponsor';
import SponsorList from './Components/Entity/SponsorList';
import UpdateSponsor from './Components/Entity/UpdateSponsor';

import ManagerContractList from './Components/Contract/ManagerContractList';
import NewManagerContract from './Components/Contract/NewManagerContract';
import UpdateManagerContract from './Components/Contract/UpdateManagerContract';

import PlayerContractList from './Components/Contract/PlayerContractList';
import NewPlayerContract from './Components/Contract/NewPlayerContract';
import UpdatePlayerContract from './Components/Contract/UpdatePlayerContract';

import TeamList from './Components/Team/TeamList';
import NewTeam from './Components/Team/NewTeam';
import UpdateTeam from './Components/Team/UpdateTeam';

import TeamStatisticsList from './Components/Team/TeamStatisticsList';
import NewTeamStatistics from './Components/Team/NewTeamStatistics';
import UpdateTeamStatistics from './Components/Team/UpdateTeamStatistics';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

          <div className="container-fluid">

            <Route path = "/" component={Login} exact/>
            {/* <Route path = "/" component={Home} exact/> */}
            <Route path = "/home" component={Home} exact/>

            {/* Contact Information Routes */}
            <Route path = "/clubs" component={ClubList} exact/>
            <Route path = "/new/club" component={NewClub} exact/>
            <Route path="/club/:id" component={UpdateClub} exact/>
            
            {/* Club Routes */}
            <Route path = "/contactinformations" component={ContactInformationList} exact/>
            <Route path = "/new/contactinformation" component={NewContactInformation} exact/>
            <Route path="/contactinformation/:id" component={UpdateContactInformation} exact/>

            {/* Matches Routes */}
            <Route path = "/matches" component={SoccerMatchList} exact/>
            <Route path = "/new/match" component={NewSoccerMatch} exact/>
            <Route path="/match/:id" component={UpdateMatch} exact />
          
            {/* Locations Routes */}
            <Route path = "/locations" component={LocationList} exact/>
            <Route path = "/new/location" component={NewLocation} exact/>
            <Route path="/location/:id" component={UpdateLocation} exact />

            {/* Kits Routes */}
            <Route path = "/kits" component={KitList} exact/>
            <Route path = "/new/kit" component={NewKit} exact/>
            <Route path="/kit/:id" component={UpdateKit} exact />

            {/* Match Score Routes */}
            <Route path = "/matchScores" component={MatchScoreList} exact/>
            <Route path = "/new/matchScore" component={NewMatchScore} exact/>
            <Route path="/matchScore/:id" component={UpdateMatchScore} exact />

            <Route path = "/users" component={UserList} exact/>
            <Route path = "/new/manager" component={NewManager} exact/>
            <Route path = "/new/player" component={NewPlayer} exact/>
            <Route path="/manager/:id" component={UpdateManager} exact /> 
            <Route path="/player/:id" component={UpdatePlayer} exact /> 

            {/* Vehicle Routes */}
            <Route path = "/vehicles" component={VehicleList} exact/>
            <Route path = "/new/vehicle" component={NewVehicle} exact/>
            <Route path="/vehicle/:id" component={UpdateVehicle} exact />

            {/* Sponsor Routes */}
            <Route path = "/sponsors" component={SponsorList} exact/>
            <Route path = "/new/sponsor" component={NewSponsor} exact/>
            <Route path="/sponsor/:id" component={UpdateSponsor} exact />
            
            <Route path = "/managerContracts" component={ManagerContractList} exact/>
            <Route path = "/new/managerContract" component={NewManagerContract} exact/>
            <Route path="/managerContract/:id" component={UpdateManagerContract} exact />

            <Route path = "/playerContracts" component={PlayerContractList} exact/>
            <Route path = "/new/playerContract" component={NewPlayerContract} exact/>
            <Route path="/playerContract/:id" component={UpdatePlayerContract} exact />

            <Route path = "/teams" component={TeamList} exact/>
            <Route path = "/new/team" component={NewTeam} exact/>
            <Route path="/team/:id" component={UpdateTeam} exact />

            <Route path = "/statistics" component={TeamStatisticsList} exact/>
            <Route path = "/new/statistic" component={NewTeamStatistics} exact/>
            <Route path="/statistic/:id" component={UpdateTeamStatistics} exact />

          </div>

        <Footer />
      
      </div>
    </Router>
  );
}

export default App;

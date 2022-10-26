import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { clubsReducer, newClubReducer, clubReducer, clubDetailsReducer } from './Reducers/Club/clubReducers';
import { contactInformationsReducer, newContactInformationReducer, contactInformationReducer, contactInformationDetailsReducer } from './Reducers/Club/contactInformationReducers';
import { soccerMatchesReducer, newSoccerMatchReducer, matchReducer, soccerMatchDetailsReducer } from './Reducers/Match/soccerMatchReducer';
import { locationsReducer, newLocationReducer, locationReducer, locationDetailsReducer } from './Reducers/Match/locationReducer';
import { kitsReducer, newKitReducer, kitReducer, kitDetailsReducer } from './Reducers/Lookup/kitReducers';
import { matchScoresReducer, newMatchScoreReducer, matchScoreReducer, matchScoreDetailsReducer } from './Reducers/Match/matchScoreReducer';
import { authReducer, userReducer, userDetailsReducer } from './Reducers/Entity/userReducer';
import { managersReducer, newManagerReducer, managerReducer, managerDetailsReducer } from './Reducers/Entity/managerReducer';
import { playersReducer, newPlayerReducer, playerReducer, playerDetailsReducer } from './Reducers/Entity/playerReducer';
import { vehiclesReducer, newVehicleReducer, vehicleReducer, vehicleDetailsReducer } from './Reducers/Club/vehicleReducer';
import { sponsorsReducer, newSponsorReducer, sponsorReducer, sponsorDetailsReducer } from './Reducers/Entity/sponsorReducer';
import { contractsReducer, newContractReducer, contractReducer, contractDetailsReducer } from './Reducers/Contract/contractReducer';
import { managerContractsReducer, newManagerContractReducer, managerContractReducer, managerContractDetailsReducer } from './Reducers/Contract/managerContractReducer';
import { playerContractsReducer, newPlayerContractReducer, playerContractReducer, playerContractDetailsReducer } from './Reducers/Contract/playerContractReducer';
import { teamsReducer, newTeamReducer, teamReducer, teamDetailsReducer } from './Reducers/Team/teamReducer';
import { teamStatisticsReducer, newTeamStatisticReducer, teamStatisticReducer, teamStatisticDetailsReducer } from './Reducers/Team/teamStatisticReducer';

const reducer = combineReducers({

    clubs: clubsReducer,
    club: clubReducer,
    newClub: newClubReducer,
    clubDetails: clubDetailsReducer,

    contactInformations: contactInformationsReducer,
    contactInformation: contactInformationReducer,
    newContactInformation: newContactInformationReducer,
    contactInformationDetails: contactInformationDetailsReducer,

    matches: soccerMatchesReducer,
    soccerMatch: matchReducer,
    newMatch: newSoccerMatchReducer,
    matchDetails: soccerMatchDetailsReducer,

    locations: locationsReducer,
    location: locationReducer,
    newLocation: newLocationReducer,
    locationDetails: locationDetailsReducer,

    kits: kitsReducer,
    kit: kitReducer,
    newKit: newKitReducer,
    kitDetails: kitDetailsReducer,

    matchScores: matchScoresReducer,
    matchScore: matchScoreReducer,
    newMatchScore: newMatchScoreReducer,
    matchScoreDetails: matchScoreDetailsReducer,

    auth: authReducer,
    user: userReducer,
    userDetails: userDetailsReducer,

    managers: managersReducer,
    manager: managerReducer,
    newManager: newManagerReducer,
    managerDetails: managerDetailsReducer,

    players: playersReducer,
    player: playerReducer,
    newPlayer: newPlayerReducer,
    playerDetails: playerDetailsReducer,

    vehicles: vehiclesReducer,
    vehicle: vehicleReducer,
    newVehicle: newVehicleReducer,
    vehicleDetails: vehicleDetailsReducer,

    sponsors: sponsorsReducer,
    sponsor: sponsorReducer,
    newSponsor: newSponsorReducer,
    sponsorDetails: sponsorDetailsReducer,
    
    contracts: contractsReducer,
    contract: contractReducer,
    newContract: newContractReducer,
    contractDetails: contractDetailsReducer,

    managerContracts: managerContractsReducer,
    managerContract: managerContractReducer,
    newManagerContract: newManagerContractReducer,
    managerContractDetails: managerContractDetailsReducer,

    playerContracts: playerContractsReducer,
    playerContract: playerContractReducer,
    newPlayerContract: newPlayerContractReducer,
    playerContractDetails: playerContractDetailsReducer,
    
    teamStatistics: teamStatisticsReducer,
    teamStatistic: teamStatisticReducer,
    newTeamStatistic: newTeamStatisticReducer,
    teamStatisticDetails: teamStatisticDetailsReducer,

    teams: teamsReducer,
    team: teamReducer,
    newTeam: newTeamReducer,
    teamDetails: teamDetailsReducer,
});


const middleware = [thunk];
const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
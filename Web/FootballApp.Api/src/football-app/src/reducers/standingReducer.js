import { standingConstants } from '../constants';

const initialState = {
    standings: [],
    teams: []
};

export const standing = (state = initialState, action) => {
    switch(action.type) {
        case standingConstants.GET_STANDING_REQUEST:
            return initialState;
        case standingConstants.GET_STANDING_SUCCESS:
            return { ...state, standings: action.standings };
        case standingConstants.GET_STANDING_FAILURE:
            return initialState;
        case standingConstants.GET_TEAMS_REQUEST:
            return initialState;
        case standingConstants.GET_TEAMS_SUCCESS:
            return { ...state, teams: { ...action.teams, team: null } };
        case standingConstants.GET_TEAMS_FAILURE:
            return initialState;
        default:
            return state;
    }
};
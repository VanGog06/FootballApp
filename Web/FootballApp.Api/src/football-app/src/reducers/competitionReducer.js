import { competitionConstants } from '../constants';

const initialState = {
    competitions: []
};

export const competition = (state = initialState, action) => {
    switch(action.type) {
        case competitionConstants.GET_ALL_REQUEST:
            return initialState;
        case competitionConstants.GET_ALL_SUCCESS:
            return { competitions: action.competitions };
        case competitionConstants.GET_ALL_FAILURE:
            return initialState;
        default:
            return state;
    }
};
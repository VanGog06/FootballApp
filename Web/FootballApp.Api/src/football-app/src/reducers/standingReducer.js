import { standingConstants } from '../constants';

const initialState = {
    standings: []
};

export const standing = (state = initialState, action) => {
    switch(action.type) {
        case standingConstants.GET_STANDING_REQUEST:
            return initialState;
        case standingConstants.GET_STANDING_SUCCESS:
            return { standings: action.standings };
        case standingConstants.GET_STANDING_FAILURE:
            return initialState;
        default:
            return state;
    }
};
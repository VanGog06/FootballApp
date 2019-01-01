import { alertConstants } from '../constants';

export const alert = (state = {}, action) => {
    switch(action.type) {
        case alertConstants.SUCCESS:
            return {
                type: 'succcess',
                message: action.message
            };
        case alertConstants.ERROR:
            return {
                type: 'danger',
                message: action.message
            };
        case alertConstants.CLEAR:
            return {};
        default:
            return state;
    }
};
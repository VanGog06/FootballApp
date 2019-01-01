import { alertConstants } from '../constants';

export const alert = (state = {}, action) => {
    switch(action.type) {
        case alertConstants.SUCCESS:
            return {
                type: 'alert-succcess',
                message: action.message
            };
        case alertConstants.ERROR:
            return {
                type: 'alert-danger',
                message: action.message
            };
        case alertConstants.CLEAR:
            return {};
        default:
            return state;
    }
};
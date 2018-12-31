import { alertConstants } from '../constants';

const success = (message) => {
    return { type: alertConstants.SUCCESS, message };
};

const error = (message) => {
    return { type: alertConstants.ERRROR, message };
};

const clear = _ => {
    return { type: alertConstants.CLEAR };
};

export const alertActions = {
    success,
    error,
    clear
};
import { userConstants } from '../constants';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export const authentication = (state = initialState, action) => {
    switch(action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: action.user
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.user
            };
        case userConstants.LOGIN_FAILURE:
            return {};
        case userConstants.LOGOUT:
            return {};
        case userConstants.CHANGE_PASSWORD_REQUEST:
            return { ...state, changingPassword: true };
        case userConstants.CHANGE_PASSWORD_SUCCESS:
            return { ...state, changingPassword: false };
        case userConstants.CHANGE_PASSWORD_FAILURE:
            return { ...state, changingPassword: false };
        case userConstants.UPDATE_ACCOUNT_REQUEST:
            return { ...state, updatingAccount: true };
        case userConstants.UPDATE_ACCOUNT_SUCCESS:
            return { ...state, updatingAccount: false, user: action.user };
        case userConstants.UPDATE_ACCOUNT_FAILURE:
            return { ...state, updatingAccount: false };
        default: 
            return state;
    }
};
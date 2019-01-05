import { 
    userConstants,
    appConstants
} from '../constants';
import { userService } from '../services';
import { alertActions } from './';
import { history } from '../helpers';

const loginRequest = (user) => { return { type: userConstants.LOGIN_REQUEST, user }};
const loginSuccess = (user) => { return { type: userConstants.LOGIN_SUCCESS, user }};
const loginFailure = (error) => { return { type: userConstants.LOGIN_FAILURE, error }};

const login = (username, password) => {
    return dispatch => {
        dispatch(loginRequest({ username }));

        userService.login(username, password)
            .then(user => {
                dispatch(loginSuccess(user));
                history.push('/');
            },
            error => {
                dispatch(loginFailure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            });
    };
};

const logout = _ => {
    userService.logout();
    return { type: userConstants.LOGOUT };
};

const registerRequest = (user) => { return { type: userConstants.REGISTER_REQUEST, user }};
const registerSuccess = (user) => { return { type: userConstants.REGISTER_SUCCESS, user }};
const registerFailure = (error) => { return { type: userConstants.REGISTER_FAILURE, error }};

const register = (user) => {
    return dispatch => {
        dispatch(registerRequest(user));

        userService.register(user)
            .then(user => {
                dispatch(registerSuccess(user));
                dispatch(alertActions.success('Registrered successfully'));
            },
            error => {
                dispatch(registerFailure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            });
    };
};

const deleteRequest = _ => { return { type: userConstants.DELETE_REQUEST }};
const deleteSuccess = _ => { return { type: userConstants.DELETE_SUCCESS }};
const deleteFailure = _ => { return { type: userConstants.DELETE_FAILURE }};

const _delete = (id, password) => {
    return dispatch => {
        dispatch(deleteRequest(id));

        userService.delete(id, password)
            .then(_ => {
                dispatch(deleteSuccess());
                history.push('/login');
            },
            error => {
                dispatch(deleteFailure());
                dispatch(alertActions.error(error.toString()));
            });
    };
};

const changePasswordRequest = _ => { return { type: userConstants.CHANGE_PASSWORD_REQUEST }};
const changePasswordSuccess = _ => { return { type: userConstants.CHANGE_PASSWORD_SUCCESS }};
const changePasswordFailure = error => { return { type: userConstants.CHANGE_PASSWORD_FAILURE, error }};

const changePassword = (id, oldPassword, newPassword) => {
    return dispatch => {
        dispatch(changePasswordRequest());

        userService.changePassword(id, oldPassword, newPassword)
            .then(_ => {
                dispatch(changePasswordSuccess());
                dispatch(alertActions.success(appConstants.changedPassword))
            },
            error => {
                dispatch(changePasswordFailure());
                dispatch(alertActions.error(error.toString()));
            });
    };
};

const updateAccountRequest = _ => { return { type: userConstants.UPDATE_ACCOUNT_REQUEST }};
const updateAccountSuccess = user => { return { type: userConstants.UPDATE_ACCOUNT_SUCCESS, user }};
const updateAccountFailure = _ => { return { type: userConstants.UPDATE_ACCOUNT_FAILURE }};

const updateAccount = (id, user) => {
    return dispatch => {
        dispatch(updateAccountRequest());

        userService.updateAccount(id, user.password, user.firstName, user.lastName, user.email)
            .then(user => {
                dispatch(updateAccountSuccess(user));
                dispatch(alertActions.success(appConstants.accountUpdated));
            }, error => {
                dispatch(updateAccountFailure());
                dispatch(alertActions.error(error.toString()));
            });
    }
}

export const userActions = {
    login,
    logout,
    register,
    delete: _delete,
    changePassword,
    updateAccount
};
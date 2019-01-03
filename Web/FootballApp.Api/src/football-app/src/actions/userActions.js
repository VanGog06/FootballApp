import { userConstants, appConstants } from '../constants';
import { userService } from '../services';
import { alertActions } from './';
import { history } from '../helpers'

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

const deleteRequest = (id) => { return { type: userConstants.DELETE_REQUEST, id }};
const deleteSuccess = (id) => { return { type: userConstants.DELETE_SUCCESS, id }};
const deleteFailure = (id, error) => { return { type: userConstants.DELETE_FAILURE, id, error }};

const _delete = (id) => {
    return dispatch => {
        dispatch(deleteRequest(id));

        userService.delete(id)
            .then(_ => {
                dispatch(deleteSuccess(id));
            },
            error => {
                dispatch(deleteFailure(id, error.toString()));
            });
    };
};

const getAllRequest = _ => { return { type: userConstants.GETALL_REQUEST }};
const getAllSuccess = users => { return { type: userConstants.GETALL_SUCCESS, users }};
const getAllFailure = error => { return { type: userConstants.GETALL_FAILURE, error }};

const getAll = _ => {
    return dispatch => {
        dispatch(getAllRequest());

        userService.getAll()
            .then(users => {
                dispatch(getAllSuccess(users));
            },
            error => {
                dispatch(getAllFailure(error.toString()));
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
                dispatch(changePasswordFailure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            });
    };
};

export const userActions = {
    login,
    logout,
    register,
    delete: _delete,
    getAll,
    changePassword
};
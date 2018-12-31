import { userConstants } from '../constants';
import { userService } from '../services';
import { alertActions } from './';
import { history } from '../helpers'

const login = (username, password) => {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(user => {
                dispatch(success(user));
                history.push('/');
            },
            error => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            });
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } };
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } };
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } };
};

const logout = _ => {
    userService.logout();
    return { type: userConstants.LOGOUT };
};

const register = (user) => {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(user => {
                dispatch(success(user));
                dispatch(alertActions.success('Registrered successfully'));
            },
            error => {
                dispatch(failure(error.toString()));
                dispatch(alertActions.error(error.toString()));
            });
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } };
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } };
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } };
};

const _delete = (id) => {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(_ => {
                dispatch(success(id));
            },
            error => {
                dispatch(failure(id, error.toString()));
            });
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } };
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } };
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } };
};

const getAll = _ => {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(users => {
                dispatch(success(users));
            },
            error => {
                dispatch(failure(error.toString()));
            });
    };

    function request() { return { type: userConstants.GETALL_REQUEST } };
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } };
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } };
};

export const userActions = {
    login,
    logout,
    register,
    delete: _delete,
    getAll
};
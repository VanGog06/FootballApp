import fetch from 'cross-fetch';

import { authHeader } from '../helpers';
import { appConstants } from '../constants';

const login = (username, password) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${appConstants.apiUrl}/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            if (user.token) {
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
};

const logout = _ => {
    localStorage.removeItem('user');
}

const register = (user) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${appConstants.apiUrl}/users/register`, requestOptions)
        .then(handleResponse);
}

const _delete = (id, password) => {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(),
        body: JSON.stringify({ password })
    };

    return fetch(`${appConstants.apiUrl}/users/delete/${id}`, requestOptions)
        .then(handleResponse)
        .then(_ => {
            logout();
        });
}

const changePassword = (id, oldPassword, newPassword) => {
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify({
            oldPassword,
            newPassword
        })
    };

    return fetch(`${appConstants.apiUrl}/users/changePassword/${id}`, requestOptions)
        .then(handleResponse);
}

const updateAccount = (id, password, firstName, lastName, email) => {
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify({
            password,
            firstName,
            lastName,
            email
        })
    };

    return fetch(`${appConstants.apiUrl}/users/updateAccount/${id}`, requestOptions)
        .then(handleResponse)
        .then(user => {
            if (user.token) {
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

const handleResponse = (response) => {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                window.location.reload(true);
            }

            let serverErrors = '';

            if (data.errors) {
                Object.keys(data.errors).forEach(key => {
                    serverErrors += `${data.errors[key]}`;
                });
            } else if (data.message) {
                serverErrors = data.message;
            }

            const error = serverErrors || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
};

export const userService = {
    login,
    register,
    logout,
    delete: _delete,
    changePassword,
    updateAccount
};
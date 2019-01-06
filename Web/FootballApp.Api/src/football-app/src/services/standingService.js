import fetch from 'cross-fetch';

import { authHeader } from '../helpers';
import { appConstants } from '../constants';

import { userService } from './';

const getStanding = country => {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${appConstants.apiUrl}/standings/standing/${country}`, requestOptions)
        .then(handleResponse);
};

const getTeams = country => {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${appConstants.apiUrl}/teams/${country}`, requestOptions)
        .then(handleResponse);
}

const handleResponse = (response) => {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                userService.logout();
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

export const standingService = { 
    getStanding,
    getTeams
};
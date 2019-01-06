import { standingConstants } from '../constants';
import { alertActions } from './';

import { standingService } from '../services';

const getStandingRequest = _ => { return { type: standingConstants.GET_STANDING_REQUEST }};
const getStandingSuccess = standings => { return { type: standingConstants.GET_STANDING_SUCCESS, standings }};
const getStandingFailure = _ => { return { type: standingConstants.GET_STANDING_FAILURE }};

const getStanding = country => {
    return dispatch => {
        dispatch(getStandingRequest());

        standingService.getStanding(country)
            .then(standings => {
                dispatch(getStandingSuccess(standings));
            }, error => {
                dispatch(getStandingFailure());
                dispatch(alertActions.error(error.toString()));
            });
    };
};

export const standingActions = { getStanding };
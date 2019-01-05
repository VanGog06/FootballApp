import { competitionConstants } from '../constants';
import { alertActions } from './';
import { competitionService } from '../services';

const getAllRequest = _ => { return { type: competitionConstants.GET_ALL_REQUEST }};
const getAllSuccess = competitions => { return { type: competitionConstants.GET_ALL_SUCCESS, competitions }};
const getAllFailure = _ => { return { type: competitionConstants.GET_ALL_FAILURE }};

const getAll = _ => {
    return dispatch => {
        dispatch(getAllRequest());

        competitionService.getAll()
            .then(competitions => {
                dispatch(getAllSuccess(competitions));
            }, error => {
                dispatch(getAllFailure());
                dispatch(alertActions.error(error.toString()));
            });
    };
}

export const competitionActions = { getAll };
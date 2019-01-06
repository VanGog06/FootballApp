import { combineReducers } from 'redux';

import { authentication } from './authenticationReducer';
import { registration } from './registrationReducer';
import { alert } from './alertReducer';
import { competition } from './competitionReducer';
import { standing } from './standingReducer';

const rootReducer = combineReducers({
    authentication,
    registration,
    alert,
    competition,
    standing
});

export default rootReducer;
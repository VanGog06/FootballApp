import { combineReducers } from 'redux';

import { authentication } from './authenticationReducer';
import { registration } from './registrationReducer';
import { alert } from './alertReducer';
import { competition } from './competitionReducer';

const rootReducer = combineReducers({
    authentication,
    registration,
    alert,
    competition
});

export default rootReducer;
import React from 'react';
import PropTypes from 'prop-types';

import { appConstants } from '../../constants';

const ChangePassword = ({ changing, submitted, username, oldPassword, newPassword, handleChange, handleSubmit}) => (
    <React.Fragment>
        <h2>Change password</h2>
        <form name="form" onSubmit={handleSubmit}>
            <div className='form-group'>
                <label htmlFor="username">Username</label>
                <input type="text" className="form-control" name="username" value={username} disabled="disabled" />
            </div>
            <div className='form-group'>
                <label htmlFor="oldPassword">Old password</label>
                <input type="password" className="form-control" name="oldPassword" value={oldPassword} onChange={handleChange} />
                {submitted && oldPassword.length < appConstants.passwordMinLength &&
                    <div className="error-block">{appConstants.errors.password}</div>
                }
            </div>
            <div className='form-group'>
                <label htmlFor="newPassword">New password</label>
                <input type="password" className="form-control" name="newPassword" value={newPassword} onChange={handleChange} />
                {submitted && newPassword.length < appConstants.passwordMinLength &&
                    <div className="error-block">{appConstants.errors.password}</div>
                }
            </div>
            <div className="form-group">
                <button className="btn btn-primary">Change</button>
                {changing && 
                    <img alt="Spinner" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                }
            </div>
        </form>
    </React.Fragment>
);

ChangePassword.propTypes = {
    changing: PropTypes.bool,
    submitted: PropTypes.bool.isRequired,
    username: PropTypes.string.isRequired,
    oldPassword: PropTypes.string.isRequired,
    newPassword: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
}

export { ChangePassword };
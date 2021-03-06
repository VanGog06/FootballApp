import React from 'react';
import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom';

import { appConstants } from '../../constants';

const LoginPage = ({username, password, submitted, loggingIn, handleChange, handleSubmit}) => (
    <div className="col-sm-10 offset-sm-1">
        <h2>Login</h2>
        <form name="form" onSubmit={handleSubmit}>
            <div className={'form-group' + (submitted && username.length < appConstants.usernameMinLength ? ' has-error' : '')}>
                <label htmlFor="username">Username</label>
                <input type="text" className="form-control" name="username" value={username} onChange={handleChange} />
                {submitted && username.length < appConstants.usernameMinLength &&
                    <div className="error-block">{appConstants.errors.username}</div>
                }
            </div>
            <div className={'form-group' + (submitted && password.length < appConstants.passwordMinLength ? ' has-error' : '')}>
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" name="password" value={password} onChange={handleChange} />
                {submitted && password.length < appConstants.passwordMinLength &&
                    <div className="error-block">{appConstants.errors.password}</div>
                }
            </div>
            <div className="form-group">
                <button className="btn btn-primary">Login</button>
                {loggingIn &&
                    <img alt="Spinner" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                }
                <NavLink to="/register" className="btn btn-link">Register</NavLink>
            </div>
        </form>
    </div>
);

LoginPage.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    submitted: PropTypes.bool.isRequired,
    loggingIn: PropTypes.bool,
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
};

export default LoginPage;
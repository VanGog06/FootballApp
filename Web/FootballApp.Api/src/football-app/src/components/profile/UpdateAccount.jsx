import React from 'react';
import PropTypes from 'prop-types';

import { appConstants } from '../../constants';

const UpdateAccount = ({submitted, changing, user, handleChange, handleSubmit}) => (
    <React.Fragment>
        <h2>Update account details</h2>
        <form name="form" onSubmit={handleSubmit}>
            <div className='form-group'>
                <label htmlFor="username">Username</label>
                <input type="text" className="form-control" name="username" value={user.username} disabled="disabled" />
            </div>
            <div className={'form-group' + (submitted && !user.firstName ? ' has-error' : '')}>
                <label htmlFor="firstName">First Name</label>
                <input type="text" className="form-control" name="firstName" value={user.firstName} onChange={handleChange} />
                {submitted && !user.firstName &&
                    <div className="error-block">{appConstants.errors.firstName}</div>
                }
            </div>
            <div className={'form-group' + (submitted && !user.lastName ? ' has-error' : '')}>
                <label htmlFor="lastName">Last Name</label>
                <input type="text" className="form-control" name="lastName" value={user.lastName} onChange={handleChange} />
                {submitted && !user.lastName &&
                    <div className="error-block">{appConstants.errors.lastName}</div>
                }
            </div>
            <div className={'form-group' + (submitted && !appConstants.emailRegex.test(user.email.toLowerCase()) ? ' has-error' : '')}>
                <label htmlFor="email">Email</label>
                <input type="email" className="form-control" name="email" value={user.email} onChange={handleChange} />
                {submitted && !appConstants.emailRegex.test(user.email.toLowerCase()) &&
                    <div className="error-block">{appConstants.errors.email}</div>
                }
            </div>
            <div className={'form-group' + (submitted && user.password.length < appConstants.passwordMinLength ? ' has-error' : '')}>
                <label htmlFor="password">Current password</label>
                <input type="password" className="form-control" name="password" value={user.password} onChange={handleChange} />
                {submitted && user.password.length < appConstants.passwordMinLength &&
                    <div className="error-block">{appConstants.errors.password}</div>
                }
            </div>
            <div className="form-group">
                <button className="btn btn-primary">Update</button>
                {changing && 
                    <img alt="Spinner" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                }
            </div>
        </form>
    </React.Fragment>
);

UpdateAccount.propTypes = {
    changing: PropTypes.bool,
    submitted: PropTypes.bool.isRequired,
    user: PropTypes.shape({
        username: PropTypes.string,
        password: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        email: PropTypes.string
    }),
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
};

export { UpdateAccount };
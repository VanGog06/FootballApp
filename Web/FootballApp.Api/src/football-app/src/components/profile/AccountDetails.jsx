import React from 'react';
import PropTypes from 'prop-types';

const AccountDetails = ({user}) => (
    <React.Fragment>
        <h2>Account details</h2>
        <form name="form">
            <div className='form-group'>
                <label htmlFor="username">Username</label>
                <input type="text" className="form-control" name="username" value={user.username} disabled="disabled" />
            </div>
            <div className='form-group'>
                <label htmlFor="firstName">First Name</label>
                <input type="text" className="form-control" name="firstName" value={user.firstName} disabled="disabled" />
            </div>
            <div className='form-group'>
                <label htmlFor="lastName">Last Name</label>
                <input type="text" className="form-control" name="lastName" value={user.lastName} disabled="disabled" />
            </div>
            <div className='form-group'>
                <label htmlFor="email">Email</label>
                <input type="email" className="form-control" name="email" value={user.email} disabled="disabled" />
            </div>
        </form>
    </React.Fragment>
);

AccountDetails.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired
    })
};

export { AccountDetails };
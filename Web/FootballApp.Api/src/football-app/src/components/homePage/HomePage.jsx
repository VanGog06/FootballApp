import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

const HomePage = ({user, users, handleDeleteUser}) => (
    <div className="col-sm-10 offset-sm-1">
        <h1>Hi {user.firstName}!</h1>
        <p>You're logged in with React!!</p>
        <h3>All registered users:</h3>
        {users.loading && <em>Loading users...</em>}
        {users.error && <span className="text-danger">ERROR: {users.error}</span>}
        {users.items &&
            <ul>
                {users.items.map(user =>
                    <li key={user.id}>
                        {user.firstName + ' ' + user.lastName}
                        {
                            user.deleting ? <em> - Deleting...</em>
                            : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                            : <span> - <a onClick={handleDeleteUser(user.id)}>Delete</a></span>
                        }
                    </li>
                )}
            </ul>
        }
        <p>
            <Link to="/login">Logout</Link>
        </p>
    </div>
);

HomePage.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        deleting: PropTypes.bool.isRequired,
        deleteError: PropTypes.string
    }),
    users: PropTypes.shape({
        loading: PropTypes.bool.isRequired,
        error: PropTypes.bool.isRequired,
        items: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                firstName: PropTypes.string.isRequired,
                lastName: PropTypes.string.isRequired,
                deleting: PropTypes.bool.isRequired,
                deleteError: PropTypes.string
            }).isRequired
        )
    }),
    handleDeleteUser: PropTypes.func.isRequired
};

export default HomePage;
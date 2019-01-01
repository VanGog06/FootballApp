import React, { Component } from 'react';
import { connect } from 'react-redux';

import { userActions } from '../../actions';

import HomePage from '../../components/homePage/HomePage';

class HomePageContainer extends Component {
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    handleDeleteUser = (id) => {
        return (e) => this.props.dispatch(userActions.delete(id));
    }

    render() {
        const { user, users } = this.props;

        return (
            <HomePage
                user={user}
                users={users}
                handleDeleteUser={this.handleDeleteUser}
            />
        );
    }
}

const mapStateToProps = (state) => {
    const { users, authentication } = state;
    const { user } = authentication;
    
    return {
        user,
        users
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePageContainer);

export { connectedHomePage as HomePageContainer };
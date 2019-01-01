import React, { Component } from 'react';
import { connect } from 'react-redux';

import { userActions } from '../../actions';

import { appConstants } from '../../constants';

import LoginPage from '../../components/loginPage/LoginPage';

class LoginPageContainer extends Component {
    constructor(props) {
        super(props);

        // reset login status
        this.props.dispatch(userActions.logout());

        this.state = {
            username: '',
            password: '',
            submitted: false
        };
    }

    validateInput = _ => {
        const { username, password } = this.state;

        if (username.length < appConstants.usernameMinLength) {
            return false;
        }

        if (password.length < appConstants.passwordMinLength) {
            return false;
        }

        return true;
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.setState({ submitted: true });

        const { username, password } = this.state;
        const { dispatch } = this.props;

        const isFormValid = this.validateInput();

        if (isFormValid) {
            dispatch(userActions.login(username, password));
        }
    }

    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
        return (
            <LoginPage
                username={username}
                password={password}
                submitted={submitted}
                loggingIn={loggingIn}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
            />
        );
    }
}

const mapStateToProps = (state) => {
    const { loggingIn } = state.authentication;

    return { loggingIn };
};

const connectedLoginPage = connect(mapStateToProps)(LoginPageContainer);

export { connectedLoginPage as LoginPageContainer }; 
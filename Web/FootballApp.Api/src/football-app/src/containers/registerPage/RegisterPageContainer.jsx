import React, { Component } from 'react';
import { connect } from 'react-redux';

import { userActions } from '../../actions';

import { appConstants } from '../../constants';

import RegisterPage from '../../components/registerPage/RegisterPage';

class RegisterPageContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstName: '',
                lastName: '',
                username: '',
                password: '',
                email: ''
            },
            submitted: false
        };
    }

    validateInput = _ => {
        const { user } = this.state;

        if (user.username.length < appConstants.usernameMinLength) {
            return false;
        }

        if (user.password.length < appConstants.passwordMinLength) {
            return false;
        }

        if (!user.firstName || !user.lastName) {
            return false;
        }

        if (!appConstants.emailRegex.test(user.email.toLowerCase())) {
            return false;
        }

        return true;
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        const { user } = this.state;

        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        const { dispatch } = this.props;

        const isFormValid = this.validateInput();

        if (isFormValid) {
            dispatch(userActions.register(user));
        }
    }

    render() {
        const { registering  } = this.props;
        const { user, submitted } = this.state;
        return (
            <RegisterPage 
                registering={registering}
                submitted={submitted}
                user={user}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
            />
        );
    }
}

const mapStateToProps = (state) => {
    const { registering } = state.registration;

    return { registering };
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPageContainer);

export { connectedRegisterPage as RegisterPageContainer };
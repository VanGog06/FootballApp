import React, { Component } from 'react';
import { connect } from 'react-redux';

import { userActions } from '../../actions';

import RegisterPage from '../../components/registerPage/RegisterPage';

class RegisterPageContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstName: '',
                lastName: '',
                username: '',
                password: ''
            },
            submitted: false
        };
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

        if (user.firstName && user.lastName && user.username && user.password && user.email) {
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
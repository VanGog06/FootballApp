import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { 
    Nav,
    NavItem,
    Container,
    Row,
    Col,
    TabContent,
    TabPane,
    NavLink
} from 'reactstrap';
import classnames from 'classnames';

import { 
    AccountDetails,
    ChangePassword,
    UpdateAccount,
    DeleteAccount
} from './';

import { appConstants } from '../../constants';

import { 
    userActions,
    alertActions
} from '../../actions';

class ProfilePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: '1',
            changePassword: {
                changePasswordSubmitted: false,
                oldPassword: '',
                newPassword: ''
            },
            updateAccount: {
                submitted: false,
                username: props.user.username,
                password: '',
                firstName: props.user.firstName,
                lastName: props.user.lastName,
                email: props.user.email
            },
            deleteAccount: {
                submitted: false,
                username: props.user.username,
                password: ''
            }
        };
    }

    toggle = tabId => {
        if (this.state.activeTab !== tabId) {
            this.setState({ activeTab: tabId });
        }
    }

    handleChangePasswordChange = event => {
        const { name, value } = event.target;

        this.setState({ changePassword: {
            ...this.state.changePassword,
            [name]: value 
        }});
    }

    handleUpdateAccountChange = event => {
        const { name, value } = event.target;

        this.setState({ updateAccount: {
            ...this.state.updateAccount,
            [name]: value 
        }});
    }

    handleDeleteAccountChange = event => {
        const { name, value } = event.target;

        this.setState({ deleteAccount: {
            ...this.state.deleteAccount,
            [name]: value 
        }});
    }

    validateChangePasswordInput = _ => {
        const { oldPassword, newPassword } = this.state.changePassword;

        if (oldPassword.length < appConstants.passwordMinLength) {
            return false;
        }

        if (newPassword.length < appConstants.passwordMinLength) {
            return false;
        }

        return true;
    }

    validateUpdateAccountSubmit = _ => {
        const { password, firstName, lastName, email } = this.state.updateAccount;

        if (password.length < appConstants.passwordMinLength) {
            return false;
        }

        if (!firstName || !lastName) {
            return false;
        }

        if (!appConstants.emailRegex.test(email.toLowerCase())) {
            return false;
        }

        return true;
    }

    validateDeleteAccountSubmit = _ => {
        const { password } = this.state.deleteAccount;

        if (password.length < appConstants.passwordMinLength) {
            return false;
        }

        return true;
    }

    handleChangePasswordSubmit = event => {
        event.preventDefault();
        const { dispatch, user } = this.props;
        const { oldPassword, newPassword  } = this.state.changePassword;

        dispatch(alertActions.clear());

        this.setState({ changePassword: {
            ...this.state.changePassword,
            changePasswordSubmitted: true 
        }});

        const isFormValid = this.validateChangePasswordInput();

        if (isFormValid) {
            dispatch(userActions.changePassword(user.id, oldPassword, newPassword));
        }
    }

    handleUpdateAccountSubmit = event => {
        event.preventDefault();

        const { dispatch, user } = this.props;
        const { updateAccount } = this.state;

        dispatch(alertActions.clear());

        this.setState({ updateAccount: {
            ...this.state.updateAccount,
            submitted: true 
        }});

        const isFormValid = this.validateUpdateAccountSubmit();

        if (isFormValid) {
            dispatch(userActions.updateAccount(user.id, updateAccount));
        }
    }

    handleDeleteAccountSubmit = event => {
        event.preventDefault();

        const { dispatch, user } = this.props;
        const { password } = this.state.deleteAccount;

        dispatch(alertActions.clear());

        this.setState({ deleteAccount: {
            ...this.state.deleteAccount,
            submitted: true
        }});

        const isFormValid = this.validateDeleteAccountSubmit();

        if (isFormValid) {
            dispatch(userActions.delete(user.id, password));
        }
    }

    render() {
        const { user, changingPassword, updatingAccount, deletingAccount } = this.props;
        const { changePassword, updateAccount, deleteAccount } = this.state;

        return (
            <Container>
                <Row>
                    <Col sm="3">
                        <Nav vertical>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '1' })}
                                    onClick={() => { this.toggle('1'); }}
                                >
                                    Account details
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '2' })}
                                    onClick={() => { this.toggle('2'); }}
                                >
                                    Change password
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '3' })}
                                    onClick={() => { this.toggle('3'); }}
                                >
                                    Update account
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.state.activeTab === '4' })}
                                    onClick={() => { this.toggle('4'); }}
                                >
                                    Delete account
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Col>

                    <Col sm="9">
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">
                                <Row>
                                    <Col sm="12">
                                        <AccountDetails user={user} />
                                    </Col>
                                </Row>
                            </TabPane>

                            <TabPane tabId="2">
                                <Row>
                                    <Col sm="12">
                                        <ChangePassword
                                            changing={changingPassword}
                                            submitted={changePassword.changePasswordSubmitted}
                                            username={user.username}
                                            oldPassword={changePassword.oldPassword}
                                            newPassword={changePassword.newPassword}
                                            handleChange={this.handleChangePasswordChange}
                                            handleSubmit={this.handleChangePasswordSubmit}
                                        />
                                    </Col>
                                </Row>
                            </TabPane>

                            <TabPane tabId="3">
                                <Row>
                                    <Col sm="12">
                                        <UpdateAccount
                                            changing={updatingAccount}
                                            submitted={updateAccount.submitted}
                                            user={updateAccount}
                                            handleChange={this.handleUpdateAccountChange}
                                            handleSubmit={this.handleUpdateAccountSubmit}
                                        />
                                    </Col>
                                </Row>
                            </TabPane>

                            <TabPane tabId="4">
                                <Row>
                                    <Col sm="12">
                                        <DeleteAccount 
                                            deleting={deletingAccount}
                                            submitted={deleteAccount.submitted}
                                            deleteAccount={deleteAccount}
                                            handleChange={this.handleDeleteAccountChange}
                                            handleSubmit={this.handleDeleteAccountSubmit}
                                        />
                                    </Col>
                                </Row>
                            </TabPane>
                        </TabContent>
                    </Col>
                </Row>
            </Container>
        );
    }
}

ProfilePage.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        deleting: PropTypes.bool,
        deleteError: PropTypes.string
    }),
    updatingAccount: PropTypes.bool,
    changingPassword: PropTypes.bool,
    deletingAccount: PropTypes.bool
};

const mapStateToProps = state => {
    const { user, changingPassword, updatingAccount, deletingAccount } = state.authentication;

    return { user, changingPassword, updatingAccount, deletingAccount };
};

const connectedProfilePage = connect(mapStateToProps)(ProfilePage);

export { connectedProfilePage as ProfilePage };
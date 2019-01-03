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
    ChangePassword
} from './';

import { appConstants } from '../../constants';
import { userActions } from '../../actions';

class ProfilePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: '1',
            changePasswordSubmitted: false,
            changePasswordChanging: false,
            oldPassword: '',
            newPassword: ''
        };
    }

    toggle = tabId => {
        if (this.state.activeTab !== tabId) {
            this.setState({ activeTab: tabId });
        }
    }

    handleChange = event => {
        const { name, value } = event.target;

        this.setState({ [name]: value });
    }

    validateChangePasswordInput = _ => {
        const { oldPassword, newPassword } = this.state;

        if (oldPassword.length < appConstants.passwordMinLength) {
            return false;
        }

        if (newPassword.length < appConstants.passwordMinLength) {
            return false;
        }

        return true;
    }

    handleChangePageSubmit = event => {
        event.preventDefault();

        this.setState({ changePasswordSubmitted: true });

        const isFormValid = this.validateChangePasswordInput();

        const { dispatch, user } = this.props;
        const { oldPassword, newPassword  } = this.state;

        if (isFormValid) {
            dispatch(userActions.changePassword(user.id, oldPassword, newPassword));
        }
    }

    render() {
        const { user, changingPassword, changePasswordError } = this.props;
        const { changePasswordSubmitted, oldPassword, newPassword  } = this.state;

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
                                            changePasswordError={changePasswordError}
                                            submitted={changePasswordSubmitted}
                                            username={user.username}
                                            oldPassword={oldPassword}
                                            newPassword={newPassword}
                                            handleChange={this.handleChange}
                                            handleSubmit={this.handleChangePageSubmit}
                                        />
                                    </Col>
                                </Row>
                            </TabPane>

                            <TabPane tabId="3">
                                <Row>
                                    <Col sm="12">
                                        <h4>Tab 3 Contents</h4>
                                    </Col>
                                </Row>
                            </TabPane>

                            <TabPane tabId="4">
                                <Row>
                                    <Col sm="12">
                                        <h4>Tab 4 Contents</h4>
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
    })
};

const mapStateToProps = state => {
    const { user, changingPassword, changePasswordError } = state.authentication;

    return { user, changingPassword, changePasswordError };
};

const connectedProfilePage = connect(mapStateToProps)(ProfilePage);

export { connectedProfilePage as ProfilePage };
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

class Header extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            isOpen: false
        };
    }

    toggle = _ => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        const { loggedIn } = this.props;

        return (
            <header>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">FootballApp</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            {loggedIn ? (
                                <React.Fragment>
                                    <NavItem className="navLink">
                                        <NavLink to="/">Home</NavLink>
                                    </NavItem>
                                    <NavItem className="navLink">
                                        <NavLink to="/profile">Profile</NavLink>
                                    </NavItem>
                                    <NavItem className="navLink">
                                        <NavLink to="/login">Logout</NavLink>
                                    </NavItem>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <NavItem className="navLink">
                                        <NavLink to="/">Home</NavLink>
                                    </NavItem>
                                    <NavItem className="navLink">
                                        <NavLink to="/login">Login</NavLink>
                                    </NavItem>
                                    <NavItem className="navLink">
                                        <NavLink to="/register">Register</NavLink>
                                    </NavItem>
                                </React.Fragment>
                            )}
                        </Nav>
                    </Collapse>
                </Navbar>
            </header>
        );
    }
}

Header.propTypes = {
    loggedId: PropTypes.bool,
};

const mapStateToProps = state => {
    const { loggedIn } = state.authentication;

    return { loggedIn };
};

const connectedHeader = connect(mapStateToProps)(Header);

export { connectedHeader as Header };
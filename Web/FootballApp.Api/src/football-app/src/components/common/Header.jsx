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
          <div>
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
                                    <NavLink to="/login">Logout</NavLink>
                                </NavItem>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
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
          </div>
        );
    }
}

const mapStateToProps = state => {
    const { authentication } = state;
    const { loggedIn, user } = authentication;

    return {
        loggedIn,
        user
    };
};

const connectedHeader = connect(mapStateToProps)(Header);

export { connectedHeader as Header };
import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { Alert } from 'reactstrap';

import { history } from './helpers';
import { alertActions } from './actions';

import { PrivateRoute } from './components/PrivateRoute';
import { HomePageContainer } from './containers/homePage/HomePageContainer';
import { LoginPageContainer } from './containers/loginPage/LoginPageContainer';
import { RegisterPageContainer } from './containers/registerPage/RegisterPageContainer';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen((location, action) => {
        dispatch(alertActions.clear());
    });
}

  render() {
    const { alert } = this.props;

    return (
      <div className="jumbotron">
        <div className="container">
          <div className="col-sm-8 col-sm-offset-2 mx-auto">
            {alert.message &&
              <Alert color={alert.type}>
                {alert.message}
              </Alert>
            }
            <Router history={history}>
              <div>
                <PrivateRoute exact path="/" component={HomePageContainer} />
                <Route path="/login" component={LoginPageContainer} />
                <Route path="/register" component={RegisterPageContainer} />
              </div>
            </Router>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
      alert
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 
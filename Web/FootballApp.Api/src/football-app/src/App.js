import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { Alert } from 'reactstrap';

import { history, routes } from './helpers';
import { alertActions } from './actions';

import { PrivateRoute } from './components/PrivateRoute';
import { Header } from './components/common';
import { Footer } from './components/common';

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
      <Router history={history}>
        <div>
          <Header />

          <hr />

          <div className="container-fluid bg-light">
            <div className="col-sm-12 mx-auto">
              {alert.message &&
                <Alert color={alert.type}>
                  {alert.message}
                </Alert>
              }

              <Switch>
                {routes.map((route, index) => {
                  return route.isPrivate ? (
                    <PrivateRoute key={index} {...route} />
                  ) : (
                    <Route key={index} {...route} />
                  )
                })}
              </Switch>
            </div>
          </div>

          <hr />

          <Footer />
        </div>
      </Router>
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
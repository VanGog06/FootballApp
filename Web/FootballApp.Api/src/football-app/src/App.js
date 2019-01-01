import React, { Component } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { Alert } from 'reactstrap';

import { history, routes } from './helpers';
import { alertActions } from './actions';

import { PrivateRoute } from './components/PrivateRoute';
import { Header } from './components/common';
import { Footer } from './components/common';

// import { HomePageContainer } from './containers/homePage/HomePageContainer';
// import { LoginPageContainer } from './containers/loginPage/LoginPageContainer';
// import { RegisterPageContainer } from './containers/registerPage/RegisterPageContainer';

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

          <div className="jumbotron">
            <div className="container">
              <div className="col-sm-8 col-sm-offset-2 mx-auto">
                {alert.message &&
                  <Alert color={alert.type}>
                    {alert.message}
                  </Alert>
                }

                <Switch>
                  {routes.map((route, index) => {
                    return route.path === '/' ? (
                      <PrivateRoute id={index} {...route} />
                    ) : (
                      <Route id={index} {...route} />
                    )
                  })}
                  {/* <PrivateRoute exact path="/" component={HomePageContainer} />
                  <Route path="/login" component={LoginPageContainer} />
                  <Route path="/register" component={RegisterPageContainer} />
                  <Route render={() => <div>404 Not Found!</div>} /> */}
                </Switch>
              </div>
            </div>
          </div>

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
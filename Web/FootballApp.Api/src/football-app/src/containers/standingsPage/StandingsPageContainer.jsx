import React, { Component } from 'react';
import { connect } from 'react-redux';

import { standingActions } from '../../actions';

class StandingsPageContainer extends Component {
    componentDidMount() {
        const country = this.props.match.params.country;
        const { dispatch } = this.props;

        dispatch(standingActions.getStanding(country));
    }

    render() {
        return (
            <div>Hello</div>
        );
    }
}

const mapStateToProps = state => {
    const { standings } = state.standing;
    
    return { standings };
};

const connectedStandingsPage = connect(mapStateToProps)(StandingsPageContainer);

export { connectedStandingsPage as StandingsPageContainer };
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { standingActions } from '../../actions';

import { StandingsPage } from '../../components/standingsPage/StandingsPage';

class StandingsPageContainer extends Component {
    componentDidMount() {
        const country = this.props.match.params.country;
        const { dispatch } = this.props;

        dispatch(standingActions.getStanding(country));
    }

    render() {
        const { standings } = this.props;

        return <StandingsPage 
            standings={standings}
        />;
    }
}

StandingsPageContainer.propTypes = {
    standings: PropTypes.arrayOf(
        PropTypes.shape({
            draw: PropTypes.number.isRequired,
            goalDifference: PropTypes.number.isRequired,
            goalsAgainst: PropTypes.number.isRequired,
            goalsFor: PropTypes.number.isRequired,
            id: PropTypes.number.isRequired,
            lost: PropTypes.number.isRequired,
            playedGames: PropTypes.number.isRequired,
            points: PropTypes.number.isRequired,
            position: PropTypes.number.isRequired,
            teamId: PropTypes.number.isRequired,
            won: PropTypes.number.isRequired,
            team: PropTypes.shape({
                address: PropTypes.string.isRequired,
                clubColors: PropTypes.string,
                crestUrl: PropTypes.string,
                founded: PropTypes.number.isRequired,
                id: PropTypes.number.isRequired,
                name: PropTypes.string.isRequired,
                shortName: PropTypes.string.isRequired,
                venue: PropTypes.string.isRequired,
                website: PropTypes.string.isRequired
            })
        })
    )
};

const mapStateToProps = state => {
    const { standings } = state.standing;
    
    return { standings };
};

const connectedStandingsPage = connect(mapStateToProps)(StandingsPageContainer);

export { connectedStandingsPage as StandingsPageContainer };
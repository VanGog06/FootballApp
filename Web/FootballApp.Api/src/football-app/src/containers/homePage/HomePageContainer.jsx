import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { competitionActions } from '../../actions';

import HomePage from '../../components/homePage/HomePage';

class HomePageContainer extends Component {
    componentDidMount() {
        this.props.dispatch(competitionActions.getAll());
    }

    render() {
        const { competitions } = this.props;

        return (
            <React.Fragment>
                <h1 className='text-center pt-2'>Competitions</h1>

                <HomePage competitions={competitions} />
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    const { competitions } = state.competition;
    
    return { competitions };
}

HomePageContainer.propTypes = {
    competitions: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            country: PropTypes.string
        })
    )
};

const connectedHomePage = connect(mapStateToProps)(HomePageContainer);

export { connectedHomePage as HomePageContainer };
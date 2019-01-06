import React from 'react';
import PropTypes from 'prop-types';

import { 
    Table,
    Container
} from 'reactstrap';

import { NavLink } from 'react-router-dom';

const StandingsPage = ({standings}) => (
    <Container>
        <h1 className='text-center pt-2 pb-1'>{standings.length ? `${standings[0].name.replace('Championship', 'Premier League')} Standings` : ''}</h1>

        <Table hover responsive>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Team</th>
                    <th>Played</th>
                    <th>Win</th>
                    <th>Draw</th>
                    <th>Loss</th>
                    <th>Goal For</th>
                    <th>Goal Against</th>
                    <th>Goal Difference</th>
                    <th>Points</th>
                </tr>
            </thead>
            <tbody>
                {standings
                .sort((a, b) => a.position - b.position)
                .map((standing, index) => (
                    <tr key={index}>
                        <th scope={index}>{standing.position}</th>
                        <td>
                            <NavLink to={`/teams/team/${standing.team.id}`}>{standing.team.name}</NavLink>
                        </td>
                        <td>{standing.playedGames}</td>
                        <td>{standing.won}</td>
                        <td>{standing.draw}</td>
                        <td>{standing.lost}</td>
                        <td>{standing.goalsFor}</td>
                        <td>{standing.goalsAgainst}</td>
                        <td>{standing.goalDifference}</td>
                        <td>{standing.points}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    </Container>
);

StandingsPage.propTypes = {
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
            won: PropTypes.number.isRequired,
            teamId: PropTypes.number.isRequired,
            team: PropTypes.shape({
                address: PropTypes.string.isRequired,
                clubColors: PropTypes.string.isRequired,
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

export { StandingsPage };
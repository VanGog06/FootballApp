import React from 'react';
import PropTypes from 'prop-types';

import { 
    Card,
    CardImg,
    CardBody,
    CardTitle,
    Col,
    Row
} from 'reactstrap';

import { NavLink } from 'react-router-dom';

import germany from '../../assets/imgs/Bundesliga.svg';
import netherlands from '../../assets/imgs/Eredivisie.svg';
import spain from '../../assets/imgs/Primera Division.svg';
import france from '../../assets/imgs/Ligue 1.svg';
import italy from '../../assets/imgs/Serie A.svg';
import england from '../../assets/imgs/Premier League.svg';

const HomePage = ({competitions}) => (
    <Row className='justify-content-center'>
        {competitions.map((competition, index) => {
            const className = `${competition.name.toLowerCase().replace(' ', '')}Card`;

            if ((index + 1) % 3 !== 0) {
                return (
                    <React.Fragment key={competition.id}>
                        <Col key={competition.id} md='3'>
                            <NavLink to={`competitions/${competition.country.toLowerCase()}`} key={competition.id}>
                                <Card key={competition.id} className={className}>
                                    <CardImg top src={chooseSvg(competition.country.toLowerCase())} alt={competition.name} />
                                    <CardBody className='d-flex flex-column'>
                                        <CardTitle className='text-center mt-auto'>{competition.country}</CardTitle>
                                    </CardBody>
                                </Card>
                            </NavLink>
                        </Col>

                        <Col md='1'></Col>
                    </React.Fragment>
                );
            } else {
                return (
                    <Col key={competition.id} md='3'>
                        <NavLink to={`competitions/${competition.country.toLowerCase()}`}>
                            <Card key={competition.id} className={className}>
                                <CardImg top src={chooseSvg(competition.country.toLowerCase())} alt={competition.name} />
                                <CardBody className='d-flex flex-column'>
                                    <CardTitle className='text-center mt-auto'>{competition.country}</CardTitle>
                                </CardBody>
                            </Card>
                        </NavLink>
                    </Col>
                );
            }
        })}
    </Row>
);

const chooseSvg = country => {
    switch(country) {
        case 'germany':
            return germany;
        case 'netherlands':
            return netherlands;
        case 'spain':
            return spain;
        case 'france':
            return france;
        case 'italy':
            return italy;
        case 'england':
            return england;
        default:
            return '';
    }
};

HomePage.propTypes = {
    competitions: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            country: PropTypes.string
        })
    )
};

export default HomePage;
// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.scss';
// import moment from 'moment';
import Feed from '../../components/Feed';
import PropTypes from 'prop-types';
import Catcher from '../../components/Catcher';

import avatar from '../../theme/assets/homer.png';

const options = {
    firstName: 'Alexander',
    lastName:  'Ponomariov',
    avatar
};

export default class App extends Component {
    static childContextTypes = {
        firstName: PropTypes.string.isRequired
    };

    getChildContext () {
        return {
            firstName: options.firstName
        };
    }

    render () {
        return (
            <section className = { Styles.app }>
                <Catcher>
                    <Feed { ...options } />
                </Catcher>
            </section>
        );
    }
}

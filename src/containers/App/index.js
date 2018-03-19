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
    firstNameContext: 'Александр',
    lastNameContext:  'Пономарёв',
    avatar,
    api:              'https://lab.lectrum.io/react/api/1fwfsc9M9A',
    token:            'ucgx0wrjwi'
};

export default class App extends Component {
    static childContextTypes = {
        firstNameContext: PropTypes.string.isRequired,
        lastNameContext:  PropTypes.string.isRequired,
        api:              PropTypes.string.isRequired,
        token:            PropTypes.string.isRequired,
        avatar:           PropTypes.string.isRequired
    };

    getChildContext () {
        return {
            firstNameContext: options.firstNameContext,
            lastNameContext:  options.lastNameContext,
            api:              options.api,
            token:            options.token,
            avatar:           options.avatar
        };
    }

    render () {
        return (
            <section className = { Styles.app }>
                <Catcher>
                    <Feed />
                </Catcher>
            </section>
        );
    }
}

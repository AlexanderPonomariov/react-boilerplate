import React from 'react';
import PropTypes from 'prop-types'

import Styles from './styles.scss';

const Counter =  ({ countedPosts }) => <p className = { Styles.counter } >Posts count: { countedPosts }</p>;

Counter.propTypes = {
    countedPosts: PropTypes.number.isRequired
};

export default Counter;

import React, { Component } from 'react';
import moment from 'moment';

import Styles from './styles.scss';
import { string } from 'prop-types';

export default class Post extends Component {
    static propTypes = {
        avatar:   string.isRequired,
        lastName: string.isRequired
    };
    static contextTypes = {
        firstName: string.isRequired
    };


    render () {
        const { lastName, avatar } = this.props;
        const { firstName } = this.context;

        return (
            <section className = { Styles.post } >
                <button className = { Styles.close } />
                <img
                    alt = 'My avatar'
                    src = { avatar }
                />
                <a href = '#'> { `${firstName} ${lastName}` }</a>
                <time>{ moment().format('MMM D h:mm:ss a') }</time>
                <p>Hello!!! This is ME!!!!!</p>
            </section>
        );
    }
}

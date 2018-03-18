import React, { Component } from 'react';
import moment from 'moment';

import Styles from './styles.scss';
import { string } from 'prop-types';

export default class Post extends Component {
    static propTypes = {
        avatar:   string.isRequired,
        comment:  string.isRequired,
        lastName: string.isRequired,
        key:      string.isRequired
    };
    static contextTypes = {
        firstName: string.isRequired
    };


    render () {
        const { avatar, comment, lastName, key } = this.props;
        const { firstName } = this.context;

        return (
            <section className = { Styles.post } key = { key } >
                <button className = { Styles.close } />
                <img
                    alt = 'My avatar'
                    src = { avatar }
                />
                <a href = '#'> { `${firstName} ${lastName}` }</a>
                <time>{ moment().format('MMM D h:mm:ss a') }</time>
                <p>{ comment }</p>
            </section>
        );
    }
}

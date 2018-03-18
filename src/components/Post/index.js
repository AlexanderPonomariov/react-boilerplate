import React, { Component } from 'react';
import moment from 'moment';

import Styles from './styles.scss';
import { string } from 'prop-types';
import PropTypes from 'prop-types';

export default class Post extends Component {
    static propTypes = {
        avatar:     string.isRequired,
        comment:    string.isRequired,
        deletePost: PropTypes.func.isRequired,
        id:         string.isRequired,
        lastName:   string.isRequired
    };
    static contextTypes = {
        firstName: string.isRequired
    };

    shouldComponentUpdate() {
        throw new Error('error');
        return false;
    }

    componentWillUpdate () {
        console.log('componentWillUpdate');
    }

    componentDidUpdate () {
        console.log('componentDidUpdate');
    }

    _deletePost = () => {
        const { deletePost, id } = this.props;

        deletePost(id);
    }


    render () {
        const { avatar, comment, lastName } = this.props;
        const { firstName } = this.context;

        return (
            <section className = { Styles.post }>
                <button className = { Styles.close } onClick = { this._deletePost } />
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

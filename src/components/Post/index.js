import React, { Component } from 'react';
import moment from 'moment';

import Styles from './styles.scss';
import { string } from 'prop-types';
import PropTypes from 'prop-types';

export default class Post extends Component {
    static propTypes = {
        avatar:     string.isRequired,
        comment:    string.isRequired,
        created:    PropTypes.number.isRequired,
        deletePost: PropTypes.func.isRequired,
        firstName:  string.isRequired,
        id:         string.isRequired,
        lastName:   string.isRequired


    };
    static contextTypes = {
        firstNameContext: string.isRequired,
        lastNameContext:  string.isRequired
    };

    shouldComponentUpdate () {
        return false;
    }

    // componentWillUpdate () {
    //     console.log('componentWillUpdate');
    // }
    //
    // componentDidUpdate () {
    //     console.log('componentDidUpdate');
    // }

    _deletePost = () => {
        const { deletePost, id } = this.props;

        deletePost(id);
    };

    render () {
        const { avatar, comment, lastName, firstName, created } = this.props;
        const { lastNameContext, firstNameContext } = this.context;

        return (
            <section className = { Styles.post }>

                {
                    firstName === firstNameContext && lastName === lastNameContext
                        ? (
                            <button className = { Styles.close } onClick = { this._deletePost } />
                        )
                        : ''
                }
                <img
                    alt = 'My avatar'
                    src = { avatar }
                />
                <a href = '#'> { `${firstName} ${lastName}` }</a>
                <time>{ moment(created*1000).format('MMM D h:mm:ss a') }</time>
                {
                    comment.substring(0, 4) === 'http'
                        ? (
                            <img alt = 'img' src = { comment } />
                        )
                        : (
                            <p>{ comment }</p>
                        )
                }
            </section>
        );
    }
}

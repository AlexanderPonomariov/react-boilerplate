import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types'; import io from 'socket.io-client';

import Styles from './styles.scss';

export default class Like extends Component {
    static contextTypes = {
        firstNameContext: PropTypes.string.isRequired,
        lastNameContext:  PropTypes.string.isRequired
    };
    static propTypes = {
        id:       PropTypes.string.isRequired,
        likePost: PropTypes.func.isRequired,
        likes:    PropTypes.arrayOf(
            PropTypes.shape({
                firstName: PropTypes.string.isRequired,
                lastName:  PropTypes.string.isRequired
            })
        ).isRequired
    };

    static defaultProps = {
        likes: []
    };

    state ={
        showLikes: false
    };

    _showLikes = () => {
        this.setState(() => ({
            showLikes: true
        }));
    };

    _hideLikes = () => {
        this.setState(() => ({
            showLikes: false
        }));
    };

    _getLikeByMe = () => {
        const {
            firstNameContext,
            lastNameContext
        } = this.context;

        return this.props.likes.some(({ firstName, lastName }) =>
            `${firstNameContext} ${lastNameContext}` === `${firstName} ${lastName}`
        );
    };

    _getTotalLikes = () => {
        const { likes } = this.props;
        const {
            firstNameContext,
            lastNameContext
        } = this.context;

        const likedByMe = this._getLikeByMe();

        return likes.length === 1 && likedByMe
            ? `${firstNameContext} ${lastNameContext}`
            : likes.length === 2 && likedByMe
                ? `You and ${likes.length - 1} other`
                : likedByMe
                    ? `You and ${likes.length - 1} others`
                    : likes.length;

    };

    _getLikesList = () => {
        const { likes } = this.props;
        const { showLikes } = this.state;

        // console.log(likes);

        return likes.length && showLikes ? (
            <ul>
                {
                    likes.map((like) => (
                        <li key = { like.id } > {`${like.firstName} ${like.lastName}`}</li>
                    ))
                }
            </ul>
        ) : null;
    };

    _likePost = () => {
        const { id, likePost } = this.props;

        likePost(id);
    };

    render () {
        const likedByMe = this._getLikeByMe();
        const likeStyles = likedByMe
            ? `${Styles.icon} ${Styles.liked}`
            : Styles.icon;

        const likesList = this._getLikesList();
        const totalLikes = this._getTotalLikes();

        return (
            <section className = { Styles.like } >
                <span className = { likeStyles } onClick = { this._likePost } >
                    Like
                </span>
                <div>
                    {likesList}
                    <span
                        onMouseEnter = { this._showLikes }
                        onMouseLeave = { this._hideLikes }
                    >
                        {totalLikes}
                    </span>
                </div>
            </section>
        );
    }

}

import React, { Component } from 'react';
import PropTypes, { string } from 'prop-types';

import Composer from '../../components/Composer';
import Post from '../../components/Post';
import { getUniqueID } from '../../helpers';

export default class Feed extends Component {
    static propTypes = {
        avatar:   string.isRequired,
        lastName: PropTypes.string.isRequired
    };
    static contextTypes = {
        firstName: PropTypes.string.isRequired
    };

    state= {
        posts: []
    }

    _createPost = (comment) => {
        this.setState(({ posts }) => ({
            posts: [{ id: getUniqueID(), comment }, ...posts]
        }));
    };

    render () {
        // console.log(this.props);
        const { avatar, lastName } = this.props;
        const { firstName } = this.context;
        const { posts: postsData } = this.state;
        const posts = postsData.map((post) => (
            <Post
                avatar = { avatar }
                comment = { post.comment }
                firstName = { firstName }
                key = { post.id }
                lastName = { lastName }
            />
        ));

        return (
            <section>
                <Composer
                    avatar = { avatar }
                    createPost = { this._createPost }
                    firstName = { firstName }
                />
                { posts }
            </section>
        );
    }
}

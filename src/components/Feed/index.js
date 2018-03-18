import React, { Component } from 'react';
import PropTypes, { string } from 'prop-types';

import Composer from '../../components/Composer';
import Post from '../../components/Post';
import { getUniqueID } from '../../helpers';
import Catcher from '../../components/Catcher';

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

    componentWillUpdate () {
        console.log('componentWillUpdate');
    }

    componentDidUpdate () {
        console.log('componentDidUpdate');
    }

    _createPost = (comment) => {
        this.setState(({ posts }) => ({
            posts: [{ id: getUniqueID(), comment }, ...posts]
        }));
    };

    _deletePost = (id) => {
        this.setState(({ posts }) => ({
            posts: posts.filter((post) => post.id !== id)
        }));
    };

    render () {
        // console.log(this.props);
        const { avatar, lastName } = this.props;
        const { firstName } = this.context;
        const { posts: postsData } = this.state;
        const posts = postsData.map((post) => (
            <Catcher key = { post.id } >
                <Post
                    avatar = { avatar }
                    comment = { post.comment }
                    deletePost = { this._deletePost }
                    firstName = { firstName }
                    id = { post.id }
                    lastName = { lastName }
                />
            </Catcher>
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

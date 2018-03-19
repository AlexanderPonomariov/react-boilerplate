import React, { Component, Fragment } from 'react';
import PropTypes, { string } from 'prop-types';

import Composer from '../../components/Composer';
import Post from '../../components/Post';
// import { getUniqueID } from '../../helpers';
import Catcher from '../../components/Catcher';
import Counter from '../../components/Counter';
import Spinner from '../../components/Spinner';
import io from 'socket.io-client';

export default class Feed extends Component {
    static propTypes = {

        // lastName: PropTypes.string.isRequired
    };
    static contextTypes = {
        firstNameContext: PropTypes.string.isRequired,
        lastNameContext:  PropTypes.string.isRequired,
        api:              PropTypes.string.isRequired,
        token:            PropTypes.string.isRequired,
        avatar:           string.isRequired
    };

    state= {
        posts:          [],
        spinnerVisible: false
    };

    componentWillUpdate () {
        // console.log('componentWillUpdate');
    }

    componentDidUpdate () {
        // console.log('componentDidUpdate');
    }

    componentDidMount () {

        const socket = io('https://lab.lectrum.io', {
            path: '/react/ws'
        });

        socket.on('connect', () => {
            // хендлим логику конекта
            console.log(`Socked connected with ID: ${socket.id}`);
        });

        socket.on('disconnect', () => {
            // хендлим логику дисконекта
            // сокет отвалился, обрыв связи и т.д.
            console.error(`Socked disconnected`);
        });

        socket.emit('join', '1fwfsc9M9A');

        socket.on('join_error', (data) => {
            // message содержит объект с ошибкой.
            // { message: 'текст сообщения' }
            // Текст в формате JSON
            console.error(JSON.parse(data));
        });

        socket.on('create', (data) => {
            // post содержит объект созданного поста любым участником группы.
            // Текст в формате JSON
            const post = JSON.parse(data);

            this.setState(({ posts }) => ({
                posts:          [post, ...posts],
                spinnerVisible: false
            }));
        });

        socket.on('remove', (postId) => {
            // postId содержит ID удалённого поста.
            this.setState(({ posts }) => ({
                posts:          posts.filter(({ id }) => postId !== id),
                spinnerVisible: false
            }));
        });

        socket.on('like', (post) => {
            // post содержит объект обновлённого поста с like.
            // Текст в формате JSON
        });

        this._getPosts();
    }

    // _getPosts = () => {
    //     const { api } = this.context;
    //
    //     fetch(api, {
    //         method: 'GET'
    //     })
    //         .then((response) => {
    //             if (response.status !== 200) {
    //                 throw new Error('Get post error');
    //             }
    //
    //             return response.json();
    //         })
    //         .then(({ data }) => {
    //             this.setState(({ posts }) => ({
    //                 posts: [...data, ...posts]
    //             }));
    //         })
    //         .catch((error) => {
    //             console.log(error.message);
    //         });
    // };

    _getPosts = async () => {
        const { api } = this.context;

        try {
            const response = await fetch(api, {
                method: 'GET'
            });

            if (response.status !== 200) {
                throw new Error('Adding post failed');
            }

            const { data }  = await response.json();

            this.setState(({ posts }) => ({
                posts:          [...data, ...posts],
                spinnerVisible: false
            }));
        } catch ({ message }) {
            console.error(message);
            this.setState(() => ({
                spinnerVisible: false
            }));
        }

    };

    _createPost = (comment) => {
        const { token, api } = this.context;

        this.setState(() => ({
            spinnerVisible: true
        }));

        fetch(api, {
            method:  'POST',
            headers: {
                'Content-Type':  'application/json',
                'Authorization': token
            },
            body: JSON.stringify({ comment })
        })
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('Create post error');
                }

                return response.json();
            })
            .catch((error) => {
                console.log(error.message);
            });

    };

    // Deleting post using fetch

    // _deletePost = (postId) => {
    //     const { token, api } = this.context;
    //
    //     this.setState(() => ({
    //         spinnerVisible: true
    //     }));
    //
    //     fetch(`${api}/${postId}`, {
    //         method:  'DELETE',
    //         headers: {
    //             // 'Content-Type':  'application/json',
    //             'Authorization': token
    //         }
    //     })
    //         .then((response) => {
    //
    //             if (response.status !== 204) {
    //                 throw new Error('Delete post error');
    //             }
    //
    //         })
    //         .then(() => {
    //             this.setState(({ posts }) => ({
    //                 posts:          posts.filter(({ id }) => postId !== id),
    //                 spinnerVisible: false
    //             }));
    //         })
    //         .catch((error) => {
    //             console.log(error.message);
    //         });
    // };

    _deletePost = async (postId) => {
        const { api, token } = this.context;

        try {

            this.setState(() => ({
                spinnerVisible: true
            }));

            const response = await fetch(`${api}/${postId}`, {
                method:  'DELETE',
                headers: {
                    Authorization: token
                }
            });

            if (response.status !== 204) {
                throw new Error('Delete post failed');
            }
        } catch ({ message }) {
            console.error(message);
        }

        // this.setState(({ posts }) => ({
        //     posts:          posts.filter(({ id }) => postId !== id),
        //     spinnerVisible: false
        // }));

    }

    render () {
        // console.log(this.props);
        const { firstNameContext, avatar, lastNameContext } = this.context;
        const { posts: postsData, spinnerVisible } = this.state;
        const posts = postsData.map((post) => (
            <Catcher key = { post.id } >
                <Post
                    avatar = { post.avatar }
                    comment = { post.comment }
                    deletePost = { this._deletePost }
                    firstName = { post.firstName }
                    id = { post.id }
                    lastName = { post.lastName }
                    created = { post.created }
                />
            </Catcher>
        ));

        return (
            <Fragment> {/*Doesn't create level or any tag*/}
                <Spinner
                    spinnerVisible = { spinnerVisible }
                />
                <Composer
                    avatar = { avatar }
                    createPost = { this._createPost }
                    firstName = { firstNameContext }
                />
                <Counter
                    countedPosts = { posts.length }
                />
                { posts }
            </Fragment>
        );
    }
}

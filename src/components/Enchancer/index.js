import React, {Component} from "react";
import moment from "moment/moment";
import {string} from "prop-types";
import PropTypes from "prop-types";
import io from "socket.io-client";

import Feed from '../../components/Feed';

const withState = (Injectable) => {
    class Enchancer extends Component {
        state= {
            posts:          [],
            spinnerVisible: false,
            postmanTrigger: true
        };

        static contextTypes = {
            firstNameContext: PropTypes.string.isRequired,
            lastNameContext:  PropTypes.string.isRequired,
            api:              PropTypes.string.isRequired,
            token:            PropTypes.string.isRequired,
            avatar:           string.isRequired
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
                // console.log(`Socked connected with ID: ${socket.id}`);
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

        componentWillMount () {
            localStorage.setItem('helloMessageWasAt', moment());
        }

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

        };

        _likePost = async (id) => {
            const { api, token } = this.context;

            const response = await fetch(`${api}/${id}`, {
                method:  'PUT',
                headers: {
                    Authorization: token
                }
            });

            const { data } = await response.json();

            this.setState(({ posts }) => ({
                // console.log(posts)
                posts: posts.map((post) => post.id === id ? data : post)
            }));
        };

        _hideHelloMessage = () => {
            setTimeout(() => {
                this.setState(() => ({
                    postmanTrigger: false
                }));
            }, 5000);
        };

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

        render () {
            return (
                <Injectable
                    createPost = { this._createPost }
                    deletePost = { this._deletePost }
                    likePost = { this._likePost }
                    hideHelloMessage = { this._hideHelloMessage }
                    { ...this.state }
                />
            );
        }
    }

    return Enchancer;
};


export default withState;
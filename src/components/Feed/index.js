import React, { Component, Fragment } from 'react';
import PropTypes, { string } from 'prop-types'; import io from 'socket.io-client';
import { CSSTransition, TransitionGroup, Transition } from 'react-transition-group';
import { fromTo } from 'gsap';
import moment from 'moment';

import Composer from '../../components/Composer';
import Post from '../../components/Post';
// import { getUniqueID } from '../../helpers';
import Catcher from '../../components/Catcher';
import Counter from '../../components/Counter';
import Spinner from '../../components/Spinner';
import Postman from '../../components/Postman';
import Styles from './styles.scss';

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
        spinnerVisible: false,
        postmanTrigger: true
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

    };

    _handleComposerAppear = (composer) => {
        fromTo(
            composer,
            1,
            {
                y:         -200,
                x:         500,
                opacity:   0,
                rotationY: 360
            },
            {
                y:          0,
                x:          0,
                opacity:    1,
                rotationY:  0,
                onComplete: () => {
                    this._hideHelloMessage();
                }
            }
        );
    };

    _handleCounterAppear = (counter) => {
        fromTo(
            counter,
            1,
            {
                y:         -1000,
                x:         -300,
                opacity:   0,
                rotationY: 360
            }, {
                y:         0,
                x:         0,
                opacity:   1,
                rotationY: 0
            }
        );
    };

    _handlePostmanAppear = (postman) => {
        fromTo(
            postman,
            2,
            {
                y:         0,
                x:         1000,
                opacity:   0,
                rotationY: 0
            }, {
                y:         0,
                x:         0,
                opacity:   1,
                rotationY: 0
            }
        );

    };

    _handlePostmanDissappear = (postman) => {
        fromTo(
            postman,
            2,
            {
                y:         0,
                x:         0,
                opacity:   1,
                rotationY: 0
            }, {
                y:         0,
                x:         1000,
                opacity:   0,
                rotationY: 0
            }
        );
    };

    _hideHelloMessage = () => {
        setTimeout(() => {
            this.setState(() => ({
                postmanTrigger: false
            }));
        }, 5000);
    }

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

    render () {
        // console.log(this.props);
        const { firstNameContext, avatar, lastNameContext } = this.context;
        const { posts: postsData, spinnerVisible, postmanTrigger } = this.state;
        const posts = postsData.map((post) => (
            <CSSTransition
                classNames = { {
                    enter:       Styles.postInStart,
                    enterActive: Styles.postInEnd,
                    exit:        Styles.postExitEnd,
                    exitActive:  Styles.postExitEnd
                } }
                key = { post.id }
                timeout = { { enter: 700, exit: 700 } }>
                <Catcher >
                    <Post
                        { ...post }
                        deletePost = { this._deletePost }
                        likePost = { this._likePost }
                    />
                </Catcher>
            </CSSTransition>
        ));

        return (
            <section className = { Styles.feed } >
                <Spinner
                    spinnerVisible = { spinnerVisible }
                />
                <Transition
                    appear
                    in
                    timeout = { 1000 }
                    onEnter = { this._handleComposerAppear }>
                    <Composer
                        avatar = { avatar }
                        createPost = { this._createPost }
                        firstName = { firstNameContext }
                    />
                </Transition>

                <Transition
                    appear
                    in
                    timeout = { 1000 }
                    onEnter = { this._handleCounterAppear }>
                    <Counter
                        countedPosts = { posts.length }
                    />
                </Transition>
                <TransitionGroup>
                    { posts }
                </TransitionGroup>

                <Transition
                    appear
                    in = { postmanTrigger }
                    timeout = { 2000 }
                    onEnter = { this._handlePostmanAppear }
                    onExit = { this._handlePostmanDissappear }>
                    <Postman
                        hideHelloMessage = { this._hideHelloMessage }
                    />
                </Transition>
            </section>

        );
    }
}

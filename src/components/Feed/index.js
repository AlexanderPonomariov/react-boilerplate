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
import withState from '../Enchancer';

class Feed extends Component {

    static contextTypes = {
        firstNameContext: PropTypes.string.isRequired,
        lastNameContext:  PropTypes.string.isRequired,
        api:              PropTypes.string.isRequired,
        token:            PropTypes.string.isRequired,
        avatar:           string.isRequired
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
                    this.props.hideHelloMessage();
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

    render () {
        // console.log(this.props);
        const { firstNameContext, avatar, lastNameContext } = this.context;
        const { posts: postsData, spinnerVisible, postmanTrigger, deletePost, likePost, createPost } = this.props;
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
                        deletePost = { deletePost }
                        likePost = { likePost }
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
                        createPost = { createPost }
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

export default withState(Feed);

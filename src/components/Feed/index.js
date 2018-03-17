import React, { Component } from 'react';
import PropTypes, { string } from 'prop-types';

import Composer from '../../components/Composer';
import Post from '../../components/Post';

export default class Feed extends Component {
    static propTypes = {
        avatar:   string.isRequired,
        lastName: PropTypes.string.isRequired
    };
    static contextTypes = {
        firstName: PropTypes.string.isRequired
    };

    render () {
        // console.log(this.props);
        const { avatar } = this.props;
        const { firstName } = this.context;

        return (
            <section>
                <Composer
                    avatar = { avatar }
                    firstName = { firstName }
                />
                <Post { ...this.props } />
            </section>
        );
    }
}

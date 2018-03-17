import React, { Component } from 'react';

import Styles from './styles.scss';
import { string } from 'prop-types';

export default class Composer extends Component {
    static propTypes = {
        avatar:    string.isRequired,
        firstName: string.isRequired
    };

    render () {
        const { avatar, firstName }  = this.props;

        return (
            <section className = { Styles.composer } >
                <img
                    alt = 'Homer J Simpson'
                    src = { avatar }
                />
                <form>
                    <textarea placeholder = { `What's on your mind, ${firstName}???` } />
                    <input type = 'submit' value = 'Post' />
                </form>
            </section>
        );
    }
}

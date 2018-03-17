import React, { Component } from 'react';

import avatar from '../../theme/assets/homer.png';
import Styles from './styles.scss';

export default class Composer extends Component {
    render () {
        return (
            <section className = { Styles.composer } >
                <img
                    alt = 'homy'
                    src = { avatar }
                />
                <form>
                    <textarea placeholder = { `What's on your mind, Alex???` } />
                    <input type = 'submit' value = 'Post' />
                </form>
            </section>
        );
    }
}

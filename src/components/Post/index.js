import React, { Component } from 'react';
import moment from 'moment';

import avatar from '../../theme/assets/homer.png';
import Styles from './styles.scss';


export default class Post extends Component {
    render () {
        return (
            <section className = { Styles.post } >
                <button className = { Styles.close } />
                <img
                    alt = 'My avatar'
                    src = { avatar }
                />
                <a href = '#'>Alexander Ponomariov</a>
                <time>{ moment().format('MMM D h:mm:ss a') }</time>
                <p>Hello!!! This is ME!!!!!</p>
            </section>
        );
    }
}

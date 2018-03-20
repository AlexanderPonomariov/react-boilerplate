import React, { Component } from 'react';
import PropTypes, { string } from 'prop-types';

import Styles from './styles.scss';

// My Postman realisation
// export default class Postman extends Component {
//
//     static contextTypes = {
//         firstNameContext: string.isRequired,
//         avatar:           string.isRequired
//     };
//
//     static propTypes = {
//
//         hideHelloMessage: PropTypes.func.isRequired
//     };
//
//     componentDidUpdate () {
//         this.props.hideHelloMessage();
//     }
//
//     render () {
//         const { avatar, firstNameContext } = this.context;
//
//         return (
//             <section className = { Styles.himessage }>
//                 <img
//                     alt = 'My avatar'
//                     src = { avatar }
//                 />
//                 <span>Welcome online, { firstNameContext }!</span>
//             </section>
//         );
//     }
// }

const Postman = (props, { avatar, firstNameContext }) => (
    <section className = { Styles.himessage }>
        <img
            alt = 'My avatar'
            src = { avatar }
        />
        <span>Welcome online, { firstNameContext }!</span>
    </section>
);

Postman.contextTypes = {
    firstNameContext: string.isRequired,
    avatar:           string.isRequired
};

export default Postman;

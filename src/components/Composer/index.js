import React, { Component } from 'react';

import Styles from './styles.scss';
import PropTypes, { string } from 'prop-types';

export default class Composer extends Component {
    static propTypes = {
        avatar:     string.isRequired,
        createPost: PropTypes.func.isRequired,
        firstName:  string.isRequired
    };

    constructor () {
        super(); // (1) gets oparent context

        this.handleSubmit = ::this._handleSubmit; // (1) sets context as current objectc ( bind(this) )
    }

    state = {
        comment: ''
    };

    _handleSubmit (event) { // (1) allows to change state ONLY for current object
        event.preventDefault();
        const { comment } = this.state;

        comment && this.props.createPost(comment.trim());

        this.setState({
            comment: ''
        });

    }

    _handleTextAreaChange = ({ target: { value }}) => { // (2) usage of arrows function equal to (1)
        this.setState({
            comment: value
        });
    };

    render () {
        const { avatar, firstName }  = this.props;

        const { comment } = this.state;

        return (
            <section className = { Styles.composer } >
                <img
                    alt = 'Homer J Simpson'
                    src = { avatar }
                />
                <form
                    onSubmit = { this.handleSubmit }>
                    <textarea
                        placeholder = { `What's on your mind, ${firstName}???` }
                        value = { comment }
                        onChange = { this._handleTextAreaChange }
                    />
                    <input type = 'submit' value = 'Post' disabled = { !comment } />
                </form>
            </section>
        );
    }
}

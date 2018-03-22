import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Composer from './';

configure({ adapter: new Adapter() });

const options = {
    firstName: 'ALexander',
    avatar:    'randomUrl'
};

const props = {
    createPost: jest.fn()
};

const message = 'Hello Bro!!!';

const state = {
    comment:           '',
    avatarBorderColor: '#ccc'
};

const mutatedState = {
    comment:           message,
    avatarBorderColor: '#ccc'
};

const result = mount(<Composer createPost = { props.createPost } avatar = { options.avatar } firstName = { options.firstName } />, {
    constext: options
});

window.fetch = () => Promise.resolve(() => ({
    status: 200,
    json:   () => Promise.resolve({
        data:    'some data',
        message: 'success'
    })
}));

describe('Composer: ', () => {
    test('Should have 1 section element', () => {
        expect(result.find('section')).toHaveLength(1);
    });

    test('Should have 1 textarea element', () => {
        expect(result.find('textarea')).toHaveLength(1);
    });

    test('Should have 1 img element', () => {
        expect(result.find('img')).toHaveLength(1);
    });

    test('Should have 1 input element', () => {
        expect(result.find('input')).toHaveLength(1);
    });

    test('Should valid initial state', () => {
        expect(result.state()).toEqual(state);
    });

    test('textarea value should be empty initially', () => {
        expect(result.find('textarea').text()).toBe('');
    });

    test('textarea value should be respond to state change', () => {
        result.setState(() => ({
            comment: message
        }));

        expect(result.state()).toEqual(mutatedState);
        expect(result.find('textarea').text()).toBe(message);

        result.setState(() => ({
            comment: ''
        }));

        expect(result.state()).toEqual(state);
        expect(result.find('textarea').text()).toBe('');
    });

    test('textarea and state value should respond to change event', () => {

        result.find('textarea').simulate('change', {
            target: {
                value: message
            }
        });

        expect(result.state()).toEqual(mutatedState);
        expect(result.find('textarea').text()).toBe(message);

    });

    test('component state and textarea should reflect accordion to submit post', () => {

        result.find('form').simulate('submit');

        expect(result.state()).toEqual(state);

    });

    test('createPost method should be invoked once', () => {

        // console.log(JSON.stringify(props.createPost.mock, null, 2));

        expect(props.createPost.mock.calls).toHaveLength(1);

    });

});

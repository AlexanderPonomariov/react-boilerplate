import React from 'react';
import Counter from './index';
import dom from 'react-test-renderer';

const renderTree = dom.create(<Counter countedPosts = { 4 } />).toJSON();

test('Counter should correspond to its snapshot', () => {
    expect(renderTree).toMatchSnapshot();
});

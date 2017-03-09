import React from 'react';
import Box from '../../../src/Components/Box/Box';
import renderer from 'react-test-renderer';

describe('Box Component',()=>{
    const component = renderer.create(<Box />);
    it('should match the Box component snapshot',()=>{

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        tree.props.onClick();
        tree = component.toJSON();
        expect(tree).toMatchSnapshot();

        tree.props.onClick();
        tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
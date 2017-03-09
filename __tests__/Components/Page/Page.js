import React from 'react';
import Page from '../../../src/Components/Page';
import renderer from 'react-test-renderer';

describe('Page Component',()=>{
    var props,tree;
    
    props = {
        title:"",
        app:{},
        content:"test"
    };
    
    tree = renderer.create(<Page {...props}/>).toJSON();
    it('should match the Page component snapshot',()=>{
        expect(tree).toMatchSnapshot();
    });
});
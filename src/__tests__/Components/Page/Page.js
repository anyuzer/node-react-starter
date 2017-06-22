import renderer from 'react-test-renderer';
import React from 'react';
import Page from '../../../Components/Page/index';

describe('Page Component', () => {
  const props = {
    title: "",
    app: {},
    content: "test"
  };

  const tree = renderer.create(<Page {...props} />).toJSON();
  it('should match the Page component snapshot', () => {
    expect(tree).toMatchSnapshot();
  });
});
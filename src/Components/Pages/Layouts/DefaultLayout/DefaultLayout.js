import React, { Fragment } from 'react';

import { StyledBox } from './Styles';

class DefaultLayout extends React.Component {
    render() {
        return (
            <Fragment>
                <StyledBox>
                    Hello
                </StyledBox>
            </Fragment>
        );
    }
}

export default DefaultLayout;
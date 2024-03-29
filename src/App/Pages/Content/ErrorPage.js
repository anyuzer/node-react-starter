import React from 'react';
import { withTheme } from "styled-components";

import { UX, utils } from '@anyuzer/starter-ux-lib';

class ErrorPage extends React.Component {
    render() {
        this.props.metaResolver.setTitle('[500]');
        this.props.metaResolver.setOGFalse();
        return (
            <UX.Flex>
                500. ERROR.
            </UX.Flex>
        )
    }
}

export default withTheme(ErrorPage);
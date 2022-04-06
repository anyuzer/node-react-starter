import React from 'react';
import { withTheme } from "styled-components";

import { UX, utils } from '@anyuzer/starter-ux-lib';

class NotFoundPage extends React.Component {
    render() {
        this.props.metaResolver.setTitle('[404]');
        this.props.metaResolver.setOGFalse();
        return (
            <UX.Flex>
                404. NOT FOUND
            </UX.Flex>
        )
    }
}

export default withTheme(NotFoundPage);
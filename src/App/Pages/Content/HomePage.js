import React from 'react';
import { withTheme } from "styled-components";

import { UX, utils } from '@anyuzer/starter-ux-lib';

class HomePage extends React.Component {
    constructor(_props) {
        super(_props);
        _props.metaResolver.setTitle('[Home Page]');
        _props.metaResolver.setOGFalse();
    }

    render() {
        return (
            <UX.Flex>
                HOME PAGE
            </UX.Flex>
        )
    }
}

export default withTheme(HomePage);
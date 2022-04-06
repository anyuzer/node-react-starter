import React from 'react';
import { withTheme } from "styled-components";

import { UX, utils } from '@anyuzer/starter-ux-lib';

class PricingPage extends React.Component {
    constructor(_props) {
        super(_props);
    }

    render() {
        this.props.metaResolver.setTitle('[Pricing Page]');
        this.props.metaResolver.setOGFalse();
        return (
            <UX.Flex>
                PRICING PAGE
            </UX.Flex>
        )
    }
}

export default withTheme(PricingPage);
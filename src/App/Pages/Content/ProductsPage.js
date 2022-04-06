import React from 'react';
import { withTheme } from "styled-components";

import { UX, utils } from '@anyuzer/starter-ux-lib';

class ProductsPage extends React.Component {
    render() {
        this.props.metaResolver.setTitle('[Products Page]');
        this.props.metaResolver.setOGFalse();

        throw new Error('An unknown natural error.')
        return (
            <UX.Flex>
                PRODUCTS PAGE
            </UX.Flex>
        )
    }
}

export default withTheme(ProductsPage);
import { ArcRouter, ArcObject } from 'arc-lib';
import React, { Fragment } from 'react';

import SafeConfig from '../../Config/SafeConfig';
import routeMap from '../../@data/routeMap.json';
import Pages from '../Pages';
import GlobalStyles from '../AppStyle/GlobalStyles';

class AppManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: this.getPage(props.routeObj.match)
        };
    }

    getPage(_page) {
        return (
            <Pages page={_page} />
        );
    }

    render() {
        GlobalStyles();
        const { page } = this.state;
        return (
            <Fragment>
                { page }
            </Fragment>
        );
    }
}

export default AppManager;
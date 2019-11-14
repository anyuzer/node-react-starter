import React from 'react';
import { render } from 'react-dom';

import Provider from './Provider';
import Router from './Router';

Router.loadData(window.app.routeObj.path, window.app.pageData);

render(
    <Provider
        routeObj={window.app.routeObj}
        pageData={window.app.pageData}
        userProfile={window.app.userProfile}
    />,
    document.getElementById('app')
);
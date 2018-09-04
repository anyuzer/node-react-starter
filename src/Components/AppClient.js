import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'glamorous';
import { rehydrate as GlamorRehydrate } from 'glamor';
import theme from './AppStyle/theme';

import SafeConfig from '../Config/SafeConfig';

import AppManager from './AppManager';

SafeConfig.setConfig(window.app.config);
GlamorRehydrate(window.cssids);

const Tree = (
    <ThemeProvider theme={theme}>
        <AppManager
            routeObj={window.app.routeObj}
        />
    </ThemeProvider>
);

ReactDOM.hydrate(Tree, document.getElementById('app-mount'));

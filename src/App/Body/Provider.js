import React from 'react';
import { ThemeProvider } from "styled-components";
import ExampleTheme from '@anyuzer/starter-ux-lib/dist/themes/ExampleTheme';

import App from './App';

/*
    If you're not using the starter-ux-lib template, you'll sort out your own Theme provider, or just ditch everything here but the App.
    If you are using the starter-ux-lib, you'll update this with your appropriate theme.
 */
const Provider = props => (
    <ThemeProvider theme={ExampleTheme}>
        <ExampleTheme.globalStyle />
        <App {...props} />
    </ThemeProvider>
);

export default Provider;
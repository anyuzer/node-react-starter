import React from 'react';
import { ThemeProvider } from "styled-components";

import App from './App';

const Provider = props => (
    <ThemeProvider theme={{}}>
        <React.Fragment>
            <App {...props} />
        </React.Fragment>
    </ThemeProvider>
);

export default Provider;
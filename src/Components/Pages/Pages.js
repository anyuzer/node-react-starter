import React, { Fragment } from 'react';

import DefaultLayout from "./Layouts/DefaultLayout";

class Pages extends React.Component {
    getLayout(_page) {
        switch (_page) {
            default: return <DefaultLayout {...this.props} />
        }
    }

    render() {
        return (this.getLayout(this.props.page));
    }
}

export default Pages;
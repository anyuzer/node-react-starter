import React from 'react';

class HomePage extends React.Component {
    constructor(_props) {
        super(_props);
        _props.metaResolver.setTitle('[Home Page]');
        _props.metaResolver.setOGFalse();
    }

    render() {
        return 'HiS???!x'; //ss
    }
}

export default HomePage;